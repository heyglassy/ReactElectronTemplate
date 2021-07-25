import path from "path";
import { expect } from "@jest/globals";
import { Application } from "spectron";
import Electron from "electron";
import "@babel/polyfill"; // Depricated

const app = new Application({
  path: Electron,
  args: [path.join(__dirname, "../main.js")],
  connectionRetryCount: 3000000, //This is to ensure that the windows hae enough time to connect to ChromeDriver
  quitTimeout: 10000, // This is to ensure that Spectron does not throw an error because the windows do not close quickly enough.
});

describe("E2E Testing the entire application ensures that...", () => {
  jest.setTimeout(1000000); // This timeout is to ensure that jest does not stop the tests before they finish running

  beforeEach(() => {
    return app.start();
  });

  afterEach(() => {
    if (app.isRunning()) {
      return app.stop();
    }
  });

  it("the electron app starts a window.", async () => {
    const count = await app.client.getWindowCount();
    expect(count).toBe(1);
  });

  it("the electron app is titled properly.", async () => {
    const title = await app.client.getTitle();
    expect(title).toBe("React Electron Template");
  });

  it("when text is inputted into the text field and the button is clicked, the correct ip address is returned.", async () => {
    await app.client.$(".text").then((text) => {
      text.addValue("example.com");
    });

    await app.client.$(".button").then((button) => {
      button.click();
    });

    let value = await (await app.client.$(".ip")).getText();

    expect(value).toBe("93.184.216.34");
  });
});
