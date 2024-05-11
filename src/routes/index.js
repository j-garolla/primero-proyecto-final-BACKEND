import { Router } from "express";
import productsRouters from "./products.routes.js";
import cartsRouters from "./carts.routes.js";
const router = Router();

// Se configura el enrutador principal y se usan los enrutadores de productos y carritos.

router.use("/products", productsRouters);
router.use("/carts", cartsRouters);

export default router;