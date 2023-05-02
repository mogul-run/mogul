import figs from "../../../img/figs.png";

function About() {
    return (
        <div className="flex space-x-2">
            <div className="w-2/5">
                <img
                    className="flex-1 rounded-md"
                    src={"https://i.imgur.com/UCs8cRz.jpg"}
                />
            </div>
            <div className="w-3/5">
                <div className="text-2xl uppercase tracking-wider text-stone-600 my-2">
                    About
                </div>
                <div className="">
                    The House of Bob is a place I'll be sharing my love for the
                    outdoors. I'll be posting about my adventures, gear reviews,
                    and other outdoor related content. I hope you enjoy!
                </div>
            </div>
        </div>
    );
}

export default About;
