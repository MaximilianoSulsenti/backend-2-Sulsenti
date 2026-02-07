import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import mongoSingleton from "./config/database/mongoConnection.js";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import { initializePassport } from "./config/passport.js";
import { env } from "./config/environment.js";


// Services
import ProductService from "./services/product.service.js";
import CartService from "./services/cart.service.js";
import UserService from "./services/user.service.js";

// Routers
import createProductRouter from "./routes/product.route.js";
import createCartRouter from "./routes/cart.route.js";
import createViewsRouter from "./routes/view.route.js";
import createUserRouter from "./routes/user.route.js";
import sessionRouter from "./routes/sessions.route.js";
import passwordResetRouter from "./routes/passwordReset.route.js";

// Definiciones de __dirname y __filename en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Handlebars helpers 
const hbs = exphbs.create({
    helpers: {
        multiply: (a, b) => a * b,
        calculateTotal: (items) =>{
         return items.reduce((sum, item) => sum + (item.product.precio * item.quantity), 0);
        }
    }
});

// Configuración Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(cors());

const productService = new ProductService();
const cartService = new CartService();
const userService = new UserService();

// conexion del servidor
const PORT = env.PORT;
const httpServer = app.listen(PORT, () =>{
  console.log(`Servidor escuchando en puerto ${PORT}`)
  mongoSingleton.getInstance();
});

const io = new Server(httpServer);

// rutas con los managers correspondientes
app.use("/api/products", createProductRouter(productService, io));
app.use("/api/carts", createCartRouter(cartService, productService));
app.use("/api/users", createUserRouter(userService));
app.use("/", createViewsRouter(productService, cartService));
app.use("/api/sessions", sessionRouter);
app.use("/api/password", passwordResetRouter);

 // Socket.io para productos en tiempo real
 io.on("connection", async socket => {
  console.log("Cliente conectado:", socket.id);

  // Enviar lista inicial desde Mongo
  socket.emit("productos_actualizados", await productService.getProducts());

  socket.on("nuevo_producto", async data => {
    await productService.createProduct(data);
    io.emit("productos_actualizados", await productService.getProducts());
  });

  socket.on("eliminar_producto", async id => {
    await productService.deleteProduct(id);
    io.emit("productos_actualizados", await productService.getProducts());
  });
});
