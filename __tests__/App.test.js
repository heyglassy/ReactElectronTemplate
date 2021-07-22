const Application = require("spectron").Application;
const electronPath = require("electron");
const path = require("path");

describe("Test", function () {
  jest.setTimeout(100000);
  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, "..")],
    });
    return this.app.start();
  });
  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("does stuff", function () {
    return this.app.client.getWindowCount().then(function (count) {
      expect(count).toBe(1);
    });
  });
  
    it("does stuff 2", function () {
    return this.app.client.getWindowCount().then(function (count) {
      expect(count).toBe(1);
    });
  });
});
