import "./landing.css";

function Landing() {
    return (
        <div className="w-100 h-screen flex items-center justify-center landing-background">
            <div className="flex flex-col w-96 h-96 gap-4 items-center justify-center rounded-full backdrop-grayscale backdrop-blur-sm">
                <div className="text-4xl text-orange-500">
                    <span className="font-extrabold text-6xl">mogul</span>
                    <span className="font-extra-light font-sans">.run</span>
                    <div className="font-serif font-8xl text-center ml-8">labs</div>
                    <div className="text-xs text-orange-600 text-center">est. 2021</div>
                </div>
                <ul className="flex flex-col gap-2 text-purple-600">
                    <li>
                        <a
                            href="https://communities.mogul.run"
                            className="text-purple-500"
                        >
                            {" "}
                            communities{" "}
                        </a>
                    </li>
                    <li>
                        <a href="https://kits.mogul.run" className="text-orange-600"> kits </a>
                    </li>
                    <li>
                        <a href="https://blog.mogul.run" className="text-purple-300"> blog </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Landing;
