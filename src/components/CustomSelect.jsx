import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const CustomSelect = ({
  options,
  selectedValue,
  onChange,
  placeholder = "Pilih...",
  buttonClassName = "",
  optionsContainerClassName = "",
  absolutePosition = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleKeyDown = (event, value) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOptionClick(value);
    }
  };

  const defaultButtonClasses =
    "relative text-sm w-full h-10 cursor-default rounded-md bg-accent dark:bg-pink-600 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 dark:text-gray-200";
  const finalButtonClassName = `${defaultButtonClasses} ${buttonClassName}`;

  let defaultOptionsContainerClasses =
    "mt-1 max-h-60 w-full overflow-auto rounded-md bg-accent dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm";
  if (absolutePosition) {
    defaultOptionsContainerClasses = `absolute z-30 ${defaultOptionsContainerClasses}`;
  }
  const finalOptionsContainerClassName = `${defaultOptionsContainerClasses} ${optionsContainerClassName}`;

  const optionBaseClasses =
    "relative cursor-default select-none py-2 pl-10 pr-4";
  const optionHoverClasses =
    "hover:bg-pink-100 hover:text-pink-900 dark:hover:bg-gray-700 dark:hover:text-white";
  const optionSelectedClasses = "font-medium text-pink-700 dark:text-pink-400";
  const optionNormalClasses = "font-normal text-gray-900 dark:text-gray-200";
  const checkIconSelectedClasses = "text-pink-600 dark:text-pink-400";

  return (
    <div className={absolutePosition ? "relative" : ""} ref={wrapperRef}>
      <button
        type="button"
        className={finalButtonClassName}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate">{displayLabel}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 01.53.22l3.5 3.5a.75.75 0 01-1.06 1.06L10 4.81 6.53 8.28a.75.75 0 01-1.06-1.06l3.5-3.5A.75.75 0 0110 3zm-3.72 9.53a.75.75 0 011.06 0L10 15.19l3.47-3.47a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className={finalOptionsContainerClassName} role="listbox">
          {options.map((option, optionIdx) => (
            <div
              key={optionIdx}
              className={`${optionBaseClasses} ${optionNormalClasses} ${optionHoverClasses} ${
                selectedValue !== option.value
                  ? "text-gray-900 dark:text-gray-200"
                  : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              role="option"
              aria-selected={selectedValue === option.value}
              tabIndex={0}
            >
              <span
                className={`block truncate ${
                  selectedValue === option.value ? optionSelectedClasses : ""
                }`}
              >
                {option.label}
              </span>

              {selectedValue === option.value ? (
                <span
                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${checkIconSelectedClasses}`}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  buttonClassName: PropTypes.string,
  optionsContainerClassName: PropTypes.string,
  absolutePosition: PropTypes.bool,
};

export default CustomSelect;
