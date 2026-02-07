import { Router } from "express";
import CartsController from "../controllers/carts.controller.js";
import CartsDAO from "../dao/mongo/carts.dao.js";
import CartService from "../services/cart.service.js";
import CartsRepository from "../repositories/carts.repository.js";
import { authorize } from "../middlewares/auth.js";

export default function createCartRouter() {
    const router = Router();

    const cartsDAO = new CartsDAO();
    const cartsRepository = new CartsRepository(cartsDAO);
    const cartService = new CartService(cartsRepository);
    const Controller = new CartsController(cartService);

    // Crear carrito
    router.post("/", authorize("admin"), Controller.createCart);

    // Obtener carrito por ID
    router.get("/:cartId", authorize("admin"), Controller.getCartById);

    // Agregar producto al carrito
    router.post("/:cartId/product/:productId", authorize("user"), Controller.addProductToCart);

    //actualiza todos los productos del carrito
    router.put("/:cartId", authorize("admin"), Controller.updateCartProducts);

    //actualizar cantidad de un producto en el carrito
    router.put("/:cartId/product/:productId", authorize("admin"),  Controller.updateProductQuantity);

    // elimina del carrito el producto seleccionado 
    router.delete("/:cartId/product/:productId", authorize("user"), Controller.deleteProductFromCart);

    //elimina todos los productos del carrito 
    router.delete("/:cartId", authorize("admin"), Controller.clearCart);

    return router;
}

