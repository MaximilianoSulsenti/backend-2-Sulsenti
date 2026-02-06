import { Router } from "express";
import CartsController from "../controllers/carts.controller.js";
import CartsDAO from "../dao/mongo/carts.dao.js";
import CartManager from "../services/CartManager.js";
import CartsRepository from "../repositories/carts.repository.js";

export default function createCartRouter() {
    const router = Router();

    const cartsDAO = new CartsDAO();
    const cartsRepository = new CartsRepository(cartsDAO);
    const cartManager = new CartManager(cartsRepository);
    const Controller = new CartsController(cartManager);

    // Crear carrito
    router.post("/", Controller.createCart);

    // Obtener carrito por ID
    router.get("/:cartId", Controller.getCartById);

    // Agregar producto al carrito
    router.post("/:cartId/product/:productId", Controller.addProductToCart);

    //actualiza todos los productos del carrito
    router.put("/:cartId", Controller.updateCartProducts);

    //actualizar cantidad de un producto en el carrito
    router.put("/:cartId/product/:productId", Controller.updateProductQuantity);

    // elimina del carrito el producto seleccionado 
    router.delete("/:cartId/product/:productId", Controller.deleteProductFromCart);

    //elimina todos los productos del carrito 
    router.delete("/:cartId", Controller.clearCart);

    return router;
}

