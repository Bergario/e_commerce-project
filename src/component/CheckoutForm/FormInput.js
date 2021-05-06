import React from "react";

import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={10} sm={5}>
      <Controller
        constrol={control}
        name={name}
        required
        render={({ field }) => {
          return <TextField {...field} label={label} fullWidth />;
        }}
      />
    </Grid>
  );
};

export default FormInput;
