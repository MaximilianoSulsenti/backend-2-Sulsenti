export default class AdminUserDTO {
    constructor(user) {
        this.id = user._id;
        this.name = `${user.first_name} ${user.last_name}`;
        this.email = user.email;
        this.role = user.role;
        this.age = user.age;
        this.cart = user.cart;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
