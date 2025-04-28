interface addLinksProps {
    linkData: {
        title: string;  
        link: string;
        imageSrc: string;
    }[];
}

export const AddLinks = ({linkData}: addLinksProps ) => {

    const colors = ['#504723', '#8A3310', '#211D10'];


    return(
        <div className="add-links">

            {linkData.map((data, index) => (
                 <div key={index} className="add-links-item"
                 style={{ backgroundColor: colors[index % colors.length] }} >
               <div  className="add-links-text-container">
                
                <a href={data.link} className="link">
                    <h1 className="add-links-title">{data.title}</h1>
                </a>

            </div>
            <div className="add-links-image-container">
                <img src={data.imageSrc} alt={data.title} />
            </div> 
            </div>
            ))
            }
           
        </div>
    )
}