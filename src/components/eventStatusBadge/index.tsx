import { EventStatus } from "@/types";

export const EventStatusBadge: React.FC<{ eventStatus: EventStatus }> = ({
  eventStatus,
}) => {
  // set the color of the badge based on the event status
  let color, bgColor;
  switch (eventStatus) {
    case EventStatus.Transit:
      bgColor = "bg-yellow-500";
      color = "text-yellow-500";
      break;
    case EventStatus.Delivered:
      bgColor = "bg-green-500";
      color = "text-green-500";
      break;
    case EventStatus.Instock:
      bgColor = "bg-green-600";
      color = "text-green-600";
      break;
    default:
      break;
  }
  return (
    <div
      className={`w-fit flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-opacity-5 ${bgColor}`}
    >
      <div className={`rounded-full w-2 h-2 ${bgColor}`}></div>
      <div className={`font-bold ${color}`}>{eventStatus}</div>
    </div>
  );
};
