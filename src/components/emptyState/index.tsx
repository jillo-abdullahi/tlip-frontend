import Image from "next/image";
export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/images/icon-empty.svg"
        alt="empty state"
        width={241}
        height={200}
      />
      <div className="flex flex-col text-center mt-16 space-y-4">
        <p className="text-2xl text-white font-bold">There is nothing here</p>
        <p className="text-sm text-blue-100 font-bold">
          Create a product item by clicking <br /> the New Product button and
          get started.
        </p>
      </div>
    </div>
  );
};
