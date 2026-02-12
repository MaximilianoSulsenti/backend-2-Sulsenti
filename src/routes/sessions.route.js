import { Router } from "express";
import passport from "passport";
import { generateToken} from "../utils/jwt.js";
import CurrentUserDTO from "../dto/currentUser.dto.js";

const router= Router();

router.post("/login", passport.authenticate("login", { session: false }), (req, res) => {
    const user = req.user;
    const token = generateToken(user);

    res.status(200).json({ status: "success", payload: { token } });
});

router.get("/current", passport.authenticate("current", { session: false }), (req, res) => {
    
    res.status(200).json({ status: "success", payload: new CurrentUserDTO(req.user) });
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "fallo al cerrar sesión" });

        }
        res.status(200).json({ status: "success", message: "logout exitoso" });
    });});
    
export default router;