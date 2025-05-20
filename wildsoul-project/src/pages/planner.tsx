import { useState } from "react";
import { AiPlanner } from "../components/aiPlanner"; // Importera AiPlanner-komponenten
import { ProgramView } from "../components/programView"   ; // Den komponent du vill visa
import { TrainingPass } from "../types/trainingPass"; // Importera TrainingPass-typen



 const Planner = () => {
    type ProgramResult = {
        program: TrainingPass[];
        summary: string;
      };

  const [programData, setProgramData] = useState<ProgramResult | null>(null);// null tills vi fått svar

  return (
    <div className="plannerContainer">
      <h1>Tränings planerare</h1>

      {!programData && (
        <AiPlanner onProgramGenerated={(data) => setProgramData(data)} />
      )}

      {programData && (
        <ProgramView program={programData.program} summary={programData.summary}  />
      )}
    </div>
  );
};


export default Planner;
export { Planner };