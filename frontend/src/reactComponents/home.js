import {useEffect,useReducer} from 'react';
import NavBar from './navBar.js';
import HobbyInfoCards from './hobbyInfoCard.js';
import { hobbyReducer } from '../reactReducer/reactReducer.js';
import HobbyCreateForm from './HobbyCreateForm.js';

export default function HomePage(){
    const [hobbies,dispatch] = useReducer(hobbyReducer,null);

    useEffect(() => {
        async function fetchData(){
            let response = await fetch('http://localhost:4000/api/entries/getHobbies/18');
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

    async function handleHobbyEntrySubmit(user_id,title,catergory){
        const result = async ()=>{
            const reqBody={
                id:user_id,
                title:title,
                streak:"0",
                schedule:"{\"Monday\":\"10-5\"}",
                catergory:catergory
            }
            const response = await fetch('http://localhost:4000/api/entries/newHobby',{
                method:"POST",
                body:JSON.stringify(reqBody),
                headers:{
                    "Content-Type":'application/json',
                },
            });
            if(!response.ok){
                return new Error("Something went wrong");
            }
            let json=await response.json();

            let hobbyReq=await fetch(('http://localhost:4000/api/entries/getHobbiesByInsertId/'+(json[0].insertId)));
            if(!response.ok){
                return new Error("Something went wrong");
            }else{
                return await hobbyReq.json()
            }  
        };
        
        let num=await result();
        dispatch({
            type:'add_hobby',
            user_id:user_id,
            title:title,
            catergory:catergory,
            hobby:num
        });
    }

    

    return(
    <>
        <NavBar/>
        <div class="container">
            <div class="sideBar"><HobbyCreateForm onSubmitHobby={handleHobbyEntrySubmit}/></div>
            <div class="hobbyCardContainer">
                {hobbies&&hobbies.map(hobbies=>
                    (<HobbyInfoCards key={hobbies.id} hobbies={hobbies} onChangeHobby={handleHobbyChange} onDeleteHobby={handleHobbyDeletion}/> ))}
            </div>
        </div>
    </>
    );
}