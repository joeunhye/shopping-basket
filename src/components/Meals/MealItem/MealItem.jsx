import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "./../../../store/cart-context";

const MealItem = ({ id, name, description, price }) => {
	const cartCtx = useContext(CartContext);
	const pricNum = `$${price.toFixed(2)}`;
	const addToCartHandler = amount => {
		cartCtx.addItem({
			id: id,
			name: name,
			amount: amount,
			price: price,
		});
	};
	return (
		<li className={styles.meal}>
			<div>
				<h3>{name}</h3>
				<div className={styles.description}>{description}</div>
				<div className={styles.price}>{pricNum}</div>
			</div>
			<MealItemForm id={id} onAddToCart={addToCartHandler} />
		</li>
	);
};

export default MealItem;
