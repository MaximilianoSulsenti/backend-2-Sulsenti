export default class CartManager {
      constructor(cartsDAO) {
        this.cartsDAO = cartsDAO;
      }

    //obtener todos los carritos
     getCarts() {
        return this.cartsDAO.getCarts();
    }

     getCartById(cartId) {
        return this.cartsDAO.getCartById(cartId);
    }

    //crear nuevo carrito
    createCart() {
        return this.cartsDAO.createCart();
    }

    //agregar producto al carrito
    addProductToCart(cartId, productId) {
        return this.cartsDAO.addProductToCart(cartId, productId);
    }

    //actualiza todos los productos del carrito
    updateCartProducts(cartId, products) {
        return this.cartsDAO.updateCartProducts(cartId, products);
    }

    //actualizar la cantidad de un producto en el carrito
    updateProductQuantity(cartId, productId, quantity) {
        return this.cartsDAO.updateProductQuantity(cartId, productId, quantity);
    }

    //eliminar un producto del carrito
    deleteProductFromCart(cartId, productId) {
        return this.cartsDAO.deleteProductFromCart(cartId, productId);
    }
    
      // eliminar todos los productos del carrito
      clearCart(cartId) {
        return this.cartsDAO.clearCart(cartId);
    }
}



