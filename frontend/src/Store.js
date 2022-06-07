import React, { useReducer } from 'react';

export const Store = React.createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const alreadyInCart = state.cart.cartItems.find((item) => {
        return item._id === newItem._id;
      });
      const cartItems = alreadyInCart
        ? state.cart.cartItems.map((item) => {
            return item._id === newItem._id ? newItem : item;
          })
        : [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, cartItems } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log('store',state.cart.cartItems);

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
