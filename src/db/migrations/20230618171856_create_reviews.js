
exports.up = function(knex) {
    return knex.schema.createTable('reviews', function(table){
        table.increments('review_id');
        table.text('content');
        table.integer('score');
        table.integer('movie_id').unsigned();
        table.integer('critic_id').unsigned();
        table.foreign('movie_id').references('movies.movie_id');
        table.foreign('critic_id').references('critics.critic_id');

        table.timestamps(true, true);
      } ) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('reviews')
};
