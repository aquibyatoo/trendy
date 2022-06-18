import { useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { Product } from "types/product";

type CartContext = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  addToCart: (item: any) => void;
  cartItems: any[];
};

const CartContext = React.createContext<CartContext>({} as CartContext);

CartContext.displayName = "CartContext";
const CartProvider = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartItems, setCartItems] = React.useState<Product[]>([]);

  React.useEffect(() => {
    if (!cartItems.length && localStorage.getItem("cartItems")) {
      setCartItems(JSON.parse(localStorage.getItem("cartItems") as string));
    }
  }, []);

  const saveCartItems = (updatedCartItems: Product[]) =>
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

  const addToCart = (item: Product) => {
    const updatedCartItems = [...cartItems, item];

    setCartItems(updatedCartItems);
    saveCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider
      value={{ isOpen, onOpen, onClose, addToCart, cartItems }}
      {...props}
    />
  );
};

function useCart() {
  return React.useContext(CartContext);
}

export { CartProvider, useCart };
