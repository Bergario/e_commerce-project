import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [pengiriman, setPengiriman] = useState([]);
  const [selectedPengiriman, setSelectedPengiriman] = useState("");

  useEffect(() => {
    let isMounted = true;
    axios.get("http://localhost:9000/ongkir/province").then((response) => {
      const dataProv = response.data.rajaongkir.results;
      isMounted && setProvinsi(dataProv);
    });

    return () => (isMounted = false);
  }, []);

  const kabupatenHandler = async (id, prov) => {
    const fetchData = await axios.get(
      `http://localhost:9000/ongkir/city/prov_id=${id}`
    );
    const response = await fetchData;
    const dataKabupaten = response.data.rajaongkir.results;
    setKabupaten(dataKabupaten);
    setSelectedProv(prov);
    console.log(prov);
    return prov;
  };

  const pengirimanHandler = async (id, kab) => {
    const fetchData = await axios(`http://localhost:9000/ongkir/cost/${id}`);
    const response = await fetchData;
    const ongkir = response.data.rajaongkir.results[0].costs;
    setPengiriman(ongkir);
    setSelectedKab(kab);
  };

  const Provinsi = provinsi
    ? provinsi.map((data) => (
        <MenuItem
          key={data.province_id}
          value={data.province}
          onClick={kabupatenHandler.bind(this, data.province_id, data.province)}
        >
          {data.province}
        </MenuItem>
      ))
    : null;

  const Kabupaten = kabupaten.length ? (
    kabupaten.map((data) => (
      <MenuItem
        key={data.city_id}
        value={data.city_name}
        onClick={pengirimanHandler.bind(this, data.city_id, data.city_name)}
      >
        {`${data.type} ${data.city_name}`}
      </MenuItem>
    ))
  ) : (
    <MenuItem>pilih provinsi terlebih dahulu</MenuItem>
  );

  const Pengiriman = pengiriman.length ? (
    pengiriman.map((data) => (
      <MenuItem key={data.service} value={data.cost[0].value}>
        {`JNE - ${data.service} (Rp. ${data.cost[0].value})`}
      </MenuItem>
    ))
  ) : (
    <MenuItem>isi alamat terlebih dahulu</MenuItem>
  );

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit((data) => console.log(data))}>
          <Grid
            style={{ justifyContent: "space-around" }}
            container
            spacing={3}
          >
            <FormInput required name="name" label="nama" />
            <FormInput required name="telepon" label="telepon" />
            <FormInput required name="email" label="email" />
            <FormInput required name="address" label="alamat" />

            <Grid item xs={10} sm={5}>
              <InputLabel>provinsi</InputLabel>
              <Select
                value={selectedProv}
                fullWidth
                {...method.register("provinsi")}
              >
                {Provinsi}
              </Select>
            </Grid>

            <Grid item xs={10} sm={5}>
              <InputLabel>kabupaten / kota</InputLabel>
              <Select
                value={selectedKab}
                fullWidth
                {...method.register("kabupaten")}
              >
                {Kabupaten}
              </Select>
            </Grid>

            <Grid item xs={10} sm={5}>
              <InputLabel>opsi pengiriman</InputLabel>
              <Select
                value={selectedPengiriman}
                fullWidth
                {...method.register("ongkir")}
                onChange={(e) => {
                  setSelectedPengiriman(e.target.value);
                }}
              >
                {Pengiriman}
              </Select>
            </Grid>

            <FormInput required name="kode pos" label="kode pos" />
          </Grid>
          <Grid container className={classes.button}>
            <Button type="button" variant="contained">
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
