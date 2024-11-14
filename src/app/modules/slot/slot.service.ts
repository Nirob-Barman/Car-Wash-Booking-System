import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Slot } from "./slot.model";
import { ServiceServices } from "../service/service.service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSlotsIntoDB = async (payload: any) => {
  const { service, date, startTime, endTime } = payload;

  // Convert time string (HH:MM) to minutes
  const timeStringToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  // Convert minutes to time string (HH:MM)
  const minutesToTimeString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const minutesPart = (minutes % 60).toString().padStart(2, "0");
    return `${hours}:${minutesPart}`;
  };

  // Convert start and end times to minutes
  const startTimeInMinutes = timeStringToMinutes(startTime);
  const endTimeInMinutes = timeStringToMinutes(endTime);

  // Checking if the end time is not earlier than the start time
  if (startTimeInMinutes > endTimeInMinutes) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `End time (${endTime}) cannot be earlier than start time (${startTime}).`
    );
  }
  
  const timeDifferenceInMinutes = endTimeInMinutes - startTimeInMinutes;

  const overlappingSlots = await Slot.find({
    service,
    date,
    startTime: { $gte: startTime, $lt: endTime },
  });

  if (overlappingSlots.length > 0) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `Time slots already booked for service "${service}" on ${date} from ${startTime} to ${endTime}. Please choose a different time.`
    );
  }

  const serviceData = await ServiceServices.getSingleService(service);

  if (!serviceData || !serviceData.duration) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      `Service with ID: ${service} not found or missing duration. Please ensure the service has a valid duration.`
    );
  }

  const serviceDurationInMinutes = serviceData.duration;

  const totalSlotsCount = timeDifferenceInMinutes / serviceDurationInMinutes;

  const slots = [];
  for (let i = 0; i < totalSlotsCount; i++) {
    const slotStartTime = minutesToTimeString(
      startTimeInMinutes + i * serviceDurationInMinutes
    );
    const slotEndTime = minutesToTimeString(
      startTimeInMinutes + (i + 1) * serviceDurationInMinutes
    );

    const slot = {
      service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: "available",
    };

    slots.push(slot);
  }

  const result = await Slot.create(slots);
  return result;
};
const getAvailableSlots = async (date?: string, serviceId?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = { isBooked: "available" };

  if (date) {
    query.date = new Date(date);
  }

  if (serviceId) {
    query.service = serviceId;
  }

  const result = await Slot.find(query).populate("service");
  return result;
};

export const SlotService = {
  createSlotsIntoDB,
  getAvailableSlots,
};
