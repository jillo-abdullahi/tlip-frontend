import React from "react";

interface ErrorIconProps {
  size?: number;
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({ size = 24 }) => {
  return (
    <svg
      aria-labelledby="errorIconTitle"
      color="#EC5757"
      fill="none"
      width={size}
      height={size}
      role="img"
      stroke="#EC5757"
      stroke-linecap="square"
      stroke-linejoin="miter"
      stroke-width="1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="errorIconTitle" />
      <path d="M12 8L12 13" />
      <line x1="12" x2="12" y1="16" y2="16" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

export default ErrorIcon;
