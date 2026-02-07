export default class CartService {
      constructor(cartsRepository) {
        this.cartsRepository = cartsRepository;
      }

    //obtener todos los carritos
     getCarts() {
        return this.cartsRepository.getCarts();
    }

     getCartById(cartId) {
        return this.cartsRepository.getCartById(cartId);
    }

    //crear nuevo carrito
    createCart() {
        return this.cartsRepository.createCart();
    }

    //agregar producto al carrito
    addProductToCart(cartId, productId) {
        return this.cartsRepository.addProductToCart(cartId, productId);
    }

    //actualiza todos los productos del carrito
    updateCartProducts(cartId, products) {
        return this.cartsRepository.updateCartProducts(cartId, products);
    }

    //actualizar la cantidad de un producto en el carrito
    updateProductQuantity(cartId, productId, quantity) {
        return this.cartsRepository.updateProductQuantity(cartId, productId, quantity);
    }

    //eliminar un producto del carrito
    deleteProductFromCart(cartId, productId) {
        return this.cartsRepository.deleteProductFromCart(cartId, productId);
    }
    
      // eliminar todos los productos del carrito
      clearCart(cartId) {
        return this.cartsRepository.clearCart(cartId);
    }
}



