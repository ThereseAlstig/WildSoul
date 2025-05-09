import { TrainingPass } from "../types/trainingPass";


interface ProgramViewProps {
    program: TrainingPass[];
    summary: string;
}

export const ProgramView = ({ program }: ProgramViewProps) => {
    return (
        <div className="programView">
            <h2>Träningsprogram</h2>
            {program.map((pass, index) => (
                <div key={index} className="trainingPass">
                    <h3>{pass.date}</h3>    
                    <p>{pass.intensity
}</p>

                    <p>Träningsform: {pass.title}</p>
                   
                </div>
            ))}
        </div>
    );
}   