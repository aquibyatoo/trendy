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
import { generateCheckoutId, getCheckoutId } from "src/utils/checkout";
import { client } from "src/utils/api-client";

const ShoppingCart = () => {
  // @ts-ignore
  const { isOpen, onOpen, onClose } = useCart();
  const [checkout, setCheckout] = React.useState({});

  React.useEffect(() => {
    isOpen && fetchLineItemsHandler();
  }, [isOpen]);

  const fetchLineItemsHandler = async () => {
    if (!getCheckoutId()) {
      await generateCheckoutId();
    } else {
      // @ts-ignore
      const checkout = await client.checkout
        .fetch(getCheckoutId() as string)
        .catch((err) => console.log(err));
      // @ts-ignore
      setCheckout(checkout);
    }
  };

  const getCartContent = () => {
    return <div>You cart is empty, why to not add some items!</div>;
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
            <Button w={"100%"} as={"a"} href={"/"} target="_blank">
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCart;
