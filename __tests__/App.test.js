import path from "path";
import { expect } from "@jest/globals";
import { Application } from "spectron";
import Electron from "electron";
import "@babel/polyfill"; // Depricated

const app = new Application({
  path: Electron,
  args: [path.join(__dirname, "../main.js")],
});

describe("test 2", () => {
  jest.setTimeout(100000);

  beforeEach(() => {
    return app.start();
  });

  afterEach(() => {
    if (app.isRunning()) {
      return app.stop();
    }
  });

  it("does stuff", async () => {
    const count = await app.client
      .getWindowCount()
      .catch((e) => console.log(e));
    expect(count).toBe(1);
  });

  it("does stuff 2", async () => {
    const title = await app.client.getTitle().catch((e) => console.log(e));
    expect(title).toBe("Document");
  });
  
  it("does stuff 3.5", async () => {
    await app.client
      .$(".text")
      .then((text) => {
        text.addValue("example.com").catch((e) => {
          console.log(e);
        });
      })
      .catch((e) => console.log(e));

    let value = await (await app.client.$(".text"))
      .getValue()
      .catch((e) => console.log(e));
    console.log(value)
    expect(value).toBe("example.com");
  });

  it("does stuff 3", async () => {
    console.log(app.client)
    await app.client
      .$(".text")
      .then((text) => {
        text.addValue("example.com").catch((e) => {
          console.log(e);
        });
      })
      .catch((e) => console.log(e));

    await app.client
      .$(".button")
      .then((button) => {
        button.click();
      })
      .catch((e) => console.log(e));

    let value = await (await app.client.$(".ip"))
      .getText()
      .catch((e) => console.log(e));
    console.log(value)

    expect(value).toBe("93.184.216.34");
  });
});
