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
                
                <a href={data.link} className="link-soft">
                    <h1 className="add-links-title-soft">{data.title}</h1>
                </a>

            </div>
            <div className="add-links-image-container">
                <p className="add-links-text">{data.text}</p>
            </div> 
            <a href={data.link} className="link-soft">
                LÄS MER
            </a>
            </div>
            ))
            }
           
        </div>
    )
}