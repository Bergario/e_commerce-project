import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  /* 

nav {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;

   ul,
li {
  margin: 0;
  padding: 0;
}

ul {
  padding: 25px;
  position: absolute;
  top: 100px;
  width: 230px;
}

li {
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}



.refresh {
  padding: 10px;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
} 
} */

  root: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(180deg, #0055ff 0%, rgb(0, 153, 255) 100%)",
    overflow: "hidden",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "300px",
    background: "linear-gradient(321deg, #eeffed 0%, rgb(255 255 255) 100%)",
    zIndex: "3",
  },

  toggleButton: {
    outline: "none",
    border: "none",
    "-webkit-user-select": "none",
    " -moz-user-select": "none",
    "-ms-user-select": "none",
    cursor: "pointer",
    position: "absolute",
    top: "12px",
    left: "15px",
    width: "50px",
    height: "50px",
    borderRadius: " 50%",
    background: "transparent",
    zIndex: "3",
  },
  nav: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    height: "100vh",
    zIndex: "3",
  },
  iconPlaceholder: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    flex: "40px 0",
    marginRight: "20px",
  },

  textPlaceholder: {
    borderRadius: "5px",
    width: "200px",
    height: "20px",
    flex: "1",
  },
  ul: {
    margin: 0,
    padding: 0,
    padding: "25px",
    position: "absolute",
    top: "100px",
    width: "230px",
    zIndex: "3",
  },
  li: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
}));
