import { TextField } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { control, errors, handleSubmit, trigger } = useForm({});
  const [value, setValue] = useState<string | null>("2020-12-12");
  function onSubmit(data: object) {
    console.log("onSubmit:", data);
    alert(JSON.stringify({ data, errors }));
  }
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DatePicker
          label="Basic example"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(props) => <TextField {...props} />}
        />

        <br />
        <button type="submit">Submit</button>
      </form>
    </LocalizationProvider>
  );
}
