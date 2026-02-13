"use client";

import { ReactElement } from "react";

interface ButtonProps {
  text: string,
  variant: "primary" | "secondary",
  size: "fit" | "full",
  onClickHandler?: ()=>void,
  disabledState?: boolean,
  icon?: ReactElement
}

const defaultStyles = "flex items-center justify-center gap-2 text-lg border border-dark-cream cursor-pointer shadow-lg";

const customStyles = {
  "primary": "bg-dark-cream text-white hover:text-dark-cream hover:bg-white",
  "secondary": "text-dark-cream bg-white hover:text-white hover:bg-dark-cream"
};

const sizeStyle = {
  "full": "w-full rounded-xl py-2",
  "fit": "rounded-md p-2"
}

export default function Button ({ text, variant, size, onClickHandler,disabledState,icon }: ButtonProps) {
  return (
    <button onClick={onClickHandler} className={`${defaultStyles} ${customStyles[variant]} ${sizeStyle[size]}`} disabled={disabledState}>
      {icon}
      <p>{text}</p>
    </button>
  );
};
