import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { orderedDrinks, orderedFood } from '../Util/Atoms';
import { showSideDrawer } from '../Util/Atoms';
import { getTotalNumberDrinks, getTotalNumberFood } from '../Util/Order';
import '../Styles/Header.scss';

export const Header = () => {
	const drinks = useRecoilValue(orderedDrinks);
	const food = useRecoilValue(orderedFood);
	const [, setShowSideDrawer] = useRecoilState(showSideDrawer);

	const getQuantity = () => {
		return getTotalNumberDrinks(drinks) + getTotalNumberFood(food);
	};

	const getClassName = () => {
		return getQuantity() < 10 ? 'Header_Qty_Small' : 'Header_Qty_Large';
	};

	return (
		<div className='Header'>
			<div className='Header_Hamburger'>
				<img
					onClick={() => setShowSideDrawer(true)}
					height='40px'
					width='40px'
					src='hamburger.png'
					alt='menu'
				></img>
			</div>
			<div className='Header_Logo_Area'>
				<div className='Header_Logo Product_Font'>The Coffee Place</div>
				<div className='Header_Cart' onClick={() => setShowSideDrawer(true)}>
					<img width='40px' src='shopping-cart.png' alt='shopping cart' />
					<div className={getClassName()}>{getQuantity()}</div>
				</div>
			</div>
		</div>
	);
};
