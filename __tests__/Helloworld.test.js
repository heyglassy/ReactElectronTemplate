import React from "react";
import { render } from "@testing-library/react";
import HelloWorld from "../src/components/HelloWorld";
import { expect } from "@jest/globals";

describe("test", () => {
  it("tests", () => {
    const element = document.createElement("div");
    const { container } = render(<HelloWorld />, {
      container: document.body.appendChild(element),
    });
    expect(container).toBeDefined();
  });

  it("test 2", () => {
    const element = document.createElement("div");
    const { container } = render(<HelloWorld />, {
      container: document.body.appendChild(element),
    });
    expect(container.firstChild.textContent).toBe("Hello World!");
  });
});
