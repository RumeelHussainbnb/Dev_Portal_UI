import React, { useRef, useState } from 'react';

// props format {id,name}

const MultiSelection = ({
  onAdd,
  error,
  onChange,
  searchPlaceholder = 'Search Name',
  onRemove,
  placeholder = 'Select',
  title = 'Select',
  value = [],
  required,
  options = ['option 1', 'option 2']
}) => {
  const searchBar = useRef();
  const [show, setShow] = useState(false);
  return (
    <div className="w-full px-4 lg:w-6/12">
      <div className="relative mb-3 w-full">
        <label
          className="mb-2 block text-xs font-bold uppercase text-slate-600"
          htmlFor="grid-password"
        >
          {title}
        </label>
        <div className="flex w-full flex-wrap space-x-1">
          {value?.length ? (
            value.map((item, index) => (
              <div
                className="mb-1 flex w-fit items-center rounded bg-[#FACC15] p-1 text-white"
                key={index}
              >
                <p>{item}</p>
                <div
                  className="ml-2 flex h-4 w-4 cursor-pointer items-start justify-center rounded-full bg-red-500 text-[10px] hover:bg-white hover:text-black"
                  onClick={() => onRemove(item)}
                >
                  x
                </div>
              </div>
            ))
          ) : (
            <>{/* <h1 className="text-red-500 mb-1">Not Selected</h1> */}</>
          )}
        </div>
        <div>
          <input
            onChange={onChange}
            type="text"
            ref={searchBar}
            onFocus={() => {
              setShow(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setShow(false);
              }, 200);
            }}
            className={`w-full cursor-pointer border-slate-300 bg-white p-2 focus:outline-none  ${
              show ? 'rounded-t' : 'rounded'
            }`}
            placeholder={searchPlaceholder}
          />
        </div>
        {show && (
          <div className="absolute z-50 max-h-36 w-full overflow-scroll bg-white shadow">
            {options ? (
              options
                // rendering only options which are not selected

                .map((item, index) => (
                  <div key={index}>
                    {index !== 0 && <hr />}
                    <div
                      className="cursor-pointer p-1 hover:bg-[#FACC15] hover:text-white"
                      onClick={() => {
                        onAdd(item);
                        //searchBar.current.focus();
                      }}
                    >
                      {item}
                    </div>
                  </div>
                ))
            ) : (
              <div>
                <div className="flex  justify-center rounded p-1">No Result!</div>
              </div>
            )}
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        {/* </select> */}
      </div>
    </div>
  );
};

export default MultiSelection;
