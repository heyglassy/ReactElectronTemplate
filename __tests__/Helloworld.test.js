import React, { useState as useStateMock } from "react";
import { fireEvent, render } from "@testing-library/react";
import HelloWorld from "../src/components/HelloWorld";
import userEvent from "@testing-library/user-event";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const setState = jest.fn();

describe("test", () => {
  beforeAll(() => {
    useStateMock.mockImplementation((init) => [init, setState]);
  });
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

  it("test 3", () => {
    const element = document.createElement("div");
    const { container } = render(<HelloWorld />, {
      container: document.body.appendChild(element),
    });
    container.getElementsByClassName("text");

    userEvent.type(container.querySelector(".text"), "test");
    expect(setState).toBeCalled();
  });
});
