const { app, BrowserWindow } = require("electron");
const path = require("path")

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable:true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  const indexPath= path.join(__dirname,"/src/index.html")
  win.loadFile(indexPath); // Carrega um arquivo HTML que você vai criar na próxima etapa
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
