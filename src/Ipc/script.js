const { ipcMain, ipcRenderer } = require("electron");
const dns = require("dns");

module.exports = () => {
  ipcMain.on("toMain", (event, args) => {
    const resolver = new dns.Resolver();
    resolver.setServers(["1.1.1.1"]);
    resolver.resolve4(args, (err, address) => {
      if (err) {
        event.reply("fromMain", ["Not Found"]);
      } else {
        event.reply("fromMain", address);
      }
    });
  });
};
