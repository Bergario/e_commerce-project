import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: {
    marginTop: "100px",
  },
  order: {
    margin: "20px auto",
    width: "80%",
    padding: "20px",
    border: "1px solid #eeee",
    borderRadius: "20px",
    minHeight: " 300px",
  },
  button: {
    margin: "10px",
  },
  orderItemBox: {
    border: "1px solid #dddd",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "10px",
  },
  labelStatus: {
    padding: "3px",
    borderRadius: "5px",
    background: "#e1f3e1",
    color: "green",
    marginLeft: "10px",
    padding: "3px 10px",
  },
  orderItemDetail: {
    display: "flex",
  },
  imgOrder: {
    width: "100px",
    height: "100px",
    margin: "10px",
  },
  itemContentCol: {
    width: "calc(100% - 180px)",
  },
}));
