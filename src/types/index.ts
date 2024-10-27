export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

export enum ESortBy {
  PriceLowToHigh = "Price low to high",
  PriceHighToLow = "Price high to low",
  Rating = "Rating",
  NameAsc = "Name asc",
  NameDesc = "Name desc",
}
