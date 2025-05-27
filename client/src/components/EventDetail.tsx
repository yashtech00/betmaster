import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { EventProp } from "./Events";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "framer-motion";

export const EventDetail = () => {
  const { id } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { data: eventDetail, isLoading, error } = useQuery<EventProp>({
    queryKey: ["eventDetail", id],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/event/${id}`, {
        withCredentials: true,
      });
      return res.data.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error || !eventDetail)
    return <div className="text-center py-10 text-red-500">Error loading event</div>;

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-2 p-8 border-stone-800 rounded-2xl bg-background shadow-lg">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Event Info */}
          <div className="md:w-2/3 space-y-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={eventDetail.image}
                alt="event"
                className="w-full md:w-[300px] rounded-xl object-cover"
              />
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold">{eventDetail.title}</h2>
                <p className="mt-2 text-muted-foreground">
                  Deadline: {new Date(eventDetail.deadline).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-300">{eventDetail.description}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-secondary/20 text-sm rounded-full">
              {eventDetail.category}
            </span>
          </div>

          {/* Right: Order Form */}
          <div className="md:w-1/3 border-2 border-stone-800 rounded-2xl p-6 bg-zinc-900 space-y-4 shadow-xl">
            <h3 className="text-2xl font-semibold text-center mb-2">Place Your Order</h3>
            <div className="flex gap-4">
              <Button className="w-1/2" variant="default">
                Yes
              </Button>
              <Button className="w-1/2" variant="destructive">
                No
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Enter Price</Label>
              <Input id="price" placeholder="e.g. 100" />
            </div>
            <Button className="w-full mt-4">Place Order</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
