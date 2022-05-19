import { useState } from "react";
import { useQuery } from "react-query"

// Components
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";

// Styles
import { Wrapper } from "./App.style"

// Types
export type CartItemType = {
  id: number;
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
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', getProducts);

  console.log(data)

  return <div className="App"> Hye There ! Let's build a Project</div>
}

export default App;
