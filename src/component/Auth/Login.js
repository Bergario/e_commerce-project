import React, { useEffect } from "react";
import { commerce } from "../../lib/commerce";

const Login = () => {
  const cusLogin = async () => {
    await commerce.customer
      .login("jckstarla@gmail.com", "http://localhost:9000/login")
      .then((res) => console.log(res));
  };

  useEffect(() => {
    cusLogin();
  });
  return (
    <div style={{ margin: "100px auto" }}>
      <form>
        <input placeholder="Email" name="email" />
        <input placeholder="password" name="password" type="password" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
