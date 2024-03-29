import {Link} from "react-router-dom";

export const ProductCard = ({id, title, image, link, price}) => {
    return (
        <div id={id} className="w-72 ml-5 mb-7">
            <Link to={link}>
                <div className="w-full h-44 rounded-2xl overflow-hidden">
                    <img
                        loading="lazy"
                        className="object-fill hover:ease-out hover:scale-105 transition-all duration-500 "
                        src={process.env.REACT_APP_API_URL + image}
                        alt={title}
                    />
                </div>
                <div className="my-2">
                    <h3>{title}</h3>
                    <h3 className="font-bold">{Number(price).toLocaleString()}원</h3>
                </div>
            </Link>
        </div>

    );
}


export const SkeletonProductCard = () => {
    return (
        <div className="w-72 ml-5 mb-7">
            <div className="card__image">
                <div className="w-full h-40 bg-gray-300 rounded-2xl"/>
            </div>
            <div className="my-2">
                <h3 className="bg-gray-300 w-1/2 h-4 mb-2"/>
                <h3 className="bg-gray-300 w-1/4 h-4"/>
            </div>
        </div>
    );
}

