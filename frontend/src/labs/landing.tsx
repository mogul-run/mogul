import "./landing.css";

function Landing() {
    return (
        <div className="w-100 h-screen flex items-center justify-center landing-background">
            <div className="flex flex-col w-96 h-96 gap-4 items-center justify-center rounded-full backdrop-grayscale backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-stone-300">
                    mogul run studios
                </div>
                <ul className="flex flex-col gap-2">
                    <li>
                        <a href="https://tea.mogul.run"> tea </a>
                    </li>
                    <li>
                        <a href="https://communities.mogul.run"> communities </a>
                    </li>
                    <li>
                        <a className="cursor-not-allowed"> gear </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Landing;
