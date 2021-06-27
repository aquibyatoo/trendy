export interface Product {
  title: string,
  id: string,
  handle: string,
  description: string,
  variants: [{
    price: string
  }]
  images: [{
    src: string
  }]
}