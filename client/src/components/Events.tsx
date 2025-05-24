import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EventComp } from "./EventComp";
import EventNavbar from "./EventNavbar";
import { motion } from "framer-motion";

export interface EventProp {
  title: string;
  description: string;
  category: string;
  deadline: Date;
    image: string;
    _id:string
}

export const Events = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { data: Events } = useQuery<EventProp[]>({
    queryKey: ["event"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/event`, { withCredentials: true });
      return res.data.data;
    },
  });

  return (
    <>
      <EventNavbar />
      <div className="mt-28  md:w-[90%] mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center text-gradient mb-4">All Events</h2>
       
        <div className="flex gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {Events?.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <EventComp event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
