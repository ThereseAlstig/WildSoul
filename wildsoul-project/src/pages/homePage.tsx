import image from "../assets/runner.png";
import { AddBanner } from "../assets/components/addBanner"

export const Homepage = () => {


const bannerData = {
    title: "AI-baserad träningsplanering",
    text: "Arbeta mot dina träningsmål med hjälp av en personlig plan genererad av AI",        
    buttonText: "Kom igång",
    imageSrc: image // Replace with your image URL
}




    return(

        <>
 <AddBanner
 title={bannerData.title}
    text={bannerData.text}
    buttonText={bannerData.buttonText}
    imageSrc={bannerData.imageSrc} 

 />

        </>
       
    )

}