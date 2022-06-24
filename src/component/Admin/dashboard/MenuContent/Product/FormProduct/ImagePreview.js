import React, { useState } from "react";

import ActionImage from "./actionImage";

const ImagePreview = ({ img, index, onDeleteImage }) => {
  const [showMenuAction, setShowMenuAction] = useState(-1);

  const handleOpenMenuAction = (i) => {
    setShowMenuAction(i);
    console.log("test open");
  };
  const handleCloseMenuAction = (i) => {
    setShowMenuAction(-1);
    console.log("test close");
  };
  console.log(showMenuAction);

  return (
    <div style={{ marginRight: "10px", display: "inline-block" }}>
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => handleOpenMenuAction(index)}
        onMouseLeave={() => handleCloseMenuAction()}
      >
        <img
          src={typeof img == "string" ? img : URL.createObjectURL(img)}
          style={{ opacity: showMenuAction == index && "0.7", height: "100px" }}
        />
        <ActionImage
          onDeleteImage={onDeleteImage}
          showMenuAction={showMenuAction}
          index={index}
          img={img}
        />
      </div>
    </div>
  );
};

export default React.memo(ImagePreview);
