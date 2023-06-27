const connection = require("../db/connection");

async function list(req, res){
    
    // const movies = [{ title: "Spirited Away",runtime_in_minutes: 125, rating: "PG",},1,23,23,23,2,32,32,323,43,4,3,43,43,32,4]
    try{
        // const response = await connection('theaters');
        // const finalResponse = [];
        // for (let index = 0; index < response.length; index++) {
        //     finalResponse.push({...response[index], movies});
        // }
        
        const response = await connection.raw(
            'select theaters.*, ARRAY( select ARRAY[movies.title] from movies_theaters '
            +'left join movies on  movies_theaters.movie_id = movies.movie_id ) as movies from movies_theaters '
            +'inner join theaters on movies_theaters.theater_id = theaters.theater_id');
        console.log(response);
        return res.status(200).send({data: ''});
    }catch(e){
        console.log(e)
        return res.status(500).send({error: e});
    }
}
module.exports = {
    list
}