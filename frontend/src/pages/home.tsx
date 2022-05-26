import { Link } from "react-router-dom";

function Home(props: any) {
    return (
        <div className="flex min-h-100">
            <Content />
        </div>
    );
}

function Content() {
    return (
        <div className="sidebar-content flex-col ">
            {/* <div className="text-2xl font-bold">Welcome to Mogul! </div>
            <div className="text-lg mt-10">
                We're still under construction, so some features may not work.
                Feel free to take a look around to see what we've been working
                on!
            </div> */}
            <div className="text-2xl font-bold">Featured Stories</div>
            <Link to="/guides/real-rock">
                <div className="card">
                    <div className="text-lg font-bold text-stone-700">
                        Venturing Onto Real Rock
                    </div>
                    <div className="text-md text-stone-700">
                        a guide to making your first climbing foray onto stone
                        fun!.
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Home;
