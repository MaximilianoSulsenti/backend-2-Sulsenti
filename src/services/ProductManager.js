import productModel from "../models/product.model.js";

export default class ProductManager {
    
  getProducts() {
    return productModel.find().lean();
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

        return productModel.paginate(filter, {limit, page, sort: sortOption, lean: true});

      }

  getProductById(id) {
    return productModel.findById(id).lean();
  }

  createProduct(data) {
    const newProduct = new productModel(data);
    return newProduct.save();
  }

  updateProduct(id, updatedData) {
    productModel.findByIdAndUpdate(id, updatedData, { new: true }).lean();
  }

  deleteProduct(id) {
   return productModel.findByIdAndDelete(id);
  }

}
