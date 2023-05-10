import { Button, ButtonWithIcon } from "@/components/buttons";
import { EventStatusBadge } from "@/components/eventStatusBadge";
import { EventStatus } from "@/types";

export const ProductDetails: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-3 py-2">
        <div className="text-sm text-white">6th July 2024</div>
        <div className="text-white">Shipment</div>
        <div className="text-white">Custodian 1</div>
        <div className="text-white">
          <EventStatusBadge eventStatus={EventStatus.Transit} />
        </div>
      </div>
      <div className="grid grid-cols-10 gap-2">
        <div className="text-sm text-white">6th July 2024</div>
        <div className="text-white">Shipment</div>
        <div className="text-white">Custodian 1</div>
        <div className="text-white"> somethig </div>
        <div className="text-white"> somethig </div>
        <div className="text-white"> somethig </div>
      </div>
    </>
  );
};
