import figs from "../../../img/figs.png";

function About() {
    return (
        <div className="flex space-x-2">
            <div className="w-2/5">
                <img className="flex-1" src={figs} />
            </div>
            <div className="w-3/5">
                <div className="text-4xl">About</div>
                Sender Central
            </div>
        </div>
    );
}

export default About;
