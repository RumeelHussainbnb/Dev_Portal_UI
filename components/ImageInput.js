import React, { useState, useRef } from 'react';
import Image from 'next/image';

const ImageInput = ({
  onChange,
  title = 'image',
  selectedImage = null,
  error = '',
  imageUrl = '',
  handleRemoveImage,
  required
}) => {
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const inputRef = useRef(null);

  const imageSelected = e => {
    // passing the event to the parent
    onChange(e);
    setFile(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImage(objectUrl);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center self-center px-4 lg:w-6/12">
      <div className="bg- relative mb-3 flex w-full items-center justify-center">
        <label
          className="mb-2 flex text-xs font-bold uppercase text-slate-600"
          htmlFor="grid-password"
        >
          {required ? ' (' : ''}
          <div className="text-red-500">{required ? '*' : ''}</div>
          {required ? ')' : ''}
        </label>
        <div
          className={`flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-white py-1 ${
            error?.length > 0 ? 'border-red-500' : ''
          }`}
        >
          {image ? (
            <Image
              src={image}
              height={'300px'}
              width={'300px'}
              objectFit="contain"
              className="flex-1 bg-inherit"
              // layout="fill"
            />
          ) : (
            <Image
              src={selectedImage === null ? '/photo.png' : selectedImage}
              height={selectedImage === null ? 40 : 100}
              width={selectedImage === null ? 40 : 220}
            />
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        onChange={imageSelected}
        accept="image/*"
        type="file"
        className="w-32 rounded border-0 bg-white px-3 py-2 text-sm text-white placeholder-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring"
      />
    </div>
  );
};

export default ImageInput;
