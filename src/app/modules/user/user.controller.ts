import { Request, Response, NextFunction } from "express";
import { UserServices } from "./user.service";
import { userValidationSchema } from "./user.validation";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { TUser } from "./user.interface";

const userSignUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = userValidationSchema.parse(req.body);
    const user = await UserServices.userSignUp(validatedData);

    res.status(StatusCodes.OK).json({
        success: true,
        statusCode: StatusCodes.OK,
        message: "User registered successfully",
        data: user,
    });
});

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError(StatusCodes.BAD_REQUEST, "Email and password are required"));
    }

    const user = await UserServices.loginUser(email, password);

    res.status(StatusCodes.OK).json({
        success: true,
        statusCode: StatusCodes.OK,
        message: "User logged in successfully",
        token: user.token,
        data: user.user,
    });
});

export const UserControllers = {
    userSignUp,
    loginUser,
};
