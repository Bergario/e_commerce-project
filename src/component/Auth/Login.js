import React, { useEffect } from "react";
import { commerce } from "../../lib/commerce";
import axios from "axios";

const Login = () => {
  const cusLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: "ber@gmail.com",
      base_url: "https://yourwebsite.com/login/callback",
    };
    try {
      await axios
        .post("https://api.chec.io/v1/customers/email-token", {
          headers: {
            "X-Authorization":
              "pk_256679f9a3c9b102caa6c2c57c0bdf9709b3bc5967860",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: {
            email: "ber@gmail.com",
            base_url: "https://yourwebsite.com/login/callback",
          },
        })
        .then((response) => console.log("Saru"));
    } catch (err) {
      console.log(err.message);
    }
    console.log("asu");
  };

  const token = async () => {
    // await commerce.request;
    //     .login(
    //       "leslie.lawless@example.com",
    //       "https://yourwebsite.com/login/callback"
    //     )
    //     .then((token) => console.log(token));
    // };
    // const token = await commerce.customers.login();
  };
  useEffect(() => {
    // token();
  });

  return (
    <div style={{ margin: "100px auto" }}>
      <form onSubmit={cusLogin}>
        <input placeholder="Email" name="email" />
        <input placeholder="password" name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
