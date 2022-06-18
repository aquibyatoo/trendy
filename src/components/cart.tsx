import * as React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { MdShoppingBasket } from "react-icons/md";
import { useCart } from "src/context/cart-context";
import { Product } from "types/product";
import CartProduct from "./cart-product";
import { openTab } from "src/utils/open-new-tab";
import { fetchProduct } from "src/services/product";

const ShoppingCart = () => {
  const { isOpen, onOpen, onClose, cartItems } = useCart();
  const [isLoading, onLoading] = React.useState(false);

  const getCartContent = () => {
    if (cartItems.length === 0) {
      return <div>You cart is empty, why to not add some items!</div>;
    }

    return cartItems.map((item: Product) => (
      <CartProduct product={item} key={item.id} />
    ));
  };

  const handleCheckout = async () => {
    onLoading(true);

    // try {
    //   const product = await fetchProduct(handle);
    //   const cartInput = createCartInput(product);
    //   const cartId = await createCart(cartInput);
    //   const checkoutUrl = await createCheckoutUrl(cartId);

    //   openTab(checkoutUrl);
    // } catch (error) {
    //   onFetchError(true);
    // }
  };

  return (
    <>
      <Icon
        fill="white"
        as={MdShoppingBasket}
        cursor="pointer"
        w={30}
        h={30}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your shopping cart</DrawerHeader>

          <DrawerBody>{getCartContent()}</DrawerBody>

          <DrawerFooter>
            <Button w={"100%"} onClick={handleCheckout} isLoading={isLoading}>
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCart;
