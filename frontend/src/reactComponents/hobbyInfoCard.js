import { useState } from "react";

export default function hobbiesInfoCards({hobbies, onChangeHobby, onDeleteHobby}){
    return(
        <div class="cardContainer">
            <Hobby hobby={hobbies} onChange={onChangeHobby} onDelete={onDeleteHobby}/>
        </div>
    )
}

function Hobby({hobby,onChange,onDelete}){
    const [editMode,setEditMode] = useState(false);
    let content;
    if(editMode){
        content = (<>
            <input value={hobby.title} onChange={(e) => {
                onChange({
                    ...hobby,
                    title:e.target.value
                })
            }
            } />
            <button onClick={() => setEditMode(false)}>Save Title</button>
        </>);
    }else{
        content = (<>
            <h5>{hobby.title}</h5>
            <button onClick={() => setEditMode(true)}>Edit Title</button>
        </>)
    }

    return (<>
        {content}
        <button onClick={() => onDelete(hobby.id)}>Delete Hobby</button>
    </>)
}