import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import ProductManager from "../services/ProductManager.js";
import ProductsDAO from "../dao/mongo/products.dao.js";

export default function createProductRouter(io) {
    const router = Router();
    const productsDAO = new ProductsDAO();
    const productManager = new ProductManager(productsDAO);
    const controller = new ProductsController(productManager, io);

  // GET productos con paginación, filtros y orden
    router.get("/", controller.getProducts);
    
    router.get("/:productId", controller.getProductById);
    router.post("/", controller.createProduct);
    router.put("/:productId", controller.updateProduct);
    router.delete("/:productId", controller.deleteProduct);

    return router;
}
