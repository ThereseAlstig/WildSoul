
import { useState } from "react";
import { TrainingPass } from "../types/trainingPass";
import { saveAs } from 'file-saver';

interface ProgramViewProps {
  program: TrainingPass[];
  summary: string;
}

export const ProgramView = ({ program, summary }: ProgramViewProps) => {
  const [editableProgram, setEditableProgram] = useState(program);

  const handleChange = (index: number, field: keyof TrainingPass, value: string | number) => {
    const updatedProgram = [...editableProgram];
    updatedProgram[index] = {
      ...updatedProgram[index],
      [field]: value,
    };
    setEditableProgram(updatedProgram);
  };


  const downloadICS = (program: TrainingPass[]) => {
  const events = program.map((pass) => {
    const start = new Date(pass.date);
    const end = new Date(start.getTime() + pass.duration * 60000);

    const format = (date: Date) =>
      date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return `BEGIN:VEVENT
SUMMARY:${pass.title} (${pass.intensity})
DESCRIPTION:${pass.notes}
DTSTART:${format(start)}
DTEND:${format(end)}
END:VEVENT`;
  });

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
${events.join('\n')}
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  saveAs(blob, 'träningsprogram.ics');
};



//lägga till i googlekalender ett pass i taget

const createGoogleCalendarLink = (pass: TrainingPass) => {
  const start = new Date(pass.date);
  const end = new Date(start.getTime() + pass.duration * 60000);

  const formatDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', pass.title);
  url.searchParams.set('dates', `${formatDate(start)}/${formatDate(end)}`);
  url.searchParams.set('details', `${pass.notes}\nIntensitet: ${pass.intensity}`);
  url.searchParams.set('location', '');
  url.searchParams.set('trp', 'false');

  return url.toString();
};

  return (
    <div className="programView">
      <h2>Träningsprogram</h2>
      <p>{summary}</p>

      {editableProgram.map((pass: TrainingPass, index: number) => (
        <div key={index} className="trainingPass">
          <label>
            Datum:
            <input
              type="date"
              value={pass.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
            />
          </label>

          <label>
            Träningsform:
            <input
              type="text"
              value={pass.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
            />
          </label>

          <label>
            Längd (minuter):
            <input
              type="number"
              value={pass.duration}
              onChange={(e) => handleChange(index, "duration", Number(e.target.value))}
            />
          </label>

          <label>
            Intensitet:
            <input
              type="text"
              value={pass.intensity}
              onChange={(e) => handleChange(index, "intensity", e.target.value)}
            />
          </label>

          <label>
            Anteckningar:
            <textarea
              value={pass.notes}
              onChange={(e) => handleChange(index, "notes", e.target.value)}
            />
          </label>

          <a
  href={createGoogleCalendarLink(pass)}
  target="_blank"
  rel="noopener noreferrer"
  className="button"
>
  Lägg till i Google Kalender
</a>
        </div>
      ))}
      <button className="button">SPARA PROGRAM</button>
      <button className="button" onClick={() => downloadICS(editableProgram)}>Exportera hela programmet (.ics)</button>
    </div>
  );
};
