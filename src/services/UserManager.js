
export default class UserManager {
    constructor(usersDAO) {
        this.usersDAO = usersDAO;
    }

    // Obtener todos los usuarios
    async getUsers() {
        return await this.usersDAO.getAll();
    }

    // Obtener usuario por ID
    async getUserById(uid) {
        return await this.usersDAO.getById(uid);
    }

    async createUser(userData) {
        return await this.usersDAO.create(userData);
    }

    async updateUser(uid, updateData) {
        return await this.usersDAO.update(uid, updateData);
    }

    async deleteUser(uid) {
        return await this.usersDAO.delete(uid);
    }
}
