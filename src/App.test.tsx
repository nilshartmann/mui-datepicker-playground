import React from "react";
import {
  render,
  cleanup,
  act,
  within,
  fireEvent,
  RenderResult,
  getByText,
  getAllByRole,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

it("MATERIAL UI WITH REACT FORM HOOK  - should be able to change date", async () => {
  render(<App />);

  const datum = within(screen.getByTestId("mui-react-form-hook")).getAllByRole(
    "textbox"
  )[0];
  // await fireEvent.mouseDown(datum!);
  //await userEvent.paste(datum!, "12/16/2020");
  userEvent.clear(datum);
  userEvent.type(datum, "12/16/2020");
  expect(datum).toHaveValue("12/16/2020");
});

it.only("MATERIAL UI WITH USE STATE  - should be able to change date", async () => {
  render(<App />);

  const form = screen.getByTestId("mui-with-state");
  const datum = within(form).getByRole("textbox");
  // const datum = within(form).getByTestId("mui-textfield");
  expect(datum).toHaveValue("12/28/2020");
  // await fireEvent.mouseDown(datum!);
  //await userEvent.paste(datum!, "12/16/2020");
  userEvent.type(datum, "12162020");

  userEvent.click(within(form).getByTestId("submitButton"));

  const msg = within(form).getByTestId("submittedDate");
  expect(msg).toBeInTheDocument();
  expect(msg.textContent).toBe("2020-12-16T23:00:00.000Z");
  expect(datum).toHaveValue("12/16/2020");
});

it.only("MATERIAL UI WITH USE STATE  - should be able to change date (example works directly on firefox)", async () => {
  render(<App />);

  const form = screen.getByTestId("mui-with-state");
  const datum = within(form).getByRole("textbox");
  // const datum = within(form).getByTestId("mui-textfield");
  expect(datum).toHaveValue("12/28/2020");
  
  // If you paste this code into Firefox it will work
  var date = document.querySelector('[data-testid=mui-with-state]')!.querySelector('input');
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("focus", false, true);
  date!.dispatchEvent(evt);
  var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set;
  nativeInputValueSetter!.call(date, '12/16/2020');

  var ev2 = new Event('input', { bubbles: true});
  date!.dispatchEvent(ev2);
  // End paste

  userEvent.click(within(form).getByTestId("submitButton"));
  
  const msg = within(form).getByTestId("submittedDate");
  expect(msg).toBeInTheDocument();
  expect(datum).toHaveValue("12/16/2020");
  expect(msg.textContent).toBe("2020-12-16T23:00:00.000Z");
});

it("NATIVE TEXT FIELD - should paste date into native date input field", async () => {
  render(<App />);

  const nativeForm = screen.getByTestId("native-date-field");
  const datum = within(nativeForm).getByLabelText(/Native Date Field*/);
  const button = within(nativeForm).getByText("Set Date");
  expect(datum).toHaveValue("12/29/2020");
  userEvent.clear(datum);
  userEvent.type(datum, "12/16/2020");
  userEvent.click(button);
  const msg = within(nativeForm).getByTestId("nativeDateText");
  expect(msg).toBeInTheDocument();
  expect(msg.textContent).toBe("12/16/2020");
});
