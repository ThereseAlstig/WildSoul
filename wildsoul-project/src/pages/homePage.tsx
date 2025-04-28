import image from "../assets/runner.png";
import { AddBanner } from "../assets/components/addBanner"
import { AddText } from "../assets/components/addText";
import { AddLinks } from "../assets/components/addLinks";

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
    link: "https://www.example.com",        
    imageSrc: image // Replace with your image URL
},
{
    title: "UTMANINGAR",
    link: "/traning/utmaningar",
    imageSrc: image // Replace with your image URL
},
{       
    title: "COMMUNITY",
    link: "https://www.emple.com",
    imageSrc: image // Replace with your image URL
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