import React from "react";

import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({
  name,
  label,
  error,
  variant,
  type,
  size,
  margin,
  autoComplete,
}) => {
  const { control } = useFormContext();
  return (
    // <Grid item xs={10} sm={5}>
    <Controller
      constrol={control}
      name={name}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            required={true}
            label={label}
            variant={variant}
            type={type}
            helperText={error ? error : false}
            fullWidth
            size={size}
            margin={margin}
            autoComplete={autoComplete}
            error={error ? true : false}
          />
        );
      }}
    />
    // </Grid>
  );
};

export default FormInput;
