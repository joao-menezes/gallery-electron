const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800, height: 600, show:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  
  const splash = new BrowserWindow({
    width: 600, 
    height: 300, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });

  win.loadFile('index.html')
  win.once("ready-to-show",()=>{
    splash.close();
    win.show()
  })

  // win.removeMenu()
  
  splash.loadFile('loading.html');
  splash.center();
  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})