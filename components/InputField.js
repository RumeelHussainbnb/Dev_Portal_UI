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
  maxlength = '100'
}) => {
  return (
    <div className={`w-full ${widthFull ? '' : 'lg:w-6/12'} px-4`}>
      <div className="relative mb-3 w-full">
        <label
          className="mb-2 flex text-xs font-bold uppercase text-slate-600 "
          htmlFor="grid-password"
        >
          {label}
          {required ? ' (' : ''}
          <div className="text-red-500">{required ? '*' : ''}</div>
          {required ? ')' : ''}
        </label>
        <input
          disabled={disabled}
          required={required}
          onChange={onChange}
          value={value || ''}
          type={type}
          className={`${
            error?.length > 0 ? 'border-[1px] border-red-500' : ''
          } w-full rounded border-[1px] border-slate-300 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring`}
          placeholder={placeholder}
          maxLength={maxlength}
        />
        {error?.length > 0 && <div className="mt-1 text-red-500">{error}</div>}
      </div>
    </div>
  );
};
export default InputField;
