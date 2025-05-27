interface Challenge {
    title: string;
    goal: string;
    schedule: string; // t.ex. "3 gånger i veckan"
    progression: string;
    img: string; // t.ex. "Öka med 2 reps varje vecka"
}

interface AddChallengesProps {
    challenges: Challenge[];
}


export const AddChallenges = ({ challenges }: AddChallengesProps) => {
    return (
          <div className="add-challenges space-y-4">
            {challenges.map((challenge, index) => (
                <div
                    key={index}
                    className="relative p-4 rounded shadow-md text-white overflow-hidden"
                    style={{
                        backgroundImage: `url(${challenge.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

                    {/* Content above overlay */}
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold">{challenge.title}</h3>
                        <p><strong>Mål:</strong> {challenge.goal}</p>
                        <p><strong>Upplägg:</strong> {challenge.schedule}</p>
                        <p><strong>Progression:</strong> {challenge.progression}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
