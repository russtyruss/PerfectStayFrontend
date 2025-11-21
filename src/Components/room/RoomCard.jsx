import React from 'react';
import '../PerfectStayHome.css';

const RoomCard = ({ id, name, location, image, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        bg-white 
        rounded-2xl 
        shadow-lg 
        hover:shadow-2xl 
        overflow-hidden 
        border border-gray-100 
        transition-transform 
        hover:-translate-y-1
        ${className}
      `}
    >
      {/* Room Image */}
      <img
        src={image || "https://via.placeholder.com/600x400?text=No+Image"}
        alt={name}
        className="w-full h-48 object-cover"
      />

      {/* Room Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">
          {name}
        </h3>

        <p className="text-gray-500 text-sm">
          {location}
        </p>
      </div>
    </div>
  );
};

export default RoomCard;
