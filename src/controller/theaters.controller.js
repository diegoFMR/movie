const connection = require("../db/connection");

async function list(req, res){

    try{
        const movies = await connection.raw('select DISTINCT ( movies.title ) as title, movies.runtime_in_minutes, movies.rating from movies_theaters '
        +'left join movies on movies_theaters.movie_id = movies.movie_id '
        +'where movies_theaters.is_showing IS TRUE');
        
        const response = await connection.raw('select DISTINCT (theaters.name) as name, theaters.address_line_1, theaters.address_line_2, theaters.city, '
        +'theaters.state, theaters.zip from movies_theaters inner join theaters on movies_theaters.theater_id = theaters.theater_id '
        +'where movies_theaters.is_showing IS TRUE');

        const finalResponse = [];
        if(response.rows){
            for (let index = 0; index < response.rows.length; index++) {
                finalResponse.push({...response.rows[index], movies: movies.rows});
            }
        }else{
            for (let index = 0; index < response.length; index++) {
                finalResponse.push({...response[index], movies});
            }
        }
        
        return res.status(200).send({data: finalResponse});
    }catch(e){
        console.log(e)
        return res.status(500).send({error: e});
    }
}
module.exports = {
    list
}