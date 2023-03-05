import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
		const existingCartItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

		let updatedItems;

		if (existingCartItem) {
			// 기존 항목에 아이템이 있을 경우
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			// 기존 항목에 아이템이 없을 경우
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "REMOVE") {
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
		const existingCartItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingCartItem.price;
		let updatedItems;

		if (existingCartItem.amount === 1) {
			updatedItems = state.items.filter(item => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = ({ children }) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = item => {
		console.log(item);
		dispatchCartAction({ type: "ADD", item: item });
	};
	const removeItemToCartHandler = id => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemToCartHandler,
	};
	return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
