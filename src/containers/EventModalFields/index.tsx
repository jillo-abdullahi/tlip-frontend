import { InputField, TextArea } from "@/components/inputs";
import { SelectInput } from "@/components/selectInput";
import { EventStatus, EventType, NewProductEvent } from "@/utils/types";

interface EventModalFieldProps {
  productEventDetails: NewProductEvent;
  handleEventInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEventTypeChange: (value: string) => void;
  handleEventStatusChange: (value: string) => void;
  handleNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const EventModalFields: React.FC<EventModalFieldProps> = ({
  productEventDetails,
  handleEventInputChange,
  handleEventTypeChange,
  handleEventStatusChange,
  handleNotesChange,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* Event type  */}
        <SelectInput
          dropdownOptions={Object.values(EventType)}
          label="Event Type"
          value={productEventDetails.eventType}
          setValue={handleEventTypeChange}
          id="eventType"
        />

        {/* Event status  */}
        <SelectInput
          dropdownOptions={Object.values(EventStatus)}
          label="Event Status"
          value={productEventDetails.eventStatus}
          setValue={handleEventStatusChange}
          id="eventStatus"
        />
      </div>

      <div className="flex items-center justify-start space-x-6 mt-2">
        {/* location  */}
        <InputField
          value={productEventDetails.location}
          handleChange={handleEventInputChange}
          id="location"
          label="Location"
          isRequired={true}
        />

        {/* custodian  */}
        <InputField
          value={productEventDetails.custodian}
          handleChange={handleEventInputChange}
          id="custodian"
          label="Custodian"
          isRequired={true}
        />
      </div>

      {/* notes  */}
      <TextArea
        value={productEventDetails.notes}
        handleChange={handleNotesChange}
        id="notes"
        label="Notes"
      />
    </>
  );
};
