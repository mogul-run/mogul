function MogulPad(props: any) {
    return (
        <div className="flex min-h-100">
            <Content />
        </div>
    );
}

function Content() {
    return (
        <div className="sidebar-content flex-col ">
            <div className="text-2xl font-bold">Welcome to Mogul! </div>
            <div className="text-lg mt-10">We're still under construction, so some features may not work. Feel free to take a look around to see what we've been working on!</div>
        </div>
    );
}

export default MogulPad;
