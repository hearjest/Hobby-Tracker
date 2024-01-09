import {useState} from 'react';

export default function HobbyCreateForm({onSubmitHobby}){//Reform based on a weekly basis. Title, time goal for week, time spent that week
    const [title,setTitle] = useState(''); 
    const [catergory,setCatergory] = useState(''); 

    return(
        <form class="hobbyForm" onSubmit={ async (e) => {e.preventDefault(); return await onSubmitHobby('18', title, catergory);}}>
            <h4>Enter information about hobby</h4>
            <label for="title">Name of hobby</label>
            <br/> 
            <input type="text" onChange={(e) => setTitle(e.target.value)} value = {title} id="title" name="title">
            </input>
            <br/>
            <label for="catergory">Name of catergory</label>
            <br/>
            <input type="text" onChange={(e) => setCatergory(e.target.value)} value = {catergory} id="catergory" name="catergory">
            </input>
            <button type="submit">Submit hobby entry</button>
        </form>
    )
}