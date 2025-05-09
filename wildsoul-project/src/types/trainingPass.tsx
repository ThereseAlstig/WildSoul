export type TrainingPass = {
    date: string;
    title: string;
    duration: number;
    intensity: string;
    notes: string;
  };
  
  export type ProgramResult = {
    program: TrainingPass[];
    summary: string;
  };
  