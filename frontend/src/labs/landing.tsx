import "./landing.css";

function Landing() {
    return (
        <div className="w-100 h-screen flex items-center justify-center landing-background">
            <div className="flex flex-col w-96 h-96 gap-4 items-center justify-center rounded-full backdrop-grayscale backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-stone-300">
                    mogul run labs 
                <div className="text-xs font-light text-stone-300">
                    est. 2021
                </div>
                </div>
                <ul className="flex flex-col gap-2">
                    <li>
                        <a href="https://communities.mogul.run"> communities </a>
                    </li>
                    <li>
                        <a href="https://kits.mogul.run"> kits </a>
                    </li>
                    <li>
                        <a href="https://blog.mogul.run"> blog </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Landing;
