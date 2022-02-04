import React from "react";
import {
  Modal,
  Grid,
  Box,
  Backdrop,
  Fade,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "700px",
    margin: "auto",
    display: "flex",
    backgroundColor: theme.palette.background.paper,
  },
  frame: {
    height: "340px",
    width: "300px",
    borderRight: "1px solid #ddd",
    position: "relative",
  },
  img: {
    maxWidth: "300px",
    maxHeight: "340px",
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
  productName: {
    margin: "10px",
    color: "#302b2b",
    fontWeight: "600",
  },
}));

const DetailProduct = ({ product, open, handleClose }) => {
  const classes = useStyles();

  // console.log("detailproduct rendering");
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
          <Box className={classes.style}>
            <Grid className={classes.card}>
              <Grid item xs={6} sm={7} md={7} lg={8}>
                <div className={classes.frame}>
                  <img
                    className={classes.img}
                    src={product.productImage}
                    alt={product.name}
                  />
                </div>
              </Grid>
              <Grid
                className={classes.productName}
                item
                xs={6}
                sm={8}
                md={8}
                lg={10}
              >
                <h3>{product.name}</h3>
                <p>Rp. 500000</p>
                <Typography>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  id debitis soluta magnam, molestias nulla nobis tempore fugit,
                  non deleniti aliquam velit explicabo ab
                </Typography>
                <Typography>Category : Sepatu</Typography>
                <Grid>
                  <Button
                    type="button"
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Add to cart
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default React.memo(DetailProduct);
