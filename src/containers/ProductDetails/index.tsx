import { Button, ButtonWithIcon } from "@/components/buttons";
import { EventStatusBadge } from "@/components/eventStatusBadge";
import { EventStatus } from "@/types";

export const ProductDetails: React.FC = () => {
  const ItemDetail: React.FC<{
    title: string;
    detail: string | React.ReactNode;
  }> = ({ title, detail }) => {
    return (
      <div className="flex flex-col space-y-2">
        <div className="text-sm text-blue-100">{title}</div>
        <div className="text-white font-bold">{detail}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4 items-center">
      {/* top action section  */}
      <div className="flex w-full items-center justify-between bg-blue-700 rounded-lg px-8 py-6">
        <div className="flex items-center justify-start space-x-2">
          <div className="rounded-full bg-red-300 w-12 h-12"></div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">
              <span className="text-blue-200">#</span>
              <span className="text-white">898998</span>
            </div>
            <div className="text-blue-100">Product 1</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Button text="Edit" onClick={() => console.log("clicked")} />
          <ButtonWithIcon
            text="Add Event"
            onClick={() => console.log("clicked")}
          />
        </div>
      </div>

      {/* product details card  */}
      <div className="flex flex-col w-full space-y-4 bg-blue-700 rounded-lg px-8 py-6">
        <div className="font-bold text-blue-500 my-4">Product information</div>
        {/* description  */}
        <ItemDetail
          title="Description"
          detail="This is a product description that can span multiple lines. This is a product description that can span multiple lines. This is a product description that can span multiple lines. This is a product description that can span multiple lines. This is a product description that can span multiple lines."
        />

        <div className="grid grid-cols-4 gap-6">
          {/* created on  */}
          <ItemDetail title="Created On" detail="6th July 2024" />
          {/* price  */}
          <ItemDetail title="Price" detail="USD 4,000" />
          {/* weight  */}
          <ItemDetail title="Weight" detail="4.5kg" />
          {/* supplier  */}
          <ItemDetail title="Quantity" detail="400" />
        </div>

        {/* events  */}
        <div className="font-bold text-blue-500 my-4">Events</div>
        <div className="rounded-lg p-8 w-full bg-blue-600 space-y-4">
          {/* header titles  */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-sm text-blue-100 font-normal">Created on</div>
            <div className="text-sm text-blue-100 font-normal">Type</div>
            <div className="text-sm text-blue-100 font-normal">Custodian</div>
            <div className="text-sm text-blue-100 font-normal">Status</div>
          </div>

          {/* event details  */}
          <div className="divide-y divide-gray-600">
            <div className="grid grid-cols-4 gap-3 py-2">
              <div className="text-sm text-white">6th July 2024</div>
              <div className="text-white">Shipment</div>
              <div className="text-white">Custodian 1</div>
              <div className="text-white">
                <EventStatusBadge eventStatus={EventStatus.Transit} />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
