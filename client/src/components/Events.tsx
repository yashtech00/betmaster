<<<<<<< HEAD
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
      <div className="mt-28 w-[90%] md:w-[70%] mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center text-gradient mb-4">All Events</h2>
        <div className="absolute -z-10 top-1/3 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
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
=======
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react"
import { EventComp } from "./EventComp";

export interface EventProp{
    title: string,
    description: string,
    category: string,
    deadline:Date
}



export const Events = () => {


    const BACKEND_URL = import.meta.env.BACKEND_URL;
    const { data: Events } = useQuery<EventProp[]>({
        queryKey: ["event"],
        queryFn: async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/event`,{withCredentials:true});
                return res.data
            } catch (e:any) {
                console.error(e.message);
            }
        },
   })


    return (
        <div>
            <div>
                <p>All Events</p>
                <div>
                    {Events?.map((event) => (
                        <div>
                            <EventComp event={ event} />
                    </div>
                ))}
                </div>
                </div>
>>>>>>> 64e39949327f6d72f8df10dd6b7552febe0b461c
        </div>
      </div>
    </>
  );
};
