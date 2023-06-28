const connection = require("../db/connection");

async function list(req, res){

    try{
        const movies = await connection('movies')
            .leftJoin('movies_theaters', 'movies.movie_id','movies_theaters.movie_id')
            .where('movies_theaters.is_showing', true)
            .groupBy('movies.movie_id')
            .orderBy('movies.movie_id');
        
        const response = await connection('theaters')
            .innerJoin('movies_theaters', 'theaters.theater_id','movies_theaters.theater_id')
            .where('movies_theaters.is_showing', true)
            .groupBy('theaters.theater_id')
            .orderBy('theaters.theater_id');

        const finalResponse = [];
        for (let index = 0; index < response.length; index++) {
            finalResponse.push({...response[index], movies});
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