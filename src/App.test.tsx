import React from "react";
import {
  render,
  cleanup,
  act,
  within,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Form contains valid inputs", () => {
  it.only("should be able to change date", async () => {
    console.log("before tests");
    const screen = render(<App />);
    const { getByTestId, getAllByRole, getByLabelText } = screen;

    const datum = getByLabelText("Choose date");
    await act(async () => {
      console.log("paste datum");
      // await fireEvent.mouseDown(datum!);
      await userEvent.paste(datum!, "20201212");
    });

    console.log("harry", datum?.outerHTML);

    expect(datum.nodeValue).toBe("2020-12-12");
  });
});
