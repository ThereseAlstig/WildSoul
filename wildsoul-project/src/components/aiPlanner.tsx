
import { useState } from "react"
import OpenAI from "openai";

// Skapa API-konfiguration

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  type TrainingPass = {
    date: string;
    title: string;
    duration: number;
    intensity: string;
    notes: string;
  };
  
  type ProgramResult = {
    program: TrainingPass[];
    summary: string;
  };

  type AiPlannerProps = {
    onProgramGenerated: (data: ProgramResult) => void;
  };

export const AiPlanner = ({ onProgramGenerated }: AiPlannerProps) => {

    const[formData, setFormData] = useState({
        activity: "Cykling",
    frequency: 3,
    goalTime: "",
    event: "",
    distance: 0,
    trainingType: "lopp", 
    level: "Motionär",
    startDate: "",
    endDate: "",
});
   
// Mocka API-anropet för att simulera svar
const isMockMode = true; 
type TrainingPass = {
  date: string;
  title: string;
  duration: number;
  intensity: string;
  notes: string;
};





const [summary, setSummary] = useState(""); // Här sparas sammanfattningen
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();


  if (isMockMode) {
    const mockSummary = "Träningsupplägget fokuserar på uthållighet och variation. Du kommer bygga volym gradvis med inslag av intensitet.";
    const mockProgram = [
      {
        date: "2025-05-08",
        title: "Lugn distans",
        duration: 60,
        intensity: "Zon 2",
        notes: "Bygga grunduthållighet",
      },
      {
        date: "2025-05-09",
        title: "Intervaller",
        duration: 45,
        intensity: "Zon 4",
        notes: "4x6 minuter i tröskel",
      },
      {
        date: "2025-05-11",
        title: "Långpass",
        duration: 120,
        intensity: "Zon 2",
        notes: "Öka uthållighet och volym",
      },
    ];

    setSummary(mockSummary);
    onProgramGenerated({
      program: mockProgram,
      summary: mockSummary,
    });// Skicka mockad data till föräldern
  }
  // Bygg prompten beroende på om användaren valt "lopp" eller "distans"
//   const target =
//     formData.trainingType === "lopp"
//       ? `loppet ${formData.event}`
//       : `en distans på ${formData.distance} km`;

//       const prompt = `
//       Skapa ett veckobaserat träningsprogram för ${formData.activity.toLowerCase()}.
//       Målet är att klara ${target} med ett mål om ${formData.goalTime}.
//       Personen tränar ${formData.frequency} gånger per vecka.
//       Erfarenhetsnivå: ${formData.level}.
//       Träningen startar ${formData.startDate} och ska vara klar till ${formData.endDate}.
      
//       Returnera:
//       1. En kort sammanfattning av träningsupplägget (2–3 meningar).
//       2. Ett JSON-array med träningspassen enligt följande struktur:
      
//       [
//         {
//           "date": "YYYY-MM-DD", 
//           "title": "Kort beskrivning av passet",
//           "duration": antal minuter,
//           "intensity": "t.ex. 'Zon 2' eller 'Hög'",
//           "notes": "kort kommentar om syfte eller innehåll"
//         }
//       ]
      
//       Dela upp svaret med denna rubrik före JSON:  
//       ### TRÄNINGSPROGRAM (JSON)
//       `;

// try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "Du är en expert på träningsplanering." },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.7,
//       max_tokens: 1500,
//     });

//     const content = completion.choices[0]?.message?.content;
//     console.log("GPT-svar (hela completion-objektet):", completion);
//     console.log("GPT-svar (textinnehåll):", content);
//     setProgram(content || "Inget svar genererades.");
//   } catch (error) {
//     console.error("Fel vid GPT-anrop:", error);
//     setProgram("Något gick fel vid anropet.");

//   }

console.log("Formulärdata:", formData);
console.log("Träningsprogram:", onProgramGenerated);
console.log("Sammanfattning:", summary);
return
};


  return (
    <form onSubmit={handleSubmit} className="ai-form">
      <label>
  Jag tränar för:
  <select name="trainingType" value={formData.trainingType} onChange={handleChange}>
    <option value="lopp">Ett specifikt lopp</option>
    <option value="distans">En egenvald distans</option>
  </select>
</label>

{formData.trainingType === "lopp" ? (
  <label>
    Loppets namn och distans (t.ex. "Vätternrundan, 315 km"):
    <input type="text" name="event" value={formData.event} onChange={handleChange} />
  </label>
) : (
  <label>
    Antal kilometer:
    <input type="number" name="distance" value={formData.distance} onChange={handleChange} />
  </label>
)}
      
      <label>
        Träningsform:
        <select name="activity" value={formData.activity} onChange={handleChange}>
          <option value="Cykling">Cykling</option>
          <option value="Löpning">Löpning</option>
          <option value="Simning">Simning</option>
          <option value="Längdskidor">Längdskidor</option>
        </select>
      </label>

      <label>
        Träningsdagar/vecka:
        <input type="number" name="frequency" value={formData.frequency} min="1" max="7" onChange={handleChange} />
      </label>

      <label>
        Tidsmål (t.ex. "under 10 timmar"):
        <input type="text" name="goalTime" value={formData.goalTime} onChange={handleChange} />
      </label>


      <label>
        Erfarenhetsnivå:
        <select name="level" value={formData.level} onChange={handleChange}>
          <option value="Nybörjare">Nybörjare</option>
          <option value="Motionär">Motionär</option>
          <option value="Avancerad">Avancerad</option>
        </select>
      </label>

      <label>
        Startdatum:
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
      </label>
      <label>
        Måldatum:
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
      </label>

      <button type="submit"className="button">Generera träningsprogram</button>
    </form>
  );

}