import React from "react";
import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ onshowCart }) => {
	return (
		<>
			<header className={styles.header}>
				<div className={styles.headerIn}>
					<h1>ReactMeals</h1>
					<HeaderCartButton onClick={onshowCart} />
				</div>
			</header>
			<div className={styles["main-image"]}>
				<img src={mealsImage} alt="" />
			</div>
		</>
	);
};

export default Header;
