import mogulIcon from "../resources/img/mogul-icon-rough.jpg";

function DinnersPreMVP() {
    return (
        <div className="flex flex-row h-screen items-center justify-start bg-accent-dark bg-cover bg-redwood">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center p-6 border-4 backdrop-blur-sm backdrop-grayscale backdrop-brightness-175 border-orange-600 rounded-full p-3 ">
                <div className="m-6 flex flex-col items-center gap-4">
                    <img
                        src={mogulIcon}
                        className="w-32 h-32 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] border-4 border-stone-300"
                    />
                    <div className="flex flex-col text-red-500">
                        <div className="text-xl font-light">mogul </div>
                        <div className="text-3xl font-extrabold">dinners</div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 m-6">
                    <div className="btn-std">I want to host a dinner 👩‍🍳</div>
                    <div className="input" />
                    <div className="btn-std">I want to eat 😋</div>
                </div>
            </div>
        </div>
    );
}

export default DinnersPreMVP;
