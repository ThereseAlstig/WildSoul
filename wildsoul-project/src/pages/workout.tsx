import { AddBanner } from "../components/addBanner";
import image from "../assets/bikeride.png"; // Replace with your image URL
import { AddText } from "../components/addText";
import { AddLinks } from "../components/addLinks";
import foodBasket from "../assets/foodbasket.png";
import bike from "../assets/bike.png";
import zen from "../assets/zen.png";
import { AddLinksSoft } from "../components/addLinkSoft";


export const Workout = () => {

    const bannerData = {
        title: "Välkommen till din träningsresa",
        text: "Här hittar du allt du behöver för att utmana dig själv, planera din träning och nå dina mål – på ditt sätt.",        
        buttonText: "Kom igång",
        imageSrc: image,
        link: "/traning/planner" // Replace with your image URL
    }

    const textData = {
        title: "Utmaningar",
        text: "Det här är platsen där du tar träningen till nästa nivå. Sätt dina mål, följ din utveckling och dela resan med andra som också vill mer.",
    }


    const linkData =  [{
        title: "RECEPT",
        link: "/naring/recept",
        imageSrc: foodBasket // Replace with your image URL
    },
    {
        title: "UTMANINGAR",
        link: "/traning/utmaningar",
        imageSrc: bike // Replace with your image URL
    
    },
    {
        title: "COMMUNITY",
        link: "/community",
        imageSrc: zen // Replace with your image URL
    }]

    
    const linkText =  [{
        title: "FEM SMARTA FRUKOSTTIPS",
        link: "/naring/recept",
       text: "Starta dagen med näring och energi. Här kommer fem frukostar du komerm älska." // Replace with your image URL
    },
    {
        title: "BYGG STYRKA INFÖR SOMAMREN",
        link: "/traning/utmaningar",
        text: "Starta dagen med näring och energi. Här kommer fem frukostar du komerm älska." // Replace with your image URL
    
    }]


    return (
        <div className="workoutContainer">
            <AddBanner title={bannerData.title} text={bannerData.text} buttonText={bannerData.buttonText} imageSrc={bannerData.imageSrc} link={bannerData.link}/>
             <AddText title={textData.title} text={textData.text}/>
             <AddLinks linkData={linkData}/>

             <AddLinksSoft linkData={linkText}/>
        </div>
    );
}