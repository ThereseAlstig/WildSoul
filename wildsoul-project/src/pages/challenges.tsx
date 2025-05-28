import yoga from "../assets/yoga.jpg";
import lopning from "../assets/lopning.jpg";
import styrka from "../assets/styrka.jpg";
import { AddChallenges } from "../components/addChalllenges";


const Challenges = () => {

    const challenges = [
        {
            title: "Spring 5 km utan att stanna",
            goal: "Bygg upp din kondition och spring 5 km utan att behöva gå.",
            schedule: "Träna 3 gånger i veckan med varierande distanser.",
            progression: "Öka distansen med 500 meter varje vecka.",
            img: lopning,
            link: "/challenges/running-5km"
        },
        {
            title: "Styrketräning för hela kroppen",
            goal: "Bli starkare och bygga muskelmassa.",
            schedule: "Träna styrka 4 gånger i veckan med fokus på olika muskelgrupper.",
            progression: "Öka vikterna med 2,5 kg varje vecka.",
            img: styrka,
            link: "/challenges/strength-training"
        },
        {
            title: "Yoga för flexibilitet och balans",
            goal: "Förbättra din rörlighet och minska stress.",
            schedule: "Yoga 3 gånger i veckan, varav en gång med fokus på andning.",
            progression: "Lägg till en ny position varje vecka.",
            img: yoga,
            link: "/challenges/yoga"
        }
    ];


    return (
        <div className="challenges">
        <h1>Challenges</h1>
        <p>Gör träningen meningsfull!</p>
        <p>Här hittar du utmaningar som ger dig riktning, pepp och konkreta mål – oavsett om du vill springa längre, bli starkare, eller bara hitta tillbaka till rutinen. Välj din utmaning – och kör!</p>
        <AddChallenges challenges={challenges} />
        
        </div>
    );
    }

export default Challenges;
export { Challenges };