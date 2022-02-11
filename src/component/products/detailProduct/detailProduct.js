import React, { useState } from "react";
import {
  Modal,
  Grid,
  Box,
  Backdrop,
  Fade,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";

import { priceFormat } from "../../../Utils/Utilities";

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
    borderBottom: "1px solid #ddd",
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
  sideView: {
    width: "5rem",
    height: "4rem",
    objectFit: "cover",
    cursor: "pointer",
    margin: "0.3rem",
    boxSizing: "border-box",
    "&:active": {
      border: "2px solid blue",
    },
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#e3cf25"),
  backgroundColor: "#e3cf25",
  color: "#3e3e3ede",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "#c9b406",
  },
}));

const DetailProduct = ({ product, open, handleClose }) => {
  const classes = useStyles();

  const [image, setImage] = useState();

  const viewImageHandler = (e) => {
    const img = e.target.currentSrc;
    setImage(img);
    console.log(e.target.currentSrc);
  };

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
                    src={image ? image : product.productImage}
                    alt={product.name}
                  />
                </div>
                <div>
                  <img
                    onClick={viewImageHandler}
                    className={classes.sideView}
                    src="http://placekitten.com/200/126"
                  />
                  <img
                    onClick={viewImageHandler}
                    className={classes.sideView}
                    src="http://placekitten.com/200/126"
                  />
                  <img
                    onClick={viewImageHandler}
                    className={classes.sideView}
                    src="http://placekitten.com/200/126"
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
                <h3>{priceFormat(product.price)}</h3>
                <Typography>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  id debitis soluta magnam, molestias nulla nobis tempore fugit,
                  non deleniti aliquam velit explicabo ab
                </Typography>
                <Typography style={{ padding: "1.3rem 0" }}>
                  <span style={{ fontWeight: "bold" }}>Category: </span>Sepatu
                </Typography>
                <Grid>
                  <ColorButton
                    type="button"
                    size="small"
                    variant="contained"
                    // color="primary"
                  >
                    Add to cart
                  </ColorButton>
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
