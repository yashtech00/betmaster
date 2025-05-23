import type { EventProp } from "./Events";

export const EventComp = ({ event }: { event: EventProp }) => {
  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-lg text-white shadow-lg transition hover:shadow-2xl hover:scale-[1.02]">
      <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
      <p className="text-sm text-foreground/70 mb-2">{event.description}</p>
      <span className="inline-block px-3 py-1 bg-secondary/10 text-sm rounded-full mb-2">
        {event.category}
      </span>
      <p className="text-xs text-foreground/50">Deadline: {new Date(event.deadline).toLocaleString()}</p>
    </div>
  );
};
