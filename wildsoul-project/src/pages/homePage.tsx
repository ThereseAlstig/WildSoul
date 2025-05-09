import image from "../assets/runner.png";
import { AddBanner } from "../components/addBanner"
import { AddText } from "../components/addText";
import { AddLinks } from "../components/addLinks";
import foodBasket from "../assets/foodbasket.png";
import bike from "../assets/bike.png";
import zen from "../assets/zen.png";
import  {LinksPicture } from "../components/links";
import Breakfast from "../assets/breakfast-1804436_1280.jpg";
import Training  from "../assets/man-2264825_1280 (1).jpg";
import FoodTips from "../assets/food-3223286_1280.jpg";

export const Homepage = () => {


const bannerData = {
    title: "AI-baserad träningsplanering",
    text: "Arbeta mot dina träningsmål med hjälp av en personlig plan genererad av AI",        
    buttonText: "Kom igång",
    imageSrc: image, // Replace with your image URL
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


const pictureData = [{
    title: "Hälsosam Frukost",
    link: "/naring/recept",
    imageSrc: Breakfast // Replace with your image URL
},
{
    title: "Kosttips för vardagen",
    link: "/traning/utmaningar",
    imageSrc: FoodTips // Replace with your image URL

},
{
    title: "Tränings inspiration",
    link: "/community",
    imageSrc: Training // Replace with your image URL
}]

    return(

        <>
 <AddBanner
 title={bannerData.title}
    text={bannerData.text}
    buttonText={bannerData.buttonText}
    imageSrc={bannerData.imageSrc} 
    link={bannerData.link}

 />

 <AddText title={textData.title} text={textData.text}/>

 <AddLinks linkData={linkData}/>

 <LinksPicture linkData={pictureData}/>

        </>
       
    )

}