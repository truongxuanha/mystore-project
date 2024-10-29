import React from "react";

type Props = {
  width?: string;
  height?: string;
  background?: string;
  icon?: string;
  color?: string;
  border?: string;
  padding?: string;
  img?: any;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ width = "100%", height = "100%", background, color, img, border, padding, children, ...props }: Props) {
  const stylesButton = {
    background,
    color,
    border,
    width,
    height,
    padding,
  };
  return (
    <button style={stylesButton} {...props} className="flex items-center justify-center rounded-md">
      {img && img}
      {children && children}
    </button>
  );
}

export default Button;
