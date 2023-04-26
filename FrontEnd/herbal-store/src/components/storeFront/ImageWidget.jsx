import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const ImageWidget = () => {
  const [proImages, setProImages] = useState([]);
  // const [imageRemove, setImageRemove] = useState(null);

  // const handleRemove = (imgObj) => {
  //   setImageRemove(imgObj.public_id);
  //   setTimeout(() => {
  //     axios
  //       .delete(`http://localhost:3000/image/${imgObj.public_id}`)
  //       .then(() => {
  //         setImageRemove(null);
  //         setImages((prev) =>
  //           prev.filter((img) => img.public_id !== imgObj.public_id)
  //         );
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, 5000); // wait for 5 seconds before sending the delete request
  // };

  const handleOpenWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dqyue23nj',
        uploadPreset: 'redstream',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setProImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    myWidget.open();
  };

  return (
    <>
      <button
        id="upload-widget"
        className="text-white border border-gray-400 p-2 w-full"
        onClick={handleOpenWidget}
      >
        Upload
      </button>

      <div className="image-preview-container" style={{ display: 'flex' }}>
        {proImages.map((img) => (
          <div
            key={img.public_id}
            className="image-preview"
            style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              margin: '5px',
            }}
          >
            <img
              src={img.url}
              alt={img.url}
              style={{ objectFit: 'cover', width: '100px', height: '100px' }}
            />
            {/* {imageRemove !== img.public_id && (
              <i
                className="fa fa-times-circle"
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                }}
                onClick={handleRemove(img)}
              ></i>
            )} */}
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageWidget;
