const InputField = ({
  label,
  value,
  onChange,
  type,
  placeholder,
  required,
  error,
  disabled,
  widthFull = false,
}) => {
  return (
    <div className={`w-full ${widthFull ? "" : "lg:w-6/12"} px-4`}>
      <div className="relative w-full mb-3">
        <label
          className="uppercase text-slate-600 text-xs font-bold mb-2 flex "
          htmlFor="grid-password"
        >
          {label}
          {required ? " (" : ""}
          <div className="text-red-500">{required ? "*" : ""}</div>
          {required ? ")" : ""}
        </label>
        <input
          disabled={disabled}
          required={required}
          onChange={onChange}
          value={value}
          type={type}
          className={`${
            error?.length > 0 ? "border-[1px] border-red-500" : ""
          } px-3 py-3 placeholder-slate-300 text-slate-600 bg-white border-slate-300 rounded text-sm border-[1px] focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
          placeholder={placeholder}
        />
        {error?.length > 0 && <div className="text-red-500 mt-1">{error}</div>}
      </div>
    </div>
  );
};
export default InputField;
