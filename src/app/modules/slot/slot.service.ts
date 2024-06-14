import { Service } from "../service/service.model";
import { Slot } from "./slot.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSlotsIntoDB = async (payload: any) => {
  const { service, date, startTime, endTime } = payload;
  const serviceInfo = await Service.findById(service);

  if (!serviceInfo) {
    throw new Error("Service not found");
  }

  const serviceDuration = serviceInfo.duration;
  const slots = [];
  const startMinutes =
    parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
  const endMinutes =
    parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
  const totalDuration = endMinutes - startMinutes;

  for (let i = 0; i < totalDuration / serviceDuration; i++) {
    const slotStart = startMinutes + i * serviceDuration;
    const slotEnd = slotStart + serviceDuration;
    const slotStartTime = `${Math.floor(slotStart / 60)
      .toString()
      .padStart(2, "0")}:${(slotStart % 60).toString().padStart(2, "0")}`;
    const slotEndTime = `${Math.floor(slotEnd / 60)
      .toString()
      .padStart(2, "0")}:${(slotEnd % 60).toString().padStart(2, "0")}`;

    const slot = {
      service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: "available",
    };

    slots.push(slot);
  }

  const result = await Slot.insertMany(slots);
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
