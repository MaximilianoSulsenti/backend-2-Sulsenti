import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import ProductManager from "../services/ProductManager.js";
import ProductsDAO from "../dao/mongo/products.dao.js";
import ProductsRepository from "../repositories/products.repository.js";

export default function createProductRouter(io) {
    const router = Router();
    
    const productsDAO = new ProductsDAO();
    const productsRepository = new ProductsRepository(productsDAO);
    const productManager = new ProductManager(productsRepository);
    const controller = new ProductsController(productManager, io);

  // GET productos con paginación, filtros y orden
    router.get("/", controller.getProducts);
    
    router.get("/:productId", controller.getProductById);
    router.post("/", controller.createProduct);
    router.put("/:productId", controller.updateProduct);
    router.delete("/:productId", controller.deleteProduct);

    return router;
}
