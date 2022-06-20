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

type SellingPlan = {
  node: {
    id: string;
  };
};

type SellingGroup = {
  node: {
    sellingPlans: {
      edges: SellingPlan[];
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
  sellingPlanGroups: {
    edges: SellingGroup[];
  };
}

export interface GetAllProduct {
  node: {
    title: string;
    id: string;
    handle: string;
    description: string;
    variants: {
      edges: Variant[];
    };
    images: ImageEdges;
    sellingPlanGroups: {
      edges: SellingGroup[];
    };
  };
}
