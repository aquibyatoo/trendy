type Image = {
  src: string
}

type Variant = {
  price: string,
  id: string
}

export interface Product {
  title: string,
  id: string,
  handle: string,
  description: string,
  variants: [Variant]
  images: [Image]
}