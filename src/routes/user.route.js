import { Router } from "express";
import passport from "passport";
import { authorizeRole } from "../middlewares/auth.js";
import UsersController from "../controllers/users.controller.js";
import UsersDAO from "../dao/mongo/users.dao.js";
import UserManager from "../services/UserManager.js";

export default function createUserRouter() {
    const router = Router();

    const usersDAO = new UsersDAO();
    const usersManager = new UserManager(usersDAO);
    const controller = new UsersController(usersManager);

    // GET para obtener todos los usuarios (protegido, solo admin)
    router.get("/", passport.authenticate("current", { session: false }), 
       authorizeRole("admin"),
        controller.getUsers
    );

    router.get("/:uid", controller.getUsersById);

    // PUT para actualizar un usuario
    router.put("/:uid", controller.updateUser);

    // DELETE para eliminar un usuario
    router.delete("/:uid", controller.deleteUser);

    // POST para crear un nuevo usuario con Passport 
    router.post("/register", (req, res, next) => {
       passport.authenticate("register", { session: false }, (err, user, info) => {
         if (err)
           return res.status(500).json({ status: "error", error: err.message });
     
         if (!user)
           return res.status(400).json({ status: "error", error: info.message || "Error en el registro" });
     
         res.status(201).json({status: "success",message: "Usuario registrado correctamente", });
       })(req, res, next);
     });

    return router;
}
