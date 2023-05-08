import Image from "next/image";

export const ItemCard: React.FC = () => {
  return (
    <div className="w-full bg-blue-700 grid grid-cols-6 gap-4 p-6 rounded-lg">
      {/* product id  */}
      <div className="font-bold">
        <span className="text-blue-200">#</span>
        <span className="text-white">898998</span>
      </div>
      {/* product name  */}
      <div className="text-white text-sm">Product 1</div>
      {/* created on  */}
      <div className="text-blue-100 text-sm">6th July 2024</div>
      {/* price in usd  */}
      <div className="text-white font-bold">USD 4,000</div>
      {/* weight  */}
      <div className="text-blue-100 font-bold">4.5kg</div>
      {/* right facing carat  */}
      <div className="flex items-center justify-end">
        <button onClick={() => console.log("clicked")} className="w-fit h-fit">
          <Image
            src="/images/icon-carat.svg"
            alt="right facing carat"
            width={10}
            height={12}
          />
        </button>
      </div>
    </div>
  );
};
