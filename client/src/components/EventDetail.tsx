import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { EventProp } from "./Events";

export const EventDetail = () => {
  const { id } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { data: eventDetail, isLoading, error } = useQuery<EventProp>({
    queryKey: ["eventDetail", id],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/event/${id}`, {
        withCredentials: true,
      });
      return res.data.data; // expected to be a single object
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !eventDetail) return <div>Error loading event</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">{eventDetail.title}</h2>
      <img
        src={eventDetail.image}
        alt="event"
        className="w-full max-w-lg mt-4 rounded-xl"
      />
      <p className="text-muted-foreground mt-2">
        Deadline: {new Date(eventDetail.deadline).toLocaleString()}
      </p>
      <p className="mt-4">{eventDetail.description}</p>
      <span className="inline-block mt-4 px-3 py-1 bg-secondary/20 text-sm rounded-full">
        {eventDetail.category}
      </span>
    </div>
  );
};
