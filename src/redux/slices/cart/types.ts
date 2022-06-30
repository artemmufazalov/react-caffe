// Types
import { PizzaInterface } from '../generalTypes';

export interface CartPizzaInterface extends PizzaInterface {
	cartId: string;
	quantity: number;
	doughIndex: number;
	doughType: string;
	sizeIndex: number;
}

export interface CartStateInterface {
	doughTypes: string[];
	pizzas: CartPizzaInterface[];
}
