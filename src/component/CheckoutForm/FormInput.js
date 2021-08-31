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
  required,
  children,
  select,
  multiline,
}) => {
  const { control } = useFormContext();
  const variants = variant && variant;
  const Margin = margin && margin;
  return (
    // <Grid item xs={10} sm={5}>
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            required={required ? true : false}
            select={select ? true : false}
            multiline={multiline ? true : false}
            label={label}
            variant={variants}
            type={type}
            helperText={error ? error : false}
            fullWidth
            size={size}
            margin={Margin}
            autoComplete={autoComplete}
            error={error ? true : false}>
            {children}
          </TextField>
        );
      }}
    />
    // </Grid>
  );
};

export default FormInput;
