import React, { useState, useRef } from "react";

import ActionImage from "./actionImage";

const ImagePreview = ({ img, index }) => {
  const divRef = useRef();

  const [showMenuAction, setShowMenuAction] = useState(-1);

  const handleOpenMenuAction = (i) => {
    setShowMenuAction(i);
  };
  const handleCloseMenuAction = (i) => {
    setShowMenuAction(-1);
  };

  return (
    <div style={{ marginRight: "10px", display: "inline-block" }}>
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => handleOpenMenuAction(index)}
        onMouseLeave={() => handleCloseMenuAction()}
      >
        <img
          ref={divRef}
          src={typeof img == "string" ? img : URL.createObjectURL(img)}
          style={{ opacity: showMenuAction == index && "0.7", height: "100px" }}
        />
        <ActionImage
          showMenuAction={showMenuAction}
          index={index}
          divRef={divRef.current}
        />
        {/* <MoreHorizIcon
          aria-hiddden={false}
          color="action"
          style={{
            position: "absolute",
            right: "5%",
            display: showMenuAction == index || "none",
            cursor: "pointer",
          }}
        /> */}
      </div>
    </div>
  );
};

export default React.memo(ImagePreview);
