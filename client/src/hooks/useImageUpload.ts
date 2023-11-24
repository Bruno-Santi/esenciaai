import React, { useRef, useState } from "react";

export const useImageUpload = (fileInputRef) => {
  const [imageSelected, setImageSelected] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageSelected(objectUrl);
    }
  };

  return {
    imageSelected,
    handleImageClick,
    handleFileChange,
    fileInputRef,
  };
};
