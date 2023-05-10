import Image from "next/image";

export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  titleText?: string;
  subText?: string | React.ReactNode;
}> = ({
  icon = (
    <Image
      src="/images/icon-empty.svg"
      alt="empty state"
      width={241}
      height={200}
    />
  ),
  titleText = "There is nothing here",
  subText = (
    <span>
      Create a product item by clicking <br /> the New Product button and get
      started.
    </span>
  ),
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {icon}
      <div className="flex flex-col text-center mt-16 space-y-4">
        <p className="text-2xl text-white font-bold">{titleText}</p>
        <p className="text-sm text-blue-100 font-bold">{subText}</p>
      </div>
    </div>
  );
};
