interface InputFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  error?: string;
  id: string;
  isRequired?: boolean;
  label: string;
  type?: string;
}
export const InputField: React.FC<InputFieldProps> = ({
  handleChange,
  placeholder,
  value,
  error,
  id,
  isRequired,
  label,
  type = "text",
}) => {
  return (
    <div className="relative w-full">
      <div className={`flex space-x-1 ${isRequired ? "mb-2" : "mb-3"}`}>
        <label className="text-sm text-blue-100" htmlFor={id}>
          {label}
        </label>
        {isRequired && <span className="text-red-500">*</span>}
      </div>
      <input
        className={`w-full outline-none outline-offset-0 border border-blue-600 py-4 px-5 rounded hover p-2 font-bold placeholder-opacity-25 text-white bg-blue-700 placeholder-white caret-blue-500 ${
          error ? "outline-red outline-1 border" : ""
        }`}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        id={id}
        required={isRequired}
      />

      {error && (
        <span className="font-normal text-red text-sm mt-2">{error}</span>
      )}
    </div>
  );
};

// text area
interface TextAreaProps {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value: string;
  error?: string;
  id: string;
  label: string;
}
export const TextArea: React.FC<TextAreaProps> = ({
  handleChange,
  placeholder,
  value,
  error,
  id,
  label,
}) => {
  return (
    <div className="relative w-full">
      <div className="mb-3">
        <label className="text-sm text-blue-100" htmlFor={id}>
          {label}
        </label>
      </div>
      <textarea
        className={`w-full outline-none outline-offset-0 border border-blue-600 py-4 px-5 rounded hover p-2 font-bold placeholder-opacity-25 text-white bg-blue-700 placeholder-white caret-blue-500 ${
          error ? "outline-red outline-1 border" : ""
        }`}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        id={id}
      />
    </div>
  );
};
