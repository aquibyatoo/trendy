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
import { createCart, LineProduct } from "src/services/cart";
import { createCheckoutUrl } from "src/services/checkout";

const ShoppingCart = () => {
  const { isOpen, onOpen, onClose, cartItems } = useCart();
  const [isLoading, onLoading] = React.useState(false);
  const [fetchError, onFetchError] = React.useState(false);

  const getCartContent = () => {
    if (cartItems.length === 0) {
      return <div>You cart is empty, why to not add some items!</div>;
    }

    return cartItems.map((item: Product) => (
      <CartProduct product={item} key={item.id} />
    ));
  };

  const createCartInput = () => {
    const lineProducts = cartItems.map((item) => {
      console.log({ item });

      const variant = item.variants.edges[0].node;
      const sellingPlanList = item.sellingPlanGroups.edges[0]?.node;
      const sellingPlanId = sellingPlanList
        ? sellingPlanList.sellingPlans.edges[0].node.id
        : "";

      const lineProduct: LineProduct = {
        quantity: 1,
        merchandiseId: variant.id,
      };

      if (sellingPlanId) lineProduct["sellingPlanId"] = sellingPlanId;

      return lineProduct;
    });

    // const variant = variants.edges[0].node;
    // const sellingPlanList = sellingPlanGroups.edges[0]?.node;
    // const sellingPlanId = sellingPlanList
    //   ? sellingPlanList.sellingPlans.edges[0].node.id
    //   : "";

    // const lineProduct: LineProduct = {
    //   quantity: 1,
    //   merchandiseId: variant.id,
    // };

    // if (sellingPlanId) lineProduct["sellingPlanId"] = sellingPlanId;

    return {
      lines: lineProducts,
      attributes: {
        key: "cart_attribute",
        value: "This is a cart attribute",
      },
    };
  };

  const handleCheckout = async () => {
    onLoading(true);

    fetchError && onFetchError(false);

    try {
      const cartInput = createCartInput();
      const cartId = await createCart(cartInput);
      const checkoutUrl = await createCheckoutUrl(cartId);

      openTab(checkoutUrl);
    } catch (error) {
      console.log({ error });

      onFetchError(true);
    }

    onLoading(false);
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
            <Button
              w={"100%"}
              onClick={handleCheckout}
              isLoading={isLoading}
              disabled={!cartItems.length}
            >
              {fetchError ? "Try again!" : "Checkout"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCart;
