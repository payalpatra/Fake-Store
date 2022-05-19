import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../App";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    return (<Wrapper>
        <h2> Your Shopping Cart</h2>
        {cartItems.length === 0 ? <p>No items in cart</p> : null}
        {cartItems.map(item => (
            <CartItem
            key = {item.id}
            item = {item}
            addToCart = {addToCart}
            removeFromCart = {removeFromCart}
            />
        ))}
    </Wrapper>
    )
}

export default Cart;