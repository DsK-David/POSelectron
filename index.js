const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable: true,
    icon: path.join(__dirname, "src", "img", "logo.icns"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "src", "login.html"));
    // win.loadFile(path.join(__dirname, "src", "index.html"));

  ipcMain.on("show-notification", (event, { title, body }) => {
    new Notification({ title, body }).show();
  });
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
