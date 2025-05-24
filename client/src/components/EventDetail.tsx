import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom"
import type { EventProp } from "./Events";

export const EventDetail = () => {

    const {id} = useParams();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const { data: EventDetail } = useQuery<EventProp[]>({
        queryKey: ["eventDetail",id],
        queryFn: async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/event/:${id}`, { withCredentials: true })
                return res.data;
            } catch (e:any) {
                console.error(e.message);
            }
        }
    })



    return (
        <div>
            <div>
                {EventDetail?.map((event) => (
                    <div >
                        {event.title}
                    </div>
                ))}
            </div>
        </div>
    )
}