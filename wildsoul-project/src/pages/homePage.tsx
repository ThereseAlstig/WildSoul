import image from "../assets/runner.png";
import { AddBanner } from "../components/addBanner"
import { AddText } from "../components/addText";
import { AddLinks } from "../components/addLinks";
import foodBasket from "../assets/foodbasket.png";
import bike from "../assets/bike.png";
import zen from "../assets/zen.png";

export const Homepage = () => {


const bannerData = {
    title: "AI-baserad träningsplanering",
    text: "Arbeta mot dina träningsmål med hjälp av en personlig plan genererad av AI",        
    buttonText: "Kom igång",
    imageSrc: image // Replace with your image URL
}

const textData = {
    title: "Utmaningar",
    text: "Det här är platsen där du tar träningen till nästa nivå. Sätt dina mål, följ din utveckling och dela resan med andra som också vill mer.",
}


const linkData = [{
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
    },  ]

    return(

        <>
 <AddBanner
 title={bannerData.title}
    text={bannerData.text}
    buttonText={bannerData.buttonText}
    imageSrc={bannerData.imageSrc} 

 />

 <AddText title={textData.title} text={textData.text}/>

 <AddLinks linkData={linkData}/>

        </>
       
    )

}