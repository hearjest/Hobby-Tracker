export function hobbyReducer(hobby_state, action){
    if(action.type === 'changed_hobby_info'){
        return hobby_state.map(hobby => {
            if(hobby.id === action.hobby.id){//MUST CHANGE MYSQL DATABASE
                return action.hobby;
            }else{
                return hobby;
            }
        })
    }else if(action.type === 'deletion'){
        return hobby_state.filter((hobby) => hobby.id !== action.id); //MUST CHANGE MYSQL DATABASE
    }else if(action.type === 'init_hobbies_state'){
        return action.payload;
    }else if(action.type === 'add_hobby'){  
        return [...hobby_state,(async (e) => {
            e.preventDefault();
            console.log('HELP')
            const reqBody={
                id:action.user_id,
                title:action.title,
                streak:"0",
                schedule:"{\"Monday\":\"10-5\"}",
                catergory:action.catergory
            }
            console.log(reqBody);
            const response = await fetch('/api/entries/newHobby',{
                method:"POST",
                body:JSON.stringify(reqBody),
                headers:{
                    "Content-Type":'application/json'
                }
            });

            const json= await response.json();
            if(!response.ok){
                return new Error("Something went wrong");
            }else{
                console.log(json);
                return [json.data];
            }
        })]
    }
}