//import productModel from "../models/product.model.js";

export default class ProductManager {
    constructor(productsDAO) {
        this.productsDAO = productsDAO;
    }
    
  getProducts() {
    return this.productsDAO.getAll();
  }

  getProductsPaginated({ limit = 10, page = 1, sort, query }) {
        const filter = {};

        // FILTRO GENERAL
        if (query) {
            if (query === "disponible") filter.disponible = true;
            else filter.categoria = query;
        }

        let sortOption = {};
        if (sort === "asc") sortOption = { price: 1 };
        if (sort === "desc") sortOption = { price: -1 };

       return this.productsDAO.getPaginated({ limit, page, sort: sortOption, filter });

      }

  getProductById(id) {
    return this.productsDAO.getById(id);
  }

  createProduct(data) {
    return this.productsDAO.create(data);
  }

  updateProduct(id, updatedData) {
    return this.productsDAO.update(id, updatedData);
  }

  deleteProduct(id) {
   return this.productsDAO.delete(id);
  }

}
