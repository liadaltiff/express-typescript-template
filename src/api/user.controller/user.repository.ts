import pkg from 'mongoose';
import User from '../../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { referrerPolicy } from 'helmet';

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find(
            {},
            { _id: true, name: true, phoneNumber: true, role: true }
        ).lean();

        return await res.status(200).json({
            status: 200,
            error: null,
            message: 'get all users',
            users,
        });
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const getOneUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;
        const userById = await User.findById(userId).lean();

        const reply = {
            userById,
            error: null,
            status: userById ? 200 : 404,
            user: userById
                ? `found user with id: ${userId}`
                : `user with id: ${userId} is not found`,
        };

        return await res.status(reply.status).json(reply);
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const LoggedUser = await User.findOne(
            {
                email: email,
                password: password,
            },
            { _id: true, name: true, phoneNumber: true, role: true }
        ).lean();

        const reply = {
            LoggedUser,
            error: null,
            status: LoggedUser ? 200 : 404,
            user: LoggedUser,
            token: LoggedUser ? 'test123' : '',
        };

        return await res.status(reply.status).json(reply);
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const createOneUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user } = req.body;
        const { soldierId, name, email, phoneNumber, password, role } = user;
        if (!(soldierId && name && email && phoneNumber && password && role)) {
            throw new Error('Required data for user is missing');
        }
        const userWithSameSoliderId = await User.find({
            _id: soldierId,
        });
        if (userWithSameSoliderId.length > 0) {
            return await res.status(208).json({
                status: 208,
                error: null,
                message: 'User already created',
            });
        }

        const newUser = new User({
            _id: soldierId,
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            role: role,
        });

        const savedUser = await newUser.save();

        return await res.status(200).json({
            status: 200,
            error: null,
            message: 'one user created',
            savedUser,
        });
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};
