import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";

export default function createProductRouter(productManager, io) {
    const router = Router();
    const controller = new ProductsController(productManager, io);

  // GET productos con paginación, filtros y orden
    router.get("/", controller.getProducts);
    
    router.get("/:productId", controller.getProductById);
    router.post("/", controller.createProduct);
    router.put("/:productId", controller.updateProduct);
    router.delete("/:productId", controller.deleteProduct);

    return router;
}
