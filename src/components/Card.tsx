import { CardProps } from '@/types/components';
import React from "react";

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-[300px] rounded-xl shadow-lg bg-white overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="m-0 mb-2 text-xl text-gray-800">
          {title}
        </h3>
        {description && (
          <p className="m-0 text-[0.95rem] text-gray-600 leading-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};