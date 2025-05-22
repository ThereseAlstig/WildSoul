import { Link } from "react-router-dom";


interface LinksProps {
    linkData: {
        title: string;  
        link: string;
        imageSrc: string;
    }[]
};


export const LinksPicture = ({ linkData }: LinksProps) => {

    return (
        <div className="picture-links">
            {linkData.map((data, index) => (
                <div
                    key={index}
                    className={`picture-links__item ${index === 2 ? 'picture-links__item--full' : ''}`}
                >
                    <div className="picture-links__image-wrapper">
                        <img src={data.imageSrc} alt={data.title} className="picture-links__image" />
                        <div className="picture-links__overlay-bar">
                            <h3 className="picture-links__title">{data.title}</h3>
                            <Link to={data.link} className="text-gold picture-links__link">Läs mer</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    
}