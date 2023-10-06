import {useEffect,useReducer} from 'react';
import NavBar from './navBar.js';
import HobbyInfoCards from './hobbyInfoCard.js';
import { hobbyReducer } from '../reactReducer/reactReducer.js';
import HobbyCreateForm from './HobbyCreateForm.js';
export default function HomePage(){
    const [hobbies,dispatch] = useReducer(hobbyReducer,null);

    useEffect(() => {
        async function fetchData(){
            const response = await fetch('/api/entries/getHobbies/18');
            const json = await response.json();
            
            if(response.ok){
                dispatch({
                    type:'init_hobbies_state',
                    payload:json
                });
            };
        }
        fetchData();
    },[]);

    function handleHobbyChange(hobby){
        dispatch({
            type:'changed_hobby_info',
            hobby:hobby,
        });
    }

    function handleHobbyDeletion(hobby_id){
        dispatch({
            type:'deletion',
            id:hobby_id,
        });
    }

    function handleHobbyEntrySubmit(user_id,title,catergory){
        dispatch({
            type:'add_hobby',
            user_id:user_id,
            title:title,
            catergory:catergory,
        });
    }



    return(
    <>
        <NavBar/>
        <div class="container">
            <div class="sideBar"><HobbyCreateForm onSubmitHobby={handleHobbyEntrySubmit}/></div>
            <div class="hobbyCardContainer">
                {hobbies&&hobbies.map((hobbies)=>
                    (<HobbyInfoCards key={hobbies.id} hobbies={hobbies} onChangeHobby={handleHobbyChange} onDeleteHobby={handleHobbyDeletion}/> ))}
            </div>
            
        </div>
    </>
    );
}