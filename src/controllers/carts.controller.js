export default class CartsController {
    constructor(cartManager) {
        this.cartManager = cartManager;
    }

  createCart = async (req, res) => {
        try {
            const cart = await this.cartManager.createCart();
            res.status(201).json({ message: "Carrito creado", payload: cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getCartById =  async (req, res) => {
        try {
            const cart = await this.cartManager.getCartById(req.params.cartId);

            if (!cart)
                return res.status(404).json({ msg: "Carrito no encontrado" });

            res.status(200).json({ payload: cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    addProductToCart = async (req, res) => {
        try {
            const cart = await this.cartManager.addProductToCart(req.params.cartId, req.params.productId);

            if (!cart)
                return res.status(404).json({ msg: "Carrito o producto no encontrado" });

            res.status(200).json({message: "Producto agregado al carrito", payload: cart});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    updateCartProducts = async (req, res) => {
        try{
            const cart = await this.cartManager.updateCartProducts(req.params.cartId, req.body.products);
            if(!cart)
                return res.status(404).json({msg: "Carrito no encontrado"});

            res.status(200).json({message: "Carrito actualizado", payload: cart});
        } catch (error){
            res.status(500).json({error: error.message});
        }
    };

    updateProductQuantity = async (req, res) => {
        try{
             const cart = await this.cartManager.updateProductQuantity(req.params.cartId, req.params.productId, req.body.quantity); 

            if(!cart)
                return res.status(404).json({msg: "Carrito no encontrado"});

            res.status(200).json({message: "Cantidad de producto actualizada", payload: cart});  

        } catch (error){
            res.status(500).json({error: error.message});
        }
    };

    deleteProductFromCart = async (req, res) => {
        try {
            const cart = await this.cartManager.deleteProductFromCart(req.params.cartId, req.params.productId);
            if (!cart)
                return res.status(404).json({msg: "carrito no encontrado"});

            res.status(200).json ({message: "Producto eliminado del carrito", payload: cart});

        } catch (error){
            res.status(500).json({error: error.message});
        }
    };

    clearCart = async (req, res) => {
        try {
            const cart = await this.cartManager.clearCart(req.params.cartId);
            if (!cart)
                return res.status(404).json({msg: "carrito no encontrado"});

            res.status(200).json ({message: "Carrito vaciado", payload: cart});
        } catch (error){
            res.status(500).json({error: error.message});
        }
    };

}