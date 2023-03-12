import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { allItems, allSections } from "../budgetStore";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const Component = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div>
      width: {width} ~ height: {height}
    </div>
  );
};
export const BudgetHeader = () => {
  const items = useStore(allItems);
  const calcTotal = () => {
    let sum = 0;
    for (var i = 0; i < items.length; i++) {
      //   console.log(items[i]);
      sum = sum + Number(items[i].amount);
    }
    return sum;
  };

  return (
    <>
      <div className="flex">
        <h1> {calcTotal()}</h1>
        <Component />
      </div>
    </>
  );
};
