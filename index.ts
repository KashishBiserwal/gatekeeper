import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import http from 'http';
import authRouter from "./routes/auth.routes"
import middleware from "./utils/middleware"
import { User } from "./models/user";
import userRouter from "./routes/user.routes";
// import adminRouter from "./routes/admin.routes";
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/ping', (req, res) => {
    return res.status(200).send({message: 'pong'})
})

app.get('/', (req, res) => res.send('Server running...'))

app.use('/auth', authRouter)
//@ts-ignore
app.use('/user', middleware.AuthMiddleware, userRouter)
//@ts-ignore
// app.use('/admin', adminRouter)

export const getUserToken = async (userId: any) => {
    console.log('Getting user token:', userId);
    const user = await User.findById(userId).select('registrationToken');
    console.log('User registration token:', user.registrationToken);
    if(!user) return null
    if(!user.registrationToken) return null
    
    return user.registrationToken 
}

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('db connected...'))
    .catch((err) => {
        console.log(err);
    })


app.listen(3000, () => {
    console.log('Server running on port 3000');
});




