import { TextField } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function App() {
  const { control, errors, handleSubmit, trigger } = useForm({
    defaultValues: {
      date: new Date()
    }
  });
  const [value, setValue] = useState<string | null>("2020-12-12");
  function onSubmit(data: object) {
    console.log("onSubmit:", data);
    alert(JSON.stringify({ data, errors }));
  }
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </LocalizationProvider>
  );
}
