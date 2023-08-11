import mogulIcon from "../resources/img/mogul-icon-rough.jpg";

function DinnersPreMVP() {
    return (
        <div className="flex flex-row h-screen items-center justify-start bg-accent-dark bg-cover bg-redwood">
            <div className="grid grid-cols-3 h-72 items-center bg-stone-100 border-4 border-orange-400 rounded-full p-3 ">
                <div></div>
                <div className>
                    <div className="p-4">
                        <img
                            src={mogulIcon}
                            className="w-32 h-32 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
                        />
                    </div>
                    <div className="text-3xl">mogul dinners</div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="btn-ghost">I want to host a dinner</div>
                    <div className="input" />
                    <div className="btn-ghost">I want to eat</div>
                </div>
            </div>
        </div>
    );
}

export default DinnersPreMVP;
