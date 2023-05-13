import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { ColumnItem } from "@/components/columnItem";
import { EmptyState } from "@/components/emptyState";
import { EventStatusBadge } from "@/components/eventStatusBadge";
import { ProductEvent } from "@/utils/types";
import { ProductEventDetailsModal } from "@/containers/ProductEventDetailsModal";

interface ProductEventsProps {
  productEvents: ProductEvent[];
}

export const ProductEvents: React.FC<ProductEventsProps> = ({
  productEvents,
}): JSX.Element => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [activeEvent, setActiveEvent] = useState<ProductEvent | null>(null);

  const closeDetailsModal = () => {
    setOpenDetailsModal(!openDetailsModal);
  };

  return (
    <>
      <div className="font-bold text-blue-500 my-4">Events</div>
      {productEvents.length > 0 ? (
        <div className="rounded-lg p-8 w-full bg-blue-600 space-y-4">
          {/* header titles  */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            <div className="text-sm text-blue-100 font-normal">Created on</div>
            <div className="hidden sm:block text-sm text-blue-100 font-normal">
              Type
            </div>
            <div className="hidden md:block text-sm text-blue-100 font-normal">
              Status
            </div>
          </div>

          {/* event details  */}
          <div className="divide-y divide-gray-600">
            {productEvents.map((event) => {
              const { id, eventtimestamp, eventstatus, eventtype } = event;
              return (
                <div
                  key={id}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 py-2"
                >
                  <ColumnItem>
                    <span className="text-sm text-white font-bold">
                      {moment(new Date(eventtimestamp)).format("MMMM Do, YYYY")}
                    </span>
                  </ColumnItem>
                  <div className="hidden sm:block">
                    <ColumnItem>
                      <span className="text-white font-bold">{eventtype}</span>
                    </ColumnItem>
                  </div>

                  <div className="hidden md:block">
                    <EventStatusBadge eventStatus={eventstatus} />
                  </div>

                  {/* view full event details  */}
                  <button
                    className="flex items-center justify-start group"
                    onClick={() => {
                      setActiveEvent(event);
                      setOpenDetailsModal(true);
                    }}
                  >
                    <span className="text-blue-200 pr-2">View</span>
                    <Image
                      src="/images/icon-carat.svg"
                      width={12}
                      height={12}
                      alt=""
                      className="transform group-hover:translate-x-0.5 duration-75 ease-in"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-lg p-8 w-full bg-blue-600">
          <EmptyState
            subText="There are no events associated with this product"
            titleText="Nothing here"
          />
        </div>
      )}
      {activeEvent && (
        <ProductEventDetailsModal
          isOpen={openDetailsModal}
          setIsOpen={closeDetailsModal}
          activeEvent={activeEvent}
        />
      )}
    </>
  );
};
