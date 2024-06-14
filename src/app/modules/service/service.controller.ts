import { StatusCodes } from 'http-status-codes';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";
import { ServiceServices } from './service.service';
import mongoose from 'mongoose';

const createService = catchAsync(async (req, res, next) => {
    const result = await ServiceServices.createServiceIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Service created successfully",
        data: result
    });
});

const getService = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    if (id.startsWith(":")){
        id = id.substring(1);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ObjectId");
    }

    const result = await ServiceServices.getSingleService(id);

    if (!result) {
        return next(new AppError(StatusCodes.NOT_FOUND, "Service not found"));
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result
    });
});

const getAllServices = catchAsync(async (req, res, next) => {
    const result = await ServiceServices.getAllServices();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result
    });
});

const updateService = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    if (id.startsWith(":")) {
        id = id.substring(1);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ObjectId");
    }

    const result = await ServiceServices.updateService(id, req.body);

    if (!result || result.isDeleted) {
        return next(new AppError(StatusCodes.NOT_FOUND, "Service not found"));
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Service updated successfully",
        data: result
    });
});

const deleteService = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    if (id.startsWith(":")) {
        id = id.substring(1);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ObjectId");
    }

    const result = await ServiceServices.deleteService(id);

    if (!result) {
        return next(new AppError(StatusCodes.NOT_FOUND, "Service not found"));
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Service deleted successfully",
        data: result
    });
});



export const ServiceControllers = {
    createService,
    getService,
    getAllServices,
    updateService,
    deleteService
};
