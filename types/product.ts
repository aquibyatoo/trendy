type ProductImage = {
  node: {
    src: string;
  };
};

type ImageEdges = {
  edges: ProductImage[];
};

type Variant = {
  node: {
    price: string;
    id: string;
    priceV2: {
      amount: number;
    };
  };
};

export interface Product {
  title: string;
  id: string;
  handle: string;
  description: string;
  variants: {
    edges: Variant[];
  };
  images: ImageEdges;
}

export interface GetAllProduct {
  node: {
    title: string;
    id: string;
    handle: string;
    description: string;
    variants: Variant[];
    images: ImageEdges;
  };
}
