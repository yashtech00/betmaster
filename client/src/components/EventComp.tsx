import type { EventProp } from "./Events";
import { Button } from "./ui/button";

export const EventComp = ({ event }: { event: EventProp }) => {

   const getFirst10Words = (text: string) => {
    if (!text) return "";
    return text.split(/\s+/).slice(0, 10).join(" ") + (text.split(/\s+/).length > 10 ? "..." : "");
}
    return (
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-lg text-white shadow-lg transition hover:shadow-2xl hover:scale-[1.02]  ">
            <div className="flex justify-center space-x-4">
            <div>
                <img
                    src={event.image}
                        alt="image"
                        className="w-full h-40 object-cover rounded-xl border border-white/10"
                />
            </div>
            <div>
                <p className="text-xs text-foreground/50">Deadline: {new Date(event.deadline).toLocaleString()}</p>
                <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
               
                </div>
                
            </div>
             <p className="text-md font-medium text-foreground/50">{getFirst10Words(event.description)}</p>
                <span className="inline-block px-3 py-1 bg-secondary/10 text-sm rounded-full mb-2">
                    {event.category}
                </span>

                <div className="space-x-2 flex justify-center">
                    <Button className="  w-full">Yes</Button>
                    <Button className="w-full  ">No</Button>
                </div>
            </div>
    );
};
