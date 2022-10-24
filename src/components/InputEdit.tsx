import { useState } from "react";
import { nanoid } from "nanoid/non-secure";

// const id = nanoid();

const OptionItem: React.FC<{
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

    setEditMode(false);
  };
  const blurInput = (e) => {
    saveChange();
  };

  const blurOnEnter = (e) => {
    if (e.key === "Enter") {
      saveChange();
      return;
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
            onKeyUp={stopPropagationOnEscape}
            onBlur={blurInput}
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

const AddOptionItem: React.FC<{
  addOption: (value: string, amount: string) => void;
}> = ({ addOption }) => {
  const [optionValue, setOptionValue] = useState<any>("");
  const [optionAmount, setOptionAmount] = useState<any>("");

  const saveChange = (e) => {
    e.preventDefault();
    if (optionValue !== "") {
      if (optionAmount === "") {
        addOption(optionValue, "0");
      } else addOption(optionValue, optionAmount);
      setOptionValue("");
      setOptionAmount("");
    } else {
    }
  };
  const blurInput = (e) => {
    saveChange(e);
  };

  const blurOnEnter = (e) => {
    if (e.key === "Enter") {
      if (optionAmount && optionValue) {
        saveChange(e);
      }
      return;
    }

    if (e.key === "Escape") {
      e.stopPropagation();
      setOptionValue("");
    }
  };

  const stopPropagationOnEscape = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
    }
  };

  return (
    <div className="d-flex align-items-center todo-item p-1">
      <form onSubmit={saveChange}>
        <input
          className="todo-input w-100 ml-2"
          type="text"
          value={optionValue}
          //@ts-ignore
          onChange={(e) => setOptionValue(e.target.value)}
          // onKeyDown={blurOnEnter}
          // onSubmit={blurOnEnter}
          // onKeyUp={stopPropagationOnEscape}
          // onBlur={blurInput}
          placeholder="Legg til punkt"
        />
        <input
          className="todo-input w-100 ml-2"
          type="number"
          value={optionAmount}
          //@ts-ignore
          onChange={(e) => setOptionAmount(e.target.value)}
          // onKeyDown={blurOnEnter}
          // onSubmit={blurOnEnter}
          // onKeyUp={stopPropagationOnEscape}
          // onBlur={blurInput}
          placeholder="Legg til punkt"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export const OptionPicker: React.FC<{
  options: any[];
  updateOption: any;
  addNewOption: any;
  deleteOption: any;
}> = ({ options, updateOption, addNewOption, deleteOption }) => {
  const handleClick = () => {
    for (let i = 0; i < 1000; i++) {
      addNewOption(`test${i}`, "1");
    }
  };
  return (
    <div>
      <AddOptionItem addOption={addNewOption} />
      <button onClick={handleClick}>test!</button>
      {options.map((item, i) => (
        <div className="flex">
          {i < 3 && (
            <>
              <OptionItem
                option={item.label}
                updateOption={updateOption}
                deleteOption={deleteOption}
                id={item.id}
                valueKey="label"
              />
              <OptionItem
                option={item.amount}
                updateOption={updateOption}
                deleteOption={deleteOption}
                id={item.id}
                valueKey="amount"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const OptionPickerDemo: React.FC = () => {
  const [options, setOptions] = useState<any[]>([
    { value: "1", label: "Alt", amount: 1 },
    { value: "2", label: "Alt", amount: 2 },
    { value: "3", label: "Alt", amount: 3 },
    { value: "4", label: "Alt", amount: 4 },
  ]);

  const updateOption = (value: string, label: string) => {
    let _optionToUpdate = options.find((option) => option.value === value);
    _optionToUpdate.label = label;
    const updatedOptions = options.map((option) => {
      return option.value === value ? _optionToUpdate : option;
    });
    setOptions(updatedOptions);
  };

  const addNewOption = (label: string, amount: number) => {
    const addedOption: any = {
      value: Math.random().toString(),
      label: label,
      amount: amount,
    };
    setOptions((options) => [...options, addedOption]);
  };

  const deleteOption = (value: string) => {
    let updatedOptions = options.filter((option) => option.value !== value);
    setOptions(updatedOptions);
  };

  return (
    <>
      <OptionPicker
        options={options}
        updateOption={updateOption}
        addNewOption={addNewOption}
        deleteOption={deleteOption}
      />
    </>
  );
};

export default OptionPickerDemo;
