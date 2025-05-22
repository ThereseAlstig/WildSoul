import { Link } from "react-router-dom";

interface addLinksProps {
    linkData: {
        title: string;  
        link: string;
       text: string;
    }[];
}

export const AddLinksSoft = ({linkData}: addLinksProps ) => {

   

    return(
        <div className="add-links-soft">

            {linkData.map((data, index) => (
                 <div key={index} className="add-links-item add-links-item-soft"
                 >
               <div  className="add-links-text-container">
                
           
                <Link to={data.link} className="text-gold"></Link>

                <h1 className="add-links-title-soft">{data.title}</h1>
            </div>
            <div className="add-links-image-container">
                <p className="add-links-text">{data.text}</p>
            </div> 
            <Link to={data.link} className="link-soft">
                LÄS MER
            </Link>
            </div>
            ))
            }
           
        </div>
    )
}