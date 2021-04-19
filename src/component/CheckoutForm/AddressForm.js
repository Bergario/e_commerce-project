import React, { useEffect, useState } from "react";

import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import useStyles from "./styles";

const AddressForm = () => {
  const classes = useStyles();
  const method = useForm();

  const [provinsi, setProvinsi] = useState([]);
  const [selectedProv, setSelectedProv] = useState("");
  const [kabupaten, setKabupaten] = useState([]);
  const [selectedKab, setSelectedKab] = useState("");
  const [kecamatan, setKecamatan] = useState([]);
  const [selectedKec, setSelectedKec] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => response.json())
      .then((result) => {
        isMounted && setProvinsi(result.provinsi);
      });

    return () => (isMounted = false);
  }, []);

  console.log(selectedKab);

  useEffect(() => {
    let isMounted = true;
    fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${selectedProv}`
    )
      .then((response) => response.json())
      .then((result) => {
        isMounted && setKabupaten(result.kota_kabupaten);
      });

    return () => (isMounted = false);
  }, [selectedProv]);

  useEffect(() => {
    let isMounted = true;
    fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${selectedKab}`
    )
      .then((response) => response.json())
      .then((result) => {
        isMounted && setKecamatan(result.kecamatan);
      });

    return () => (isMounted = false);
  }, [selectedKab]);
  console.log(kecamatan);

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...method}>
        <form onSubmit={() => {}}>
          <Grid
            style={{ justifyContent: "space-around" }}
            container
            spacing={3}>
            <FormInput required name="Nama lengkap" label="first name" />
            <FormInput required name="telepon" label="telepon" />
            <FormInput required name="email" label="email" />
            <FormInput required name="alamat" label="alamat" />

            <Grid item xs={10} sm={5}>
              <InputLabel>provinsi</InputLabel>
              <Select
                value={selectedProv}
                fullWidth
                onChange={(e) => {
                  setSelectedProv(e.target.value);
                }}>
                {provinsi
                  ? provinsi.map((data) => (
                      <MenuItem xs={12} key={data.id} value={data.id}>
                        {data.nama}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </Grid>

            <Grid item xs={10} sm={5}>
              <InputLabel>kabupaten / kota</InputLabel>
              <Select
                value={selectedKab}
                fullWidth
                onChange={(e) => {
                  setSelectedKab(e.target.value);
                }}>
                {kabupaten &&
                  kabupaten.map((data) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.nama}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>

            <Grid item xs={10} sm={5}>
              <InputLabel>kecamatan</InputLabel>
              <Select
                value={selectedKec}
                fullWidth
                onChange={(e) => {
                  setSelectedKec(e.target.value);
                }}>
                {kecamatan &&
                  kecamatan.map((data) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.nama}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>

            <FormInput required name="kode pos" label="kode pos" />
          </Grid>
        </form>
      </FormProvider>
      <Grid container className={classes.button}>
        <Button type="button" variant="contained">
          Back
        </Button>
        <Button type="button" variant="contained" color="primary">
          Next
        </Button>
      </Grid>
    </>
  );
};

export default AddressForm;
