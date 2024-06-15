import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotService } from "./slot.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createSlots = catchAsync(async (req, res, next) => {
  const result = await SlotService.createSlotsIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAvailableSlots = catchAsync(async (req, res, next) => {
  const { date, serviceId } = req.query;
  const result = await SlotService.getAvailableSlots(
    date as string,
    serviceId as string,
  );

  if (result.length > 0) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Available slots retrieved successfully",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }
});

export const SlotController = {
  createSlots,
  getAvailableSlots,
};
