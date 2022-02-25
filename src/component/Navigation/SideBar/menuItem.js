import React from "react";
import { motion } from "framer-motion";
import useStyles from "./styles";

const variants = {
  open: {
    y: 0,
    display: "flex",
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    display: "none",
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const MenuItem = ({ i, cat }) => {
  const classes = useStyles();
  const style = { border: `2px solid ${colors[i]}` };

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={classes.li}
    >
      <div className={classes.iconPlaceholder} style={style} />
      <p>{cat.category}</p>
      {/* <div className={classes.textPlaceholder} style={style} /> */}
    </motion.li>
  );
};

export default MenuItem;
