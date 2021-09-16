import { PrismaClient } from "@prisma/client";
const dbClient = new PrismaClient();

const itemTypes = [
  {
    name: "fashion",
    creditModifier: 0,
  },
  {
    name: "home",
    creditModifier: 0,
  },
  {
    name: "mens",
    creditModifier: 0,
  },
  {
    name: "womens",
    creditModifier: 0,
  },
  {
    name: "shoes",
    creditModifier: 3,
  },
  {
    name: "tops",
    creditModifier: 2,
  },
  {
    name: "bottoms",
    creditModifier: 3,
  },
  {
    name: "dresses",
    creditModifier: 4,
  },
  {
    name: "coats",
    creditModifier: 5,
  },
  {
    name: "jackets",
    creditModifier: 5,
  },
  {
    name: "boots",
    creditModifier: 4,
  },
  {
    name: "sandals",
    creditModifier: 2,
  },
  {
    name: "trainers",
    creditModifier: 3,
  },
  {
    name: "shirts",
    creditModifier: 4,
  },
  {
    name: "t-shirts",
    creditModifier: 1,
  },
  {
    name: "leggings",
    creditModifier: 2,
  },
  {
    name: "jeans",
    creditModifier: 4,
  },
  {
    name: "bedroom",
    creditModifier: 0,
  },
  {
    name: "kitchen",
    creditModifier: 0,
  },
  {
    name: "living-room",
    creditModifier: 0,
  },
];

const brands = [
  {
    name: "Adidas",
    creditModifier: 5,
  },
  {
    name: "Levi's",
    creditModifier: 5,
  },
  {
    name: "North Face",
    creditModifier: 7,
  },
  {
    name: "Clarks",
    creditModifier: 6,
  },
  {
    name: "Nike",
    creditModifier: 7,
  },
  {
    name: "Converse",
    creditModifier: 6,
  },
  {
    name: "Next",
    creditModifier: 4,
  },
  {
    name: "Primark",
    creditModifier: 1,
  },
  {
    name: "Rayban",
    creditModifier: 10,
  },
  {
    name: "H&M",
    creditModifier: 3,
  },
  {
    name: "Matalan",
    creditModifier: 2,
  },
  {
    name: "PUMA",
    creditModifier: 4,
  },
  {
    name: "Tu Clothing",
    creditModifier: 3,
  },
  {
    name: "George",
    creditModifier: 3,
  },
  {
    name: "Timberland",
    creditModifier: 6,
  },
  {
    name: "Selfridges",
    creditModifier: 10,
  },
  {
    name: "River Island",
    creditModifier: 5,
  },
  {
    name: "Reebok",
    creditModifier: 5,
  },
];

// const getRandomElement = (array) => {
//   const number = Math.floor(Math.random() * array.length);
//   return array[number];
// };

const seed = async () => {
  const arrayBrandsPromises = brands.map(async (brand) => {
    return await dbClient.brand.create({
      data: brand,
    });
  });

  const createdBrands = await Promise.all(arrayBrandsPromises);
  const itemBrandIds = createdBrands.map(({ id }) => id);

  const arrayItemTypesPromises = itemTypes.map(async (itemType) => {
    return await dbClient.itemType.create({
      data: itemType,
    });
  });

  const createdItemTypes = await Promise.all(arrayItemTypesPromises);
  const itemTypeIds = createdItemTypes.map(({ id }) => id);
};

seed()
  .catch((e) => console.error(e))
  .finally(async () => await dbClient.$disconnect());
