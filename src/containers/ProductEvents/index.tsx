import moment from "moment";
import { ColumnItem } from "@/components/columnItem";
import { EmptyState } from "@/components/emptyState";
import { EventStatusBadge } from "@/components/eventStatusBadge";
import { ProductEvent } from "@/utils/types";

interface ProductEventsProps {
  productEvents: ProductEvent[];
}

export const ProductEvents: React.FC<ProductEventsProps> = ({
  productEvents,
}): JSX.Element => {
  return (
    <>
      <div className="font-bold text-blue-500 my-4">Events</div>
      {productEvents.length > 0 ? (
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
            {productEvents.map(
              ({ id, eventtimestamp, eventstatus, eventtype, custodian }) => {
                return (
                  <div key={id} className="grid grid-cols-4 gap-3 py-2">
                    <ColumnItem>
                      <span className="text-sm text-white font-bold">
                        {moment(new Date(eventtimestamp)).format(
                          "MMMM Do, YYYY"
                        )}
                      </span>
                    </ColumnItem>
                    <ColumnItem>
                      <span className="text-white font-bold">{eventtype}</span>
                    </ColumnItem>

                    <ColumnItem>
                      {" "}
                      <span className="text-white font-bold">{custodian}</span>
                    </ColumnItem>
                    <EventStatusBadge eventStatus={eventstatus} />
                  </div>
                );
              }
            )}
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
    </>
  );
};
