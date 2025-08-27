export type Property = {
  id: string;
  title: string;
  price: number;
  city?: string;
  image?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
};

export type RootStackParamList = {
  Home: undefined;
  PropertyDetail: { property: Property };
  Login: undefined;
  Signup: undefined;
  ResetPassword: undefined;
};

