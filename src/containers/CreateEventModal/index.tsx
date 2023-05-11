import { Modal } from "@/components/modal";
import { ProgressStatus } from "@/utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Product, EventType, EventStatus } from "@/utils/types";
import { InputField, TextArea } from "@/components/inputs";
import { SelectInput } from "@/components/selectInput";
import SuccessIcon from "@/components/icons/success";
import ErrorIcon from "@/components/icons/error";
import SpinnerIcon from "@/components/icons/spinner";
import { BASE_API_URL } from "@/utils/constants";

export const CreateEventModal: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeProduct: Product | null;
  fetchProductEvents: (id: string) => void;
}> = ({ open, setOpen, activeProduct, fetchProductEvents }) => {
  const [createEventStatus, setCreateEventStatus] =
    useState<ProgressStatus | null>(null);

  // form fields
  const [eventType, setEventType] = useState<EventType>(EventType.Transfer);
  const [eventStatus, setEventStatus] = useState<EventStatus>(
    EventStatus.Pending
  );
  const [location, setLocation] = useState<string>("");
  const [custodian, setCustodian] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const createProductEvent = (): void => {
    setCreateEventStatus(ProgressStatus.InProgress);
    const body = {
      eventType,
      eventStatus,
      location,
      custodian,
      notes,
    };
    fetch(`${BASE_API_URL}/items/${activeProduct?.id}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 201) {
          setCreateEventStatus(ProgressStatus.Completed);
        } else {
          setCreateEventStatus(ProgressStatus.Failed);
        }
      })
      .catch((err) => {
        setCreateEventStatus(ProgressStatus.Failed);
      });
  };

  const closeCreateModal = (): void => {
    // refetch events if event was created successfully
    if (createEventStatus === ProgressStatus.Completed) {
      fetchProductEvents(activeProduct?.id as string);
    }
    setEventType(EventType.Transfer);
    setEventStatus(EventStatus.Pending);
    setLocation("");
    setCustodian("");
    setNotes("");
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
  const handleEventTypeChange = (value: string) => {
    setEventType(value as EventType);
  };

  const handleEventStatusChange = (value: string) => {
    setEventStatus(value as EventStatus);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleCustodianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustodian(e.target.value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
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
            className="flex flex-col space-y-4 mt-8"
            onSubmit={handleCreateEvent}
          >
            <div className="flex flex-col space-y-4">
              {/* Event type  */}

              <SelectInput
                dropdownOptions={Object.values(EventType)}
                label="Event Type"
                value={eventType}
                setValue={handleEventTypeChange}
                id="eventType"
              />

              {/* Event status  */}
              <SelectInput
                dropdownOptions={Object.values(EventStatus)}
                label="Event Status"
                value={eventStatus}
                setValue={handleEventStatusChange}
                id="eventStatus"
              />
            </div>

            <div className="flex items-center justify-start space-x-6 mt-2">
              {/* location  */}
              <InputField
                value={location}
                handleChange={handleLocationChange}
                id="location"
                label="Location"
                isRequired={true}
              />

              {/* custodian  */}
              <InputField
                value={custodian}
                handleChange={handleCustodianChange}
                id="custodian"
                label="Custodian"
                isRequired={true}
              />
            </div>

            {/* notes  */}
            <TextArea
              value={notes}
              handleChange={handleNotesChange}
              id="notes"
              label="Notes"
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

      {/* success modal state  */}
      {createEventStatus === ProgressStatus.Completed && (
        <div className="flex flex-col space-y-8 items-center justify-center">
          <SuccessIcon size={72} />
          <div className="text-blue-100 font-bold text-xl">
            Event successfully created
          </div>
          <button
            className="px-8 py-3 bg-blue-500 hover:bg-blue-300 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center"
            onClick={closeCreateModal}
          >
            <span className="text-white font-bold text-lg">Close</span>
          </button>
        </div>
      )}

      {/* failed modal state  */}
      {createEventStatus === ProgressStatus.Failed && (
        <div className="flex flex-col space-y-8 items-center justify-center">
          <ErrorIcon size={72} />
          <div className="text-blue-100 font-bold text-xl">
            We could not create this event
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={discardForm}
              className="text-blue-200 underline hover:text-blue-100 transition-all duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              className="px-8 py-3 bg-blue-500 hover:bg-blue-300 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center"
              onClick={createProductEvent}
            >
              <span className="text-white font-bold text-lg">Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* pending modal state  */}
      {createEventStatus === ProgressStatus.InProgress && (
        <div className="flex flex-col space-y-8 items-center justify-center">
          <SpinnerIcon color="#7C5DFA" size={72} />
          <div className="text-blue-100 font-bold text-xl">
            Creating product event
          </div>
        </div>
      )}
    </Modal>
  );
};
