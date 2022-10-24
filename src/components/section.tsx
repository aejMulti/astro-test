import OptionPickerDemo from "./InputEdit";

export const Section = () => {
  return (
    <>
      <div className="flex">
        <h1>section title </h1>
        <h1>400</h1>
      </div>
      <OptionPickerDemo />
    </>
  );
};
const createNewSection = () => {};
export const newSectionButton = () => {
  return (
    <>
      <button onClick={() => createNewSection}>new section</button>
    </>
  );
};
