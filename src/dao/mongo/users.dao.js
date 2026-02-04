import userModel from "../../models/user.model.js";

export default class UsersDAO {

    getAll = async () => {
        return userModel.find().lean();
    };

    getById = async (uid) => {
        return userModel.findById(uid).lean();
    };

    create = async (userData) => {
        return userModel.create(userData);
    };

    update = async (uid, updateData) => {
        return userModel.findByIdAndUpdate(uid, updateData, { new: true }).lean();
    };

    delete = async (uid) => {
        return userModel.findByIdAndDelete(uid);
    };
}
