import { Link } from "react-router-dom";
import { isTemplateSpan } from "typescript";
import Bananas from "../../../img/bananas.png";
const sample_item = {
    img_url: "",
    title: "Inlander's Guide to Surfing",
    desc: "Learn how to surf as an inlander, from an inlander that learned the hard way!",
};
const sample_item2 = {
    img_url: "",
    title: "Climbing Real Rock",
    desc: "Learn about the basics of transitioning out of the gym and into the real world. ",
};
const marketplace_items = [sample_item, sample_item2];

function Marketplace() {
    return (
        <div className="menu min-w-full text-center">
            <div className="text-4xl font-light">Classes</div>
            {/* <img className="my-4" src={Bananas}/> */}
            <div className="text-2xl my-2">Menu</div>
            <div className="space-y-2">
                {marketplace_items.map((item) => {
                    return <MarketplaceItem item={item} />;
                })}
            </div>
        </div>
    );
}

function MarketplaceItem(props: any) {
    return (
        <Link to="/">
            {" "}
            <div className="my-2 outline rounded flex items-center justify-between text-stone-700 hover:bg-stone-200 cursor-pointer">
                <div>
                    <div className="text-2xl text-bold">{sample_item.title}</div>
                    <div className="text-md">{sample_item.desc}</div>
                </div>
            </div>
        </Link>
    );
}

export default Marketplace;
