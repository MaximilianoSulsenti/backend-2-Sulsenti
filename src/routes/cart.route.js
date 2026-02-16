import { Router } from "express";
import CartsController from "../controllers/carts.controller.js";
import CartsDAO from "../dao/mongo/carts.dao.js";
import ProductsDAO from "../dao/mongo/products.dao.js";
import TicketDAO from "../dao/mongo/ticket.dao.js";
import CartService from "../services/cart.service.js";
import CartsRepository from "../repositories/carts.repository.js";
import ProductsRepository from "../repositories/products.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";
import { authorize } from "../middlewares/auth.js";
import passport from "passport";


export default function createCartRouter() {
    const router = Router();

      // DAO
    const cartsDAO = new CartsDAO();
    const productsDAO = new ProductsDAO();
    const ticketDAO = new TicketDAO();

    // Repositories
    const cartsRepository = new CartsRepository(cartsDAO);
    const productsRepository = new ProductsRepository(productsDAO);
    const ticketRepository = new TicketRepository(ticketDAO);
   
    // Services
    const cartService = new CartService(cartsRepository, productsRepository, ticketRepository);
    
    // Controller
    const Controller = new CartsController(cartService);


    // Crear carrito
    router.post("/", passport.authenticate("current", { session: false }), authorize("user"), Controller.createCart);

    // Obtener carrito por ID
    router.get("/:cartId", passport.authenticate("current", { session: false }), authorize("admin"), Controller.getCartById);

    // Agregar producto al carrito
    router.post("/:cartId/product/:productId", passport.authenticate("current", { session: false }), authorize("user"), Controller.addProductToCart);

    //actualiza todos los productos del carrito
    router.put("/:cartId", passport.authenticate("current", { session: false }), authorize("admin"), Controller.updateCartProducts);

    //actualizar cantidad de un producto en el carrito
    router.put("/:cartId/product/:productId", passport.authenticate("current", { session: false }), authorize("admin"),  Controller.updateProductQuantity);

    // elimina del carrito el producto seleccionado 
    router.delete("/:cartId/product/:productId", passport.authenticate("current", { session: false }), authorize("user"), Controller.deleteProductFromCart);

    //elimina todos los productos del carrito 
    router.delete("/:cartId", passport.authenticate("current", { session: false }), authorize("admin"), Controller.clearCart);

    // ruta para finalizar compra y generar ticket 
    router.post("/:cartId/purchase", passport.authenticate("current", { session: false }), authorize("user"), Controller.purchaseCart);

    return router;
}

