//
// File: Order.js
// Auth: Martin Burolla
// Date: 10/19/2022
// Desc: The one and only place where the customer order is calculated.
//
//       NOTE: This is an academic example and should be treated as such!
//       This logic MUST be stored on the server to prevent the client from
//       altering the cost of the product.
//

import { getPriceForDrink, getPriceForFood } from './App.Config';

/**
 * @param {*} drinks  
 * @param {*} food  
 * @returns An array of objects that the customer has ordered.
 *  [
      { 
        item: 'tea', 
        qty: 1, 
        price: 2, 
        subTotal: 2
      }
    ] 
 */
export const buildOrder = (drinks) => {
	let total = 0;
	let arrayOfDrinks = Object.keys(drinks);

	const arrayOfDrinkObjects = arrayOfDrinks.map((i) => {
		return {
			item: i,
			qty: drinks[i],
		};
	});

	let sumOfDrinkObjects = arrayOfDrinkObjects.map((i) => {
		total += i.qty * getPriceForDrink(i.item);
		return {
			...i,
			price: getPriceForDrink(i.item),
			subTotal: i.qty * getPriceForDrink(i.item),
		};
	});

	const allItems = sumOfDrinkObjects;

	console.log('sum of all Items', allItems);

	const order = allItems.filter((i) => i.qty > 0);

	return {
		order,
		total,
	};
};

export const buildFoodOrder = (food) => {
	let foodTotal = 0;
	let arrayOfFood = Object.keys(food);

	console.log('Array of Food', arrayOfFood);

	const arrayOfFoodObjects = arrayOfFood.map((i) => {
		return {
			item: i,
			qty: food[i],
		};
	});

	const allItems = arrayOfFoodObjects.map((i) => {
		foodTotal += i.qty * getPriceForFood(i.item);
		return {
			...i,
			price: getPriceForFood(i.item),
			subTotal: i.qty * getPriceForFood(i.item),
		};
	});

	const foodOrder = allItems.filter((i) => i.qty > 0);

	return {
		foodOrder,
		foodTotal,
	};
};

/**
 * @param {*} orders
 * @returns The total amount of all the orders.
 */
export const calcTotalForAllOrders = (orders) => {
	return orders ? orders.map((i) => i.total).reduce((a, b) => a + b, 0) : 0;
};

/**
 * @param {} drinks
 * @returns The total number of drinks the customer has ordered.
 */
export const getTotalNumberDrinks = (drinks) => {
	let totalDrinks = 0;
	const arrayOfDrinks = Object.keys(drinks);
	arrayOfDrinks.forEach((i) => {
		totalDrinks += drinks[i];
	});
	return totalDrinks;
};

export const getTotalNumberFood = (food) => {
	let totalFood = 0;
	const arrayOfFood = Object.keys(food);
	arrayOfFood.forEach((i) => {
		totalFood += food[i];
	});
	return totalFood;
};
