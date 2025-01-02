import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  image?: { image_id: string; image_url: string };
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={`mx-2 cursor-pointer border border-transparent hover:border-blue-500 rounded-xl transition-all duration-200 ${
        selected ? "border-stone-300" : ""
      }`}
    >
      {image && (
        <img
          onClick={onClick}
          src={image.image_url}
          alt="Product Image"
          width={50}
          height={50}
          className="h-[50px] rounded-xl transition-all duration-200"
        />
      )}
    </div>
  );
};
