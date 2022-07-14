import React, { useReducer } from "react";

export const Store = React.createContext();

const initialState = {
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : ""
  },
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const alreadyInCart = state.cart.cartItems.find((item) => {
        return item.id === newItem.id;
      });
      const cartItems = alreadyInCart
        ? state.cart.cartItems.map((item) => {
            return item.id === newItem.id ? newItem : item;
          })
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "USER_LOGIN":
    case "USER_REGISTER": {
      return { ...state, userInfo: action.payload };
    }
    case "USER_LOGOUT": {
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
          orderSummary: {},
          orderTotalPrice: {}
        },
        userInfo: null
      };
    }
    case "SAVE_SHIPPING_ADDRESS": {
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload }
      };
    }
    case "SAVE_SHIPPING_METHOD": {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload }
      };
    }
    case "ORDER_SUMMARY": {
      return {
        ...state,
        cart: { ...state.cart, orderSummary: { ...action.payload } }
      };
    }
    case "ORDER_COST": {
      return {
        ...state,
        cart: { ...state.cart, orderCost: { ...action.payload } }
      };
    }
    case "CART_CLEAR": {
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
          orderSummary: {},
          orderTotalPrice: {}
        }
      };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
