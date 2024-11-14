import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getSingleService = async (id: string) => {
  const result = await Service.findOne({ _id: id, isDeleted: false });
  return result;
};

const getAllServices = async () => {
  const result = await Service.find({ isDeleted: false });
  return result;
};

const updateService = async (id: string, payload: Partial<TService>) => {
  const isServiceExistsById = await Service.findById(id);
  if (!isServiceExistsById) {
    throw new AppError(StatusCodes.NOT_FOUND, "Service not found");
  }

  if (isServiceExistsById?.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN,
      "Service is already deleted."
    );
  }

  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteService = async (id: string) => {
  const isServiceExistsById = await Service.findById(id);
  if (!isServiceExistsById) {
    throw new AppError(StatusCodes.NOT_FOUND, "Service not found");
  }

  if (isServiceExistsById?.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN,
      "Service is already deleted."
    );
  }
  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
};
