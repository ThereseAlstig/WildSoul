

interface AddBannerProps {
    title: string;  
    text: string;
    buttonText: string;
    imageSrc: string;
    link: string;
}


export const AddBanner = ({title, text, buttonText, imageSrc, link }: AddBannerProps ) => {

    return(

        <div className="add-banner">
       <div className="add-banner-text-container">
     <h1 className="add-banner-title">{title}</h1>
     <p className="add-banner-text">{text}</p>
      <button className="button"
        onClick={() => window.location.href = link}
        >{buttonText}</button>
      
       </div>

       <div className="add-banner-image-container">
        <img src={imageSrc} alt={title} />
       </div>
        </div>

    )

}