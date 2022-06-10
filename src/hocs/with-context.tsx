import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import * as React from "react";
import { CartProvider } from "src/context/cart-context";

export default (Component: any) =>
  class extends React.Component {
    render() {
      return (
        <CartProvider>
          <Component {...this.props} />
        </CartProvider>
      );
    }
  };
