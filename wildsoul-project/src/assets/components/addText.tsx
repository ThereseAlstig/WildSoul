 interface AddTextProps {
        title: string;  
        text: string;
       
    }
    
    export const AddText = ({title, text}: AddTextProps) => {


   
    return (
  <div className="add-text">
    <div className="add-text-container">
      <h1 className="add-text-title">{title}</h1>
      <p className="add-text-text">{text}</p>
     </div>
     </div>
    )
}