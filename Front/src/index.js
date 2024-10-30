import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from "./App";
import { CartProvider } from '../src/components/cart/CartContext';// Asegúrate de que la ruta sea correcta
import { SubCartProvider } from "./pages/SubCartContext";

ReactDOM.render(
  <CartProvider>
    <SubCartProvider>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </SubCartProvider>
  </CartProvider>,
  document.getElementById("root")
);
