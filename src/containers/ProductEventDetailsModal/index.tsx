import { EventStatusBadge } from "@/components/eventStatusBadge";
import { ItemDetail } from "@/components/itemDetail";
import { Modal } from "@/components/modal";
import { ProductEvent } from "@/utils/types";
import moment from "moment";

interface ProductEventDetailsModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  activeEvent: ProductEvent;
}

export const ProductEventDetailsModal: React.FC<
  ProductEventDetailsModalProps
> = ({ isOpen, setIsOpen, activeEvent }) => {
  const {
    id,
    eventtimestamp,
    eventstatus,
    eventtype,
    notes,
    location,
    custodian,
  } = activeEvent;
  return (
    <Modal open={isOpen} setOpen={setIsOpen}>
      <div className="flex flex-col space-y-6">
        <div className="w-full flex items-center justify-start">
          <h1 className="text-2xl text-white font-bold pr-4">
            <span>
              Event <span className="text-blue-200">#</span>
              <span className="text-white">{`${id}`}</span>
            </span>
          </h1>
          <EventStatusBadge eventStatus={eventstatus} />
        </div>
        <div className="pt-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ItemDetail
              title="Created On"
              detail={moment(new Date(eventtimestamp)).format("MMMM Do, YYYY")}
            />
            <ItemDetail title="Event Type" detail={eventtype} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ItemDetail title="Location" detail={location} />
            <ItemDetail title="Custodian" detail={custodian} />
          </div>
        </div>
        {notes && <ItemDetail title="Notes" detail={notes} />}
      </div>
    </Modal>
  );
};
