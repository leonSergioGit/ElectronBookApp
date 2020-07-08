const path = require('path')
const url = require('url')
const fs = require('fs');
const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow

let isDev = false

if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true
}

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 800,
		show: false,
		icon: './assets/icons/icon.png',
		webPreferences: {
			nodeIntegration: true,
		},
	})

	let indexPath

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		})
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		})
	}

	mainWindow.loadURL(indexPath)

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()

		// Open devtools if dev
		if (isDev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require('electron-devtools-installer')

			installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
				console.log('Error loading React DevTools: ', err)
			)
			mainWindow.webContents.openDevTools()
		}
	})

	mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})


//SAVE DATA IN FILE
ipcMain.on('books:add', (e, book) => {
	const fileDir = app.getPath('home');
	const file = path.join(fileDir, "bookApp.json")
	let fileData = fs.readFileSync(file, 'utf8')
	fileData = JSON.parse(fileData);
	fileData = [...fileData, book];
	fs.writeFileSync(file, JSON.stringify(fileData));
	mainWindow.webContents.send('books:get', JSON.stringify(fileData));
})


ipcMain.on('books:load', () => {
	const fileDir = app.getPath('home');
	const file = path.join(fileDir, "bookApp.json")
	if(fs.existsSync(file)) {
		const fileData = fs.readFileSync(file, 'utf8')
		mainWindow.webContents.send('books:get', fileData);
	} else {
		fs.writeFileSync(file, "[]")
	}
})

//Edit bookApp
ipcMain.on('books:edit', (e, book) => {
	const fileDir = app.getPath('home');
	const file = path.join(fileDir, "bookApp.json")
	let fileData = fs.readFileSync(file, 'utf8')
	fileData = JSON.parse(fileData);
	fileData = fileData.filter(e => e.id != book.id);
	fileData = [...fileData, book];
	fs.writeFileSync(file, JSON.stringify(fileData));
	mainWindow.webContents.send('books:get', JSON.stringify(fileData));
})

//delete book
ipcMain.on('books:delete', (e, bookId) => {
	const fileDir = app.getPath('home');
	const file = path.join(fileDir, "bookApp.json")
	let fileData = fs.readFileSync(file, 'utf8')
	fileData = JSON.parse(fileData);
	fileData = fileData.filter(e => e.id != bookId)
	fs.writeFileSync(file, JSON.stringify(fileData));
	mainWindow.webContents.send('books:get', JSON.stringify(fileData));
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Stop error
app.allowRendererProcessReuse = true
