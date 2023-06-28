const connection = require("../db/connection");

async function put(req, res){
    
    const {reviewId} = req.params;
    const {data} = req.body;
    try{
      
        let response;
        const finalResponse = [];
        if(!data){ 
            response = await connection('reviews').where('review_id', reviewId).groupBy('movie_id').orderBy('movie_id');
        }else{
            response = await connection('reviews').where('review_id', reviewId).update(data);
            response = await connection('reviews').where('review_id', reviewId).groupBy('movie_id').orderBy('movie_id');
            const critic = await connection('critics')
                .innerJoin('reviews', 'reviews.critic_id','critics.critic_id')
                .groupBy('critics.critic_id')
                .orderBy('critics.critic_id');
            for (let index = 0; index < response.length; index++) {
                finalResponse.push({...response[index], critic: critic[0]});   
            }
        }    
        if(response.length > 0 ){
            return res.status(200).send({data: finalResponse[0]});
        }else{
            return res.status(404).send({error: "cannot be found"});
        }
        
    }catch(e){
        return res.status(500).send({error: e});
    }
}

async function destroy(req, res){
    
    const {reviewId} = req.params;
   
    try{
        
        const found = await connection('reviews').where('review_id', reviewId)

        if(found.length == 0) return res.status(404).send({error: "error"});

        const response = await connection('reviews').where('review_id', reviewId).del();

        return res.status(204).send({data: "nice"});
        
        
    }catch(e){
        return res.status(500).send({error: e});
    }
}

module.exports = {
    put,
    destroy
}