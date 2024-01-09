const mysql=require('mysql2');

const connection=mysql.createPool({
    host:process.env.HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE
}).promise();

async function getUser(email,password){
    const [result] = await connection.query("SELECT * FROM user WHERE email = ? AND password = ?",[email,password])
    if(result.length<1){
        throw new Error("You screwed up")
    }
    return result;
};

async function getHobbies(user_id){
    try {
        const result = await connection.query('SELECT * FROM hobby WHERE user_id = ?', user_id);
        return result;
    } catch (err) {
        throw new Error("invalid");
    }
};

async function getHobbiesByInsertID(insertID){
    try {
        const result = await connection.query('SELECT * FROM hobby WHERE id = ?', insertID);
        console.log('HELP')
        return result;
    } catch (err) {
        throw new Error("invalid");
    }
};

async function createHobby(user_id,title,streak,schedule,catergory){// To do: validate title, streak, schedule
    const result1 = await connection.query('INSERT INTO hobby (user_id,title,streak,schedule,catergory) VALUES (?,?,?,?,?)',[user_id,title,streak,schedule,catergory],function(err,result,fields){
        if (err){
            throw new Error("how did you mess up this badly man")
        }
        });
    return result1;
};

async function deleteHobby(hobby_id){// To do: validate title, streak, schedule
    const result = await connection.query('DELETE FROM hobby WHERE id =?',[hobby_id],function(err,result,fields){
        if (err){
            throw new Error("Invalid hobby id")
        }
        });
        return result;
};

async function updateHobby(hobby_id, title,streak,schedule,catergory){// To do: Make sure id is valid
    const result = await connection.query('UPDATE hobby SET title = ?, streak = ?, schedule = ?, catergory = ? WHERE id = ?',[title,streak,schedule,catergory,hobby_id,],function(err,result,fields){
        if (err){
            throw new Error("Invalid hobby id")
        }
        return result;
        });
    return result;
};

async function createUser(username,email,password){
    const result = await connection.query('INSERT INTO user (username,email,password) VALUES (?,?,?)',[username,email,password],function(err, result, fields){
        if (err){
            throw new Error("duplicate email or username")
        }
        });
    return result;
};

module.exports = {createUser,createHobby,getUser,updateHobby,deleteHobby,getHobbies,getHobbiesByInsertID};


/*
connection.connect(error => {
    if (error){
        throw error;
   }//else
   const result=connection.query("SELECT * FROM kanjiandfreq ORDER BY frequency DESC;",function (err, result, fields) {
    if(err) throw err;
    console.log(result)
   });
});
 */