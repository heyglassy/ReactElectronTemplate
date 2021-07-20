const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const path = require("path");
const Ipc = require("./src/Ipc/script");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "src/preload.js"),
    },
  });

  win.loadFile("index.html");
}

// Fulfilled when electron is initializing, convientent alternative to subscribing to app.isReady()
app.whenReady().then(() => {
  createWindow();
});

const server = "https://localhost:5432";
const url = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL({ url });

autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Restart Now", "Restart Later"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail:
      "A new version of this application has been downloaded. Restart to apply updates.",
  };
  dialog.showMessageBox(dialogOpts).then((ret) => {
    if (ret.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on("error", (message) => {
  console.error("There was a problem updating the application");
  console.error(message);
});

setInterval(() => {
  autoUpdater.checkForUpdates();
}, 60000);

Ipc();
