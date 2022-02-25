import React, { useMemo } from "react";
import { motion } from "framer-motion";
import MenuItem from "./menuItem";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    display: "block",
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      y: { stiffness: 1000 },
    },
    display: "none",
  },
};

const zzz = {
  open: { display: "block" },
  closed: { display: "none" },
};

const MenuItems = () => {
  const classes = useStyles();
  const itemIds = [0, 1, 2, 3, 4];

  //Redux
  const { category } = useSelector((state) => ({
    category: state.category.category,
  }));

  console.log(category);

  const listCategory =
    category &&
    category.map((data, i) => <MenuItem cat={data} i={i} key={i} />);

  return (
    <motion.ul variants={variants} className={classes.ul}>
      <motion.div variants={zzz}>Category :</motion.div>
      {listCategory}
    </motion.ul>
  );
};

export default MenuItems;
