import path from "path";
import assert from "assert";
import { Application } from "spectron";
import Electron from "electron";

const app = new Application({
  path: Electron,
  args: [path.join(process.cwd(), "./main.js")], // Formerly  .., ensure that you're actually using the main script for your application and not whatever the fuck spectron is using
});

describe("Test2", function () {
  this.timeout(100000);
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
    assert.strictEqual(count, 1);
  });

  it("does stuff 2", async () => {
    const title = await app.client.getTitle().catch((e) => console.log(e));
    assert.strictEqual(title, "Document");
  });

  it("does stuff 2.5", async () => {
    let value = await (await app.client.$(".HelloWorld"))
      .getText()
      .catch((e) => console.log(e));
    // const title = await app.client
    //   .$(".HelloWorld")
    //   .getHTML()
    //   .catch((e) => console.log(e));
    assert.strictEqual(value, "Hello World!");
  });

  it("does stuff 3", async () => {
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

    assert.strictEqual(value, "93.184.216.34");
  });
});
