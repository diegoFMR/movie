const connection = require("../db/connection");

async function list(req, res){
    
    const {is_showing} = req.query;
    try{
        let response;
        if(is_showing){
            response = await connection('movies_theaters').where('is_showing', true).groupBy('movie_id').orderBy('movie_id');
        }else{
            response = await connection('movies');
        }
        return res.status(200).send({data: response});
    }catch(e){
        return res.status(500).send({error: e});
    }
}

async function read(req, res){
    
    const {movieId} = req.params;
    try{
        const response = await connection('movies').where('movie_id', movieId);

        if(response.length > 0){   
           return res.status(200).send({data: response[0]});    
        }else{
           return res.status(404).send({error: ""});
        }
        
    }catch(e){
        return res.status(500).send({error: e});
    }
}

async function getTheathersByMovie(req, res){
    
    const {movieId} = req.params;
    try{
        const response = await connection.raw('select theaters.name from movies_theaters inner join theaters on theaters.theater_id = movies_theaters.theater_id where movies_theaters.movie_id='+movieId);
        if(response.length > 0){   
           return res.status(200).send({data: response});    
        }else{
           return res.status(404).send({error: "en el ese"});
        }
        
    }catch(e){
        return res.status(500).send({error: e});
    }
}

async function getReviewsByMovie(req, res){
    
    const {movieId} = req.params;
    try{
        const response = await connection
        .raw("select reviews.* from reviews inner join movies on movies.movie_id = reviews.movie_id where reviews.movie_id="+movieId);
        const finalResponse = [];
        for (let index = 0; index < response.length; index++) {
            finalResponse.push({...response[index], critic: { preferred_name: "string", surname: "String", organization_name: "string"  }});
            
        }

        if(response.length > 0){   
           return res.status(200).send({data: finalResponse});    
        }else{
           return res.status(404).send({error: "en el ese"});
        }
        
    }catch(e){
        console.log(e)
        return res.status(500).send({error: e});
    }
}

async function notInclude(req,res){
    return res.status(404).send({error: "error"});
}

module.exports = {
    list,
    read,
    getTheathersByMovie,
    getReviewsByMovie,
    notInclude
}