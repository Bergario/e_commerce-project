import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    marginBottom: "100px",
  },
  toolbar: {
    marginTop: "100px",
  },
  product: {
    margin: "10px",
  },
  table: {
    display: "table",
    maxWidth: "960px",
  },
  title: {
    fontSize: "1.5rem",
    fontFamily: "Lora",
    [theme.breakpoints.only("xs")]: {
      fontSize: "1rem",
      fontFamily: "Lora",
    },
  },
  emptyButton: {
    margin: "10px",
  },
  checkoutButton: {
    margin: "10px",
  },
  boxTable: {
    marginTop: "30px",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
  subtotal: {
    fontWeight: "600",
    fontSize: "1rem",
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.8rem",
    },
  },
  navBottom: {
    overflow: "hidden",
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#d8d8d8",
    right: 0,
    justifyContent: "space-between",
  },
  buttonBeli: {
    marginRight: "20px",
  },
  total: {
    fontWeight: "600",
    fontSize: "0.8rem",
    marginLeft: "35px",
  },
  orderItemBox: {
    border: "1px solid #f3f3f3dd",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "10px",
    boxShadow: "4px 5px 10px #eeee",
    color: "#585353",
  },
  orderItemDetail: {
    display: "flex",
  },
  itemContentCol: {
    width: "200px",
    borderRight: "1px solid #eeee",
  },
  imgOrder: {
    width: "60px",
    height: "60px",
    margin: "10px",
    borderRadius: "8px",
  },
  priceDetail: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    margin: "10px auto",
  },
  quantityButton: {
    fontWeight: "600",
    width: "15px",
    height: "15px",
    backgroundColor: "#3ab36a",
    borderRadius: "50%",
    display: "inline-flex",
    color: "#fffe",
    padding: "5px",
    fontSize: "1rem",
  },
  quantity: {
    padding: "0 20px",
    borderBottom: "1px solid #d6d6d6",
    fontWeight: "600",
    margin: "0 10px",
  },
  snackbar: {
    [theme.breakpoints.only("xs")]: {
      bottom: "10%",
    },
  },
  emptycart: {
    fontFamily: "Lora",
  },
}));
