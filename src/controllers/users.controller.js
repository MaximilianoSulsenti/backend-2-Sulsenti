export default class UsersController{
    constructor(userManager){
        this.userManager = userManager;
    }

    getUsers =  async (req, res) => {
        try {
            const users = await this.userManager.getUsers();

            const usersWithoutPassword = users.map(u => {
            const { password, ...rest } = u;
           return rest;
           });

            res.status(200).json({ status: "success", payload: usersWithoutPassword });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    };

    getUsersById = async (req, res) => {
        try {
            const user = await this.userManager.getUserById(req.params.uid);
            if (!user) {
                return res.status(404).json({ status: "error", error: "Usuario no encontrado" });
            }
            res.status(200).json({ status: "success", payload: user });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    };

    updateUser = async (req, res) => {
        try {
            const updatedUser = await this.userManager.updateUser(req.params.uid, req.body);
            if (!updatedUser) {
                return res.status(404).json({ status: "error", error: "Usuario no encontrado" });
            }
            res.status(200).json({ status: "success", payload: updatedUser });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    };

    deleteUser = async (req, res) => {
        try {
            const deletedUser = await this.userManager.deleteUser(req.params.uid);
            if (!deletedUser) {
                return res.status(404).json({ status: "error", error: "Usuario no encontrado" });
            }
            res.status(200).json({ status: "success", message: "Usuario eliminado" });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    }

}