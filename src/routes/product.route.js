import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import ProductService from "../services/product.service.js";
import ProductsDAO from "../dao/mongo/products.dao.js";
import ProductsRepository from "../repositories/products.repository.js";
import { authorize } from "../middlewares/auth.js";

export default function createProductRouter(io) {
    const router = Router();
    
    const productsDAO = new ProductsDAO();
    const productsRepository = new ProductsRepository(productsDAO);
    const productService = new ProductService(productsRepository);
    const controller = new ProductsController(productService, io);

  // GET productos con paginación, filtros y orden
    router.get("/", authorize("admin"), controller.getProducts);
    
    router.get("/:productId", controller.getProductById);
    router.post("/", authorize("admin"), controller.createProduct);
    router.put("/:productId", authorize("admin"), controller.updateProduct);
    router.delete("/:productId", authorize("admin"), controller.deleteProduct);

    return router;
}
