import Bananas from "../../../img/bananas.png";

function Menu() {
    return <div className="menu min-w-full text-center"><div className="text-4xl font-light">Chez Lucas</div>
    <img className="my-4" src={Bananas}/>
    <div className="text-2xl my-2">
        Menu is in the works, please come back soon!
    </div>

    </div>;
}

export default Menu;
