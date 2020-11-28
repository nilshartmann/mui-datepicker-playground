/**
 * Material UI DateTimePicker v4 example, wrapped in a React Hook Form controller,
 * mostly ignoring the forms integration guide at https://next.material-ui-pickers.dev/guides/forms.
 *
 * Playground - https://codesandbox.io/s/mui-v4-datetimepicker-with-rhf-jqv1c?file=/index.tsx
 *
 * + takes `name` and `label` parameters for the input
 * + optional `inputFormat` parameter, default "yyyy-MM-dd HH:mm", and `minutesStep` = 15
 * + returns a Date object to the onSubmit handler, under data[name]
 * + sets the ErrorMessage underneath the TextField to custom errors via `rules`
 *
 * The goal is to accept a date in the future, with the time being a multiple of 15 minutes.
 *
 * Known issues:
 * - (fixed in dev) the initial state is an "invalidDate" error, due to https://github.com/mui-org/material-ui-pickers/issues/1824
 * - console warning about the mask - https://github.com/mui-org/material-ui-pickers/issues/1776
 */
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

ReactDOM.render(<App />, document.querySelector("#root"));
