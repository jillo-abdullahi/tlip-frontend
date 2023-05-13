import ErrorIcon from "@/components/icons/error";
import SpinnerIcon from "@/components/icons/spinner";
import SuccessIcon from "@/components/icons/success";
import { ProgressStatus } from "@/utils/types";

interface EventModalProgressProps {
  createEventStatus: ProgressStatus | null;
  closeCreateModal: () => void;
  discardForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  createProductEvent: () => Promise<void>;
}

export const EventModalProgress: React.FC<EventModalProgressProps> = ({
  createEventStatus,
  closeCreateModal,
  discardForm,
  createProductEvent,
}): JSX.Element => {
  return (
    <>
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
    </>
  );
};
