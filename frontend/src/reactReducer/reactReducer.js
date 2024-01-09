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
        console.log("pls")
        console.log(action.hobby[0])
        return [...hobby_state, action.hobby[0]];
    }
}