import React, { useEffect, useState } from "react";

export const BudgetContext = React.createContext();

const BudgetProvider = ({ children }) => {
  const myData = [
    { title: "Dogs", value: 90, color: "orange" },
    { title: "Cats", value: 50, color: "green" },
    { title: "Dragons", value: 0, color: "purple" }
  ];
  const [budgetList, setBudgetList] = useState([]);
  const [sectionList, setSectionList] = useState(myData);
  const [budget, setBudget] = useState(myData);
  const [currentBudget, setCurrentBudget] = useState(null);

  useEffect(() => {
    console.log(currentBudget);
  }, [currentBudget]);
  useEffect(() => {
    console.log(sectionList);
  }, [sectionList]);
  const updateBudget = (budget) => {
    setBudget(budget);
  };

  return (
    <BudgetContext.Provider
      value={{
        budget,
        updateBudget,
        myData,
        currentBudget,
        setCurrentBudget,
        budgetList,
        setBudgetList,
        sectionList,
        setSectionList
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetProvider;
