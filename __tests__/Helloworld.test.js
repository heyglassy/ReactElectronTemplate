import React, { useState as useStateMock } from "react";
import { render } from "@testing-library/react";
import HelloWorld from "../src/components/HelloWorld";
import userEvent from "@testing-library/user-event";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const setState = jest.fn();

describe("Unit testing the Helloworld component ensures that...", () => {
  beforeAll(() => {
    useStateMock.mockImplementation((init) => [init, setState]);
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
    expect(container.firstChild.textContent).toBe("Hello World!");
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
