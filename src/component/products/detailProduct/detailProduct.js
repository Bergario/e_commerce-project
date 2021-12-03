import React from "react";
import { Modal, Grid, Box, Backdrop, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "700px",
    margin: "auto",
    display: "flex",
    backgroundColor: theme.palette.background.paper,
  },
  frame: {
    height: "240px",
    width: "200px",
    border: "1px solid #ddd",
    position: "relative",
  },
  img: {
    maxWidth: "200px",
    maxHeight: "240px",
    display: "inline-block",
    margin: "auto",
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #fff",
    outlineColor: "#f3f3f3",
    borderRadius: "3px",
  },
}));

const DetailProduct = ({ product, open, handleClose }) => {
  const classes = useStyles();

  console.log("12", handleClose);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.style}>
            <Grid className={classes.card}>
              <Grid item xs={4}>
                <div className={classes.frame}>
                  <img
                    className={classes.img}
                    src={product.productImage}
                    alt={product.name}
                  />
                </div>
              </Grid>
              <Grid item xs={8}>
                <h3>{product.name}</h3>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DetailProduct;
