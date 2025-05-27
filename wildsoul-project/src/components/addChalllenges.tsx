import { Link } from "react-router-dom";

interface Challenge {
    title: string;
    goal: string;
    schedule: string; // t.ex. "3 gånger i veckan"
    progression: string;
    img: string; 
    link: string;// t.ex. "Öka med 2 reps varje vecka"
}

interface AddChallengesProps {
    challenges: Challenge[];
}


export const AddChallenges = ({ challenges }: AddChallengesProps) => {
    return (
           <div className="picture-links">
            {challenges.map((challenge, index) => (
                <div
                    key={index}
                    className={`picture-links__item ${index === 2 ? 'picture-links__item--full' : ''}`}
                >
                    <div className="picture-links__image-wrapper">
                        <img src={challenge.img} alt={challenge.title} className="picture-links__image" />
                        <div className="picture-links__overlay-bar">
                            <h3 className="picture-links__title">{challenge.title}</h3>
                            {/* <p><strong>Mål:</strong> {challenge.goal}</p>
                            <p><strong>Upplägg:</strong> {challenge.schedule}</p>
                            <p><strong>Progression:</strong> {challenge.progression}</p> */}
                            <Link to={challenge.link} className="text-gold picture-links__link">Läs mer</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};