import Image from "next/image";

interface ButtonProps {
  text: string;
  onClick: () => void;
  icon?: string;
}

const buttonTransition = "transition-all duration-300 ease-in-out";
const commonButtonStyles = "flex items-center";

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 bg-blue-600 hover:bg-opacity-80 rounded-full ${buttonTransition} ${commonButtonStyles}`}
    >
      <span className="text-blue-100 font-bold">{text}</span>
    </button>
  );
};

export const ButtonWithIcon: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`justify-between space-x-4 pl-2 pr-6 py-2 bg-blue-500 hover:bg-blue-300 rounded-3xl ${buttonTransition} ${commonButtonStyles}`}
    >
      <Image src="/images/icon-new.svg" alt="icon" width={32} height={32} />
      <span className="text-white font-bold">{text}</span>
    </button>
  );
};
