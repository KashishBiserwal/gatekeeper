"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserToken = exports.connectToDatabase = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const user_1 = require("./models/user");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const path_1 = __importDefault(require("path"));
let isConnected = false;
const connectToDatabase = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }
    console.log("Establishing new database connection");
    // await mongoose.connect('mongodb+srv://krish:gatekeeper@cluster0.7fby9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await mongoose_1.default.connect('mongodb+srv://ravipoddar0712:ravipoddar@cluster0.8qftl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    isConnected = true;
};
exports.connectToDatabase = connectToDatabase;
(0, exports.connectToDatabase)();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.get("/ping", (req, res) => {
    return res.status(200).send({ message: "pong" });
});
app.get('/', (req, res) => {
    res.send('Hello, world!'); // Just a simple response for testing
});
app.use("/auth", auth_routes_1.default);
// @ts-ignore
app.use("/user", middleware_1.default.AuthMiddleware, user_routes_1.default);
// @ts-ignore
app.use("/admin", middleware_1.default.AuthMiddleware, admin_routes_1.default);
const getUserToken = async (userId) => {
    console.log("Getting user token:", userId);
    const user = await user_1.User.findById(userId).select("registrationToken");
    console.log("User registration token:", user?.registrationToken);
    if (!user)
        return null;
    if (!user.registrationToken)
        return null;
    return user.registrationToken;
};
exports.getUserToken = getUserToken;
// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => console.log("db connected..."))
//   .catch((err) => {
//     console.log(err);
//   });
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
exports.default = app;
