import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'

export type ExtendedRequest = Request & {
    user: any,
    file: any
}

const AuthMiddleware = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization

    if (!token) {
        return res.status(200).send({
            status: 400,
            error: 'Authentication failed',
            error_description: 'token is required',
        })
    }

    const splittedToken = token.split(' ')
    if (splittedToken[0] !== 'Bearer') {
        return res.status(200).send({
            status: 400,
            error: 'Authentication failed',
            error_description: 'Invalid token type',
        })
    }

    let decryptedToken: any
    try {
        decryptedToken = jwt.verify(splittedToken[1], process.env.JWT_SECRET!)
    } catch (err: any) {
        return next(err)
    }

    const employeeId: string = decryptedToken?.employeeId

    if (!employeeId) {
        const err = new Error("Error: token doens't contain phone")
        return next(err)
    }
    const user = await User.findOne({ employeeId })
    if (!user) {
        return res.status(200).send({ status: 400, error: 'user not found.', error_description: 'Account had closed.' })
    }
    delete (user as any)?.password
    req.user = user
    next()
}

const middleware = { AuthMiddleware }

export default middleware
