export default class CurrentUserDTO {
  constructor(user) {
    this.first_name = user.first_name;
    this.email = user.email;
    this.role = user.role;
    // Convertir el ObjectId del carrito a string, o asignar null si no existe
    this.cart = user.cart?.toString?.() || user.cart|| null;
  }
}
