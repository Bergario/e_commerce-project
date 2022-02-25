import React, { useRef, useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import { Backdrop } from "@material-ui/core";

import MenuToggle from "./menuToggle";
import useStyles from "./styles";
import MenuItems from "./menuItems";

const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);
  return dimensions.current;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 40px 34px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Sidebar = () => {
  const classes = useStyles();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={classes.nav}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: 1 }}
        open={isOpen}
        onClick={() => toggleOpen()}
      ></Backdrop>
      <motion.div className={classes.background} variants={sidebar} />
      <MenuItems />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default React.memo(Sidebar);
