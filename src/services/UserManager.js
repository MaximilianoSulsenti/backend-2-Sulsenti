
export default class UserManager {
    constructor(repository) {
        this.repository = repository;
    }

    // Obtener todos los usuarios
    async getUsers() {
        return await this.repository.getUsers();
    }

    // Obtener usuario por ID
    async getUserById(uid) {
        return await this.repository.getUserById(uid);
    }

    async createUser(userData) {
        return await this.repository.createUser(userData);
    }

    async updateUser(uid, updateData) {
        return await this.repository.updateUser(uid, updateData);
    }

    async deleteUser(uid) {
        return await this.repository.deleteUser(uid);
    }
}
