import { atom, map } from 'nanostores';
const mySections = [
    { id: "1", title: "Dogs", value: 90, color: "orange" },
    { id: "2", title: "Cats", value: 50, color: "green" },
    { id: "3", title: "Dragons", value: 0, color: "purple" },
  ];

  const myItems = [
    {
      id: "1",
      label: "item 1",
      amount: "5",
      mod: 1,
      comment: "hi",
      sectionid: "1",
    },
    {
      id: "2",
      label: "item 2",
      amount: "5",
      mod: 1,
      comment: "hi",
      sectionid: "2",
    },
    {
      id: "3",
      label: "item 3",
      amount: "5",
      mod: 1,
      comment: "hi",
      sectionid: "2",
    },
    {
      id: "4",
      label: "item 4",
      amount: "5",
      mod: 1,
      comment: "hi",
      sectionid: "3",
    },
    {
      id: "5",
      label: "item 4",
      amount: "5",
      mod: 1,
      comment: "hi",
      sectionid: "3",
    },
  ];
export const isCartOpen = atom(false);

export type CartItem = {
	id: string;
	name: string;
	imageSrc: string;
	quantity: number;
};

export type CartItemDisplayInfo = Pick<CartItem, 'id' | 'name' | 'imageSrc'>;

export const cartItems = map<Record<string, CartItem>>({});

export const allItems = atom(myItems)

export const setAllItems = (item) => {
	console.log(item)
	allItems.set([...allItems.get(), item]);
};

export const allSections = atom(mySections)
export const updateSections = (sections) => {
	allSections.set(sections);
};
export const setAllSections = (section) => {
	allSections.set([...allSections.get(), section]);
};


// export const format = (sum) => {
//     if (sum < 0) {
//       return `+${Math.abs(sum)}`;
//     }
//     return sum;
//   };

// export const sum = options.reduce((sum, { amount }) => {
	
// 	return format(sum + amount);
//   }, 0);
