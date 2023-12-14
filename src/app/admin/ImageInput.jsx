/* eslint-disable consistent-return */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */

'use client';

import { useState } from 'react';
import './FileInput.css';

export default function ImageInput({ setImage, initImage }) {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="flex justify-start items-start gap-4 flex-col">
      <label
        htmlFor="image"
        form="image"
        className="flex justify-start items-start gap-2 flex-col"
      >
        <span>Imagen</span>
        <input
          name="image"
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[e.target.files.length - 1];
            if (!file) return setImage(null);
            setImage(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setImageUrl(reader.result);
            };
          }}
        />
      </label>
      <div>
        <img
          src={imageUrl || initImage || 'https://cdn.discordapp.com/attachments/772232222220615710/1184679286871949382/Untitled-2023-07-21-2004_6.png?ex=658cd990&is=657a6490&hm=1f93a7838766fad1a07914c969299ce21eaa7f97bf5955a0e08d465ea38a7d12&'}
          alt="img"
          className="w-full aspect-video"
        />
      </div>
    </div>
  );
}
