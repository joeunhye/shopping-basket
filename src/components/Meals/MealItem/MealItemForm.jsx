import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = ({ id, onAddToCart }) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();

	const submitHandler = e => {
		e.preventDefault();

		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
			setAmountIsValid(false);
			return;
		}
		onAddToCart(enteredAmountNumber);
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input label="Amount" ref={amountInputRef} input={{ id: "amount_" + id, type: "number", min: "1", max: "5", step: "1", defaultValue: "1" }} />
			{!amountIsValid && <p>Plase enter a valid amount (1-5).</p>}
			<button>+ Add</button>
		</form>
	);
};

export default MealItemForm;
