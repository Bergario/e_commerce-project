import React from "react";

import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={10} sm={5}>
      <Controller
        control={control}
        name={name}
        required={required}
        render={() => {
          return <TextField label={label} fullWidth />;
        }}
      />
    </Grid>
  );
};

export default FormInput;
