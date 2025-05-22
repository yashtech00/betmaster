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
        </div>
    )
}