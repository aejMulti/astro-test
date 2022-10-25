import { useStore } from "@nanostores/react";
import { nanoid } from "nanoid/non-secure";
import { computed } from "nanostores";
import { useState, useContext, useEffect, useMemo } from "react";
import {
  allItems,
  allSections,
  setAllItems,
  setAllSections,
  updateSections,
} from "../budgetStore";
import OptionPickerDemo, { OptionPicker } from "./InputEdit";
import { AddOptionSection, OptionSection } from "./sectionInput";

const SectionList = () => {
  const sections = useStore(allSections);

  const addNewSection = (label: string) => {
    const addedOption: any = {
      id: nanoid(),
      title: label,
      amount: "0",
    };
    setAllSections(addedOption);
  };

  const updateSection = (id: string, value: any, key: string) => {
    const updated = sections.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      } else {
        return item;
      }
    });
    console.log(updated);
    updateSections(updated);
  };

  const deleteSection = (id: string) => {
    let updatedOptions = items.filter((option) => option.id !== id);
    setAllSections(updatedOptions);
  };

  const ItemList = ({ sectionid }) => {
    const items = useStore(allItems).filter(
      (item) => item.sectionid === sectionid
    );

    const updateItem = (id: string, option: any, key: string) => {
      let _optionToUpdate = items.find((option) => option.id === id);
      _optionToUpdate[key] = option;
      console.log(_optionToUpdate);
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
  const items = useStore(allItems);

  const createSections = sections.map((section) => {
    const calcTotal = items
      .filter((item) => item.sectionid === section.id)
      .reduce((sum, { amount }) => {
        return Number(sum) + Number(amount);
      }, 0);

    return (
      <div>
        <div className="bg-slate-400 font-bold text-xl flex fade-in-text">
          <OptionSection
            option={section.title}
            updateOption={updateSection}
            deleteOption={deleteSection}
            id={section.id}
            valueKey="title"
          />
          {calcTotal.toString().replace("-", "+")}
        </div>
        <ItemList sectionid={section.id} />
      </div>
    );
  });

  return (
    <div>
      <AddOptionSection addOption={addNewSection} />
      {createSections}
    </div>
  );
};

export default SectionList;
