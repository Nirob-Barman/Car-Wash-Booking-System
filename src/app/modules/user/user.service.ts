import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../../config";

const userSignUp = async (payload: TUser) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = hashedPassword;
    const user = await User.create(payload);

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const token = jwt.sign(
        {
            _id: user._id,
            name: `${user.name.firstName} ${user.name.lastName}`,
            email: user.email,
            phone: user.phone,
            role: user.role,
            address: user.address,
        },
        config.jwt_access_secret as string,
        { expiresIn: config.jwt_access_expires_in as string }
    );

    return {
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
    };
};

export const UserServices = {
    userSignUp,
    loginUser,
};
