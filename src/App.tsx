import { useState } from "react";
import { useQuery } from "react-query"

// Components
import Item from "./Item/Item";
import Cart from "./Cart/Cart"

import Typography from '@material-ui/core/Typography'
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";

// Styles
import { Wrapper, StyledButton } from "./App.style"


// Types
export type CartItemType = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  amount: number;
}

// Fetching Data From API
const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', getProducts);

  // Gives the total amount in the cart
  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0)

  // Adding Items to the Cart
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already in the cart
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        ))

      }

      // 2. Item added for the first time
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }]
        } else {
          return [...ack, item]
        }

      }, [] as CartItemType[])
    ))
  }

  if (isLoading) return <LinearProgress color="primary" />;
  if (error) return <div>Soemthing Went Wrong..</div>


  return (
    <div className="App">

      <Wrapper>
        <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)} >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>

        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>

        <Typography align="center" variant="h2">Welcome To FitMart</Typography>
        <Grid container spacing={3} >
          {
            data?.map(
              item => (
                <Grid item key={item.id} xs={12} sm={4}>
                  <Item item={item} handleAddToCart={handleAddToCart} />
                </Grid>
              )
            )
          }

        </Grid>
      </Wrapper>

    </div>
  )

}

export default App;
