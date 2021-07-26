import React, { useState as useStateMock } from "react";
import electron, { shell as shellMock } from "electron";
import { render } from "@testing-library/react";
import HelloWorld from "../src/components/HelloWorld";
import userEvent from "@testing-library/user-event";
import { JSDOM } from "jsdom";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

jest.mock("electron", () => ({
  ...jest.requireActual("electron"),
  shell: jest.fn(),
}));

const setState = jest.fn();
const urlMock = jest.fn();

describe("Unit testing the Helloworld component ensures that...", () => {
  beforeAll(() => {
    useStateMock.mockImplementation((init) => [init, setState]);
    shellMock.mockImplementation(() => urlMock);
  });
  it("the component can render.", () => {
    const element = document.createElement("div");
    const { container } = render(<HelloWorld />, {
      container: document.body.appendChild(element),
    });
    expect(container).toBeDefined();
  });

  it("the component contains the text 'Hello World'", () => {
    const element = document.createElement("div");
    const { container } = render(<HelloWorld />, {
      container: document.body.appendChild(element),
    });
    expect(container.firstChild.textContent).toBe(
      "Domain Name to IP Address Lookup"
    );
  });

  it("when inputting text into the text field, the state updates.", () => {
    const element = document.createElement("div");
    const { container } = render(<HelloWorld />, {
      container: document.body.appendChild(element),
    });
    container.getElementsByClassName("text");

    userEvent.type(container.querySelector(".text"), "test");
    expect(setState).toBeCalled();
  });
});
