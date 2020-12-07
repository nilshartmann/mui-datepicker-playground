import { TextField } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

function MaterialUiWithReactHookFrom() {
  const [submittedDate, setSubmittedDate] = React.useState("");
  const { control, errors, handleSubmit, trigger, register } = useForm({
    defaultValues: {
      date: Date.parse("29 Dec 2020 00:00:00 GMT"), // use a "fixed" default value, that does not depend on the "real" date today
    },
  });
  function onSubmit(data: object) {
    console.log("onSubmit:", data);
    setSubmittedDate(JSON.stringify({ data, errors }));
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="mui-react-form-hook">
      <Controller
        {...{ control }}
        name="date"
        as={
          <DatePicker
            label="Basic example"
            renderInput={(props) => <TextField {...props} />}
            onChange={(e) => null} // doesn't get called anyway; https://github.com/react-hook-form/react-hook-form/issues/438#issuecomment-633760140
            value={null} // RHF controls controls it via defaultValue - ^
          />
        }
      />

      <br />
      <button type="submit">Submit</button>
      {submittedDate && <pre>{submittedDate}</pre>}
    </form>
  );
}

function MaterialUiWithUseState() {
  const [selectedDate, handleDateChange] = useState<number | null>(
    Date.parse("28 Dec 2020 00:00:00 GMT") // use a "fixed" default value, that does not depend on the "real" date today
  );
  const [submittedDate, setSubmittedDate] = React.useState("");
  function onSubmit() {
    setSubmittedDate(`${selectedDate} (${typeof selectedDate})`);
  }

  return (
    <div data-testid="mui-with-state">
      <h1>DatePicker with useState</h1>
      <DatePicker
        label="MaterialUI Example with useState"
        renderInput={(props) => <TextField {...props} />}
        onChange={handleDateChange}
        value={selectedDate}
      />
      <button onClick={onSubmit} data-testid="submitButton">
        Submit
      </button>
      {submittedDate && <pre data-testid="submittedDate">{submittedDate}</pre>}
    </div>
  );
}

function NativeDateField() {
  const [nativeDate, setNativeDate] = React.useState("");
  const nativeDateRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div
      style={{ marginTop: "2rem", fontSize: "1.5rem" }}
      data-testid="native-date-field"
    >
      <label>
        Native Date Field (note: Material UI uses type=tel)
        <input
          type="tel"
          defaultValue="12/29/2020"
          style={{ display: "block", fontSize: "1.5rem" }}
          ref={nativeDateRef}
        />
      </label>
      <button
        onClick={() => {
          console.log(
            "##############################################",
            nativeDateRef.current!.value
          );
          setNativeDate(nativeDateRef.current!.value);
        }}
      >
        Set Date
      </button>
      {nativeDate && <p data-testid="nativeDateText">{nativeDate}</p>}
    </div>
  );
}

export default function App() {
  // This can be copy&pasted into the text field and doesn't give an error:
  // 12/16/2020
  // This can be copy&pasted into the text field, but is not recognized as correct date:
  // 12162020
  //  strange, because the value attribute of the input-field looks exactly the same
  //  as after pasting the correct string above (12/16/2020)

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <MaterialUiWithReactHookFrom />
      <MaterialUiWithUseState />
      <NativeDateField />
    </LocalizationProvider>
  );
}
