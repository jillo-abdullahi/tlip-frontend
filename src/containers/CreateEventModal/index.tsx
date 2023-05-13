import { Modal } from "@/components/modal";
import { ProgressStatus, NewProductEvent } from "@/utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Product, EventType, EventStatus } from "@/utils/types";
import { BASE_API_URL } from "@/utils/constants";
import { EventModalProgress } from "@/containers/EventModalProgress";
import { EventModalFields } from "@/containers/EventModalFields";

export const CreateEventModal: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeProduct: Product | null;
  fetchProductEvents: (id: string) => void;
}> = ({ open, setOpen, activeProduct, fetchProductEvents }) => {
  const initialEventDetails = {
    eventType: EventType.Transfer,
    eventStatus: EventStatus.Pending,
    location: "",
    custodian: "",
    notes: "",
  };
  const [createEventStatus, setCreateEventStatus] =
    useState<ProgressStatus | null>(null);
  const [productEventDetails, setProductEventDetails] =
    useState<NewProductEvent>(initialEventDetails);

  const createProductEvent = async (): Promise<void> => {
    setCreateEventStatus(ProgressStatus.InProgress);

    const response = await fetch(
      `${BASE_API_URL}/items/${activeProduct?.id}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productEventDetails),
      }
    );

    if (!response.ok) {
      setCreateEventStatus(ProgressStatus.Failed);
    } else {
      setCreateEventStatus(ProgressStatus.Completed);
      // refetch product events
      fetchProductEvents(activeProduct?.id as string);
    }
  };

  const closeCreateModal = (): void => {
    // refetch events if event was created successfully
    if (createEventStatus === ProgressStatus.Completed) {
      fetchProductEvents(activeProduct?.id as string);
    }
    setProductEventDetails(initialEventDetails);
    setCreateEventStatus(null);
    setOpen(false);
  };

  const discardForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeCreateModal();
    setOpen(false);
  };

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProductEvent();
  };

  // change handlers
  const handleEventInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductEventDetails({
      ...productEventDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleEventTypeChange = (value: string) => {
    setProductEventDetails({
      ...productEventDetails,
      eventType: value as EventType,
    });
  };

  const handleEventStatusChange = (value: string) => {
    setProductEventDetails({
      ...productEventDetails,
      eventStatus: value as EventStatus,
    });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductEventDetails({
      ...productEventDetails,
      notes: e.target.value,
    });
  };

  return (
    <Modal open={open} setOpen={closeCreateModal}>
      {/* default modal state  */}
      {createEventStatus === null && (
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl text-white font-bold">
            <span>
              Add <span className="text-blue-200">#</span>
              <span className="text-white uppercase">
                {activeProduct?.skucode.split("-")[0]}
              </span>{" "}
              event
            </span>
          </h1>
          <form
            className="flex flex-col mt-8 space-y-4"
            onSubmit={handleCreateEvent}
          >
            <EventModalFields
              productEventDetails={productEventDetails}
              handleEventInputChange={handleEventInputChange}
              handleEventTypeChange={handleEventTypeChange}
              handleEventStatusChange={handleEventStatusChange}
              handleNotesChange={handleNotesChange}
            />

            {/* CTAs  */}
            <div className="flex items-center justify-end space-x-4 pt-8">
              <button
                onClick={discardForm}
                className="text-blue-200 underline hover:text-blue-100 transition-all duration-300 ease-in-out"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 hover:bg-blue-300 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">Create</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Event creation progress states  */}
      <EventModalProgress
        createEventStatus={createEventStatus}
        closeCreateModal={closeCreateModal}
        discardForm={discardForm}
        createProductEvent={createProductEvent}
      />
    </Modal>
  );
};
