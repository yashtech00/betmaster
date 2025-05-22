import type { EventProp } from "./Events"

export const EventComp = ({event}:{event:EventProp}) => {
    return (
        <div>
            <div>
                {event.title}
                {event.description}
                {event.category}
            </div>
        </div>
    )
}