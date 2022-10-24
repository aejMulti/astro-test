import { useStore } from "@nanostores/react";
import { nanoid } from "nanoid/non-secure";
import { computed } from "nanostores";
import { useState, useContext, useEffect } from "react";
import { allItems, allSections, setAllItems } from "../budgetStore";
import OptionPickerDemo, { OptionPicker } from "./InputEdit";

const SectionList = () => {
  const sections = useStore(allSections);

  const ItemList = ({ sectionid }) => {
    const items = useStore(allItems).filter(
      (item) => item.sectionid === sectionid
    );

    const updateItem = (id: string, option: any, key: string) => {
      let _optionToUpdate = items.find((option) => option.id === id);
      _optionToUpdate[key] = option;
      const updatedItems = items.map((option) => {
        return option.id === id ? _optionToUpdate : option;
      });
      setAllItems(updatedItems);
    };

    const addNewItem = (label: string, amount: number) => {
      const addedOption: any = {
        id: nanoid(),
        label: label,
        amount: amount,
        sectionid: sectionid,
      };
      setAllItems(addedOption);
    };

    const deleteItem = (id: string) => {
      let updatedOptions = items.filter((option) => option.id !== id);
      setAllItems(updatedOptions);
    };

    return (
      <div>
        <OptionPicker
          options={items}
          updateOption={updateItem}
          addNewOption={addNewItem}
          deleteOption={deleteItem}
        />
      </div>
    );
  };

  const createSections = sections.map((section) => {
    const items = useStore(allItems).filter(
      (item) => item.sectionid === section.id
    );

    const format = (sum) => {
      if (sum < 0) {
        return `+${sum}`;
      }
      return sum;
    };
    const calcTotal = items.reduce((sum, { amount }) => {
      return Number(sum) + Number(amount);
    }, 0);
    console.log(calcTotal);

    // filtered.reduce((sum, { amount }) => {
    // console.log({ amount });
    //   return format(sum + amount);
    // }, 0);

    return (
      <div>
        <div className="bg-slate-400 font-bold text-xl">
          {section.title + calcTotal.toString().replace("-", "+")}
        </div>
        <ItemList sectionid={section.id} />
      </div>
    );
  });

  return <div>{createSections}</div>;
};

export default SectionList;
