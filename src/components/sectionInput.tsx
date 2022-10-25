import { useState } from "react";

export const AddOptionSection: React.FC<{
  addOption: (value: string) => void;
}> = ({ addOption }) => {
  const [optionValue, setOptionValue] = useState<any>("");

  const saveChange = (e) => {
    e.preventDefault();
    if (optionValue !== "") {
      addOption(optionValue);
      setOptionValue("");
    }
  };

  return (
    <div className="d-flex align-items-center todo-item p-1">
      <form onSubmit={saveChange}>
        <input
          className="todo-input w-100 ml-2"
          type="text"
          value={optionValue}
          onChange={(e) => setOptionValue(e.target.value)}
          placeholder="Legg til punkt"
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export const OptionSection: React.FC<{
  option: any;
  updateOption: any;
  deleteOption: any;
  id: string;
  valueKey: string;
}> = ({ option, updateOption, deleteOption, id, valueKey }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [optionValue, setOptionValue] = useState<any>(option);
  const [isHovered, setIsHovered] = useState(false);
  const saveChange = () => {
    if (optionValue === "") {
      setOptionValue(optionValue);
    } else {
      updateOption(id, optionValue, valueKey);
    }

    return setEditMode(false);
  };
  const blurInput = (e) => {
    saveChange();
  };

  const blurOnEnter = (e) => {
    if (e.key === "Enter") {
      return saveChange();
    }

    if (e.key === "Escape") {
      e.stopPropagation();
      setOptionValue(option.label);
      setEditMode(false);
    }
  };

  const stopPropagationOnEscape = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
    }
  };

  return (
    <div
      className="d-flex align-items-center todo-item p-1"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      {editMode === false ? (
        <div className="todo-value ml-2" onClick={() => setEditMode(true)}>
          {option}
        </div>
      ) : (
        <>
          <input
            className="todo-input w-100 ml-2"
            autoFocus={true}
            type={valueKey === "amount" ? "number" : "text"}
            value={optionValue}
            //@ts-ignore
            onChange={(e) => setOptionValue(e.target.value)}
            onKeyDown={blurOnEnter}
            // onKeyUp={stopPropagationOnEscape}
            // onBlur={blurInput}
            placeholder={option}
          />
        </>
      )}
      {/* <button
            onClick={() => deleteOption(option.value)}
            style={{ opacity: `${isHovered ? 1 : 0}` }}
          >
            delete
          </button> */}
    </div>
  );
};
