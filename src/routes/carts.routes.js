import { Router } from "express";
import cartManager from "../managers/cartManager.js";
const router = Router();

// La ruta POST crea un nuevo carrito.
router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();

    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }
});

// La ruta POST agrega un producto a un carrito por su ID.
router.post("/:cid/product/:pid ", async (req, res) => {
  try {
    const {cid, pid} = req.params;
    const cart = await cartManager.addProductToCart(cid, pid)

    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }
});

// La ruta GET obtiene los productos de un carrito por su ID.
router.get("/:cid", async (req, res) => {
  try {
    const {cid} = req.params;
    const cart = await cartManager.getCartById(cid);

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

export default router;