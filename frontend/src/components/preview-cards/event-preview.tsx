const event={
    title: "Event Title",
    desc: "Cool event Desc",
}

function EventPreview(props:any) {
    return ( <div>
        <div>
            {event.title}
        </div>
        <div>
            {event.desc}
        </div>
    </div> );
}

export default EventPreview;