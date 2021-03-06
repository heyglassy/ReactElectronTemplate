const {
  app,
  BrowserWindow,
  autoUpdater,
  dialog,
  session,
  shell,
} = require("electron");
const path = require("path");
const Ipc = require("./src/Ipc/script");
require("dotenv").config();

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "src/preload.js"),
    },
  });

  win.loadFile("index.html");
}

// Fulfilled when electron is initializing, convientent alternative to subscribing to app.isReady()
app.whenReady().then(() => {
  createWindow();
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    let csp =
      process.env.ENV === "development" ? "unsafe-eval" : "script-src 'self'";
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": csp,
      },
    });
  });

  session
    .fromPartition("partition")
    .setPermissionRequestHandler((webContents, permission, callback) => {
      if (permission === "notifications") {
        callback(true);
      }
      return callback(false);
    });
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

app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    event.preventDefault();
  });

  let isSafeForExternalOpen = (url) => {
    if (url.startsWith("https://github.com")) {
      return true;
    }
  };

  contents.setWindowOpenHandler(({ url }) => {
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url);
      });
    }
  });

  contents.on("will-attach-webview", (event, webPreferences, params) => {
    delete webPreferences.preload;
    delete webPreferences.preloadURL;

    webPreferences.nodeIntegration = false;

    event.preventDefault();
  });
});

Ipc();
