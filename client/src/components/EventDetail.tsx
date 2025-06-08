import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { EventProp } from "./Events";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "framer-motion";
import EventNavbar from "./EventNavbar";
import { useState } from "react";
import { Calendar, Clock, Tag } from "lucide-react";

interface TradeProp {
  price: string,
  outcome: string
}

export const EventDetail = () => {
  const { id } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState<TradeProp>({
    price: "",
    outcome: "",
  })

  const { data: eventDetail, isLoading, error } = useQuery<EventProp>({
    queryKey: ["eventDetail", id],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/event/${id}`, {
        withCredentials: true,
      });
      return res.data.data;
    },
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <motion.div 
        className="text-center py-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading event details...</p>
      </motion.div>
    </div>
  );
  
  if (error || !eventDetail)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-destructive/10">
        <motion.div 
          className="text-center py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-destructive text-6xl mb-4">⚠️</div>
          <p className="text-destructive text-lg font-semibold">Error loading event</p>
          <p className="text-muted-foreground mt-2">Please try again later</p>
        </motion.div>
      </div>
    );

  const { mutate: Trade } = useMutation<TradeProp, unknown, TradeProp>({
    mutationKey: ["trade"],
    mutationFn: async (formData) => {
      try {
        const res = await axios.post("/event/id", { formData }, { withCredentials: true });
        return res.data.data;
      } catch (e) {
        console.error(e);
      }
    }
  })

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    await Trade(formData);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <EventNavbar />
      
      <motion.div
        className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto mt-14"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="border border-border/50 p-6 sm:p-8 lg:p-10 rounded-3xl bg-card/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-shadow duration-300"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
            
            {/* Left: Event Info */}
            <motion.div 
              className="xl:w-2/3 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={eventDetail.image}
                    alt="event"
                    className="w-full lg:w-[320px] h-48 lg:h-56 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
                
                <div className="text-center lg:text-left flex-1 space-y-4">
                  <motion.h1 
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {eventDetail.title}
                  </motion.h1>
                  
                  <motion.div 
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/30 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(eventDetail.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/30 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(eventDetail.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {eventDetail.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                    {eventDetail.category}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Order Form */}
            <motion.div
              className="xl:w-1/3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.form 
                className="sticky top-24 border border-border/50 rounded-3xl p-6 lg:p-8 bg-card/80 backdrop-blur-sm space-y-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                onSubmit={handleTrade}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center space-y-2">
                  <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Place Your Order
                  </h3>
                  <p className="text-sm text-muted-foreground">Choose your prediction and stake</p>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-foreground">Select Outcome</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      className={`relative overflow-hidden px-6 py-4 rounded-xl font-semibold transition-all duration-300  ${
                        formData.outcome === "yes" 
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/30 scale-105" 
                          : " text-muted-foreground hover:text-foreground border border-border/50"
                      }`}
                      onClick={() => setFormData({...formData, outcome: "yes"})}
                      whileHover={{ scale: formData.outcome === "yes" ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Yes</span>
                      {formData.outcome === "yes" && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      className={`relative overflow-hidden px-6 py-4 rounded-xl font-semibold transition-all duration-300   ${
                        formData.outcome === "no" 
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105" 
                          : " text-muted-foreground hover:text-foreground border border-border/50"
                      }`}
                      onClick={() => setFormData({...formData, outcome: "no"})}
                      whileHover={{ scale: formData.outcome === "no" ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">No</span>
                      {formData.outcome === "no" && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="price" className="text-sm font-medium text-foreground">
                    Enter Price (USD)
                  </Label>
                  <Input 
                    id="price" 
                    placeholder="e.g. 100" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="h-12 px-4 bg-background/50 border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={!formData.outcome || !formData.price}
                  >
                    Place Order
                  </Button>
                </motion.div>
                
                <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/30">
                  * Orders are processed immediately
                </div>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};