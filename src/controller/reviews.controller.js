const connection = require("../db/connection");

async function put(req, res){
    
    const {reviewId} = req.params;
    const {data} = req.body;
    try{
        let response;
        const finalResponse = [];

        if(!data){ 
            return res.status(404).send({error: "cannot be found"});
        }else{

            await connection('reviews').where('review_id', reviewId).update(data);

            response = await connection('reviews').where('review_id', reviewId)
                .select('created_at', 'updated_at','content', 'critic_id', 'movie_id', 'review_id', 'score')
                .distinct('movie_id');

                const critic = await connection('critics')
                    .select('critics.preferred_name', 'critics.surname', 'critics.organization_name')
                    .innerJoin('reviews', 'reviews.critic_id','critics.critic_id')
                    .distinct('critics.critic_id')
            for (let index = 0; index < response.length; index++) {
                finalResponse.push({...response[index], critic: critic[0]});   
            }
        }    

        return res.status(200).send({data: finalResponse[0]});
        
    }catch(e){
        console.log(e);
        return res.status(500).send({error: e});
    }
}

async function destroy(req, res){
    
    const {reviewId} = req.params;
   
    try{
        
        const found = await connection('reviews').where('review_id', reviewId)

        if(found.length == 0) return res.status(404).send({error: "id not found"});

        const response = await connection('reviews').where('review_id', reviewId).del();

        return res.status(204).send({data: "deleted succesfully"});
        
        
    }catch(e){
        return res.status(500).send({error: e});
    }
}

module.exports = {
    put,
    destroy
}