import React from "react";

const DisplayImage = ({ base64Image }) => {
  return (
    <div>
      <h2>Image Display</h2>
      <img src={`data:image/jpeg;base64,${base64Image}`} alt="Medicine" />
    </div>
  );
};

export default DisplayImage;
