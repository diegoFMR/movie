
exports.up = function(knex) {

    return knex.schema.createTable('theaters', function(table){
        table.increments('theater_id');
        table.string('name');
        table.string('address_line_1');
        table.string('address_line_2');
        table.string('city');
        table.string('state');
        table.string('zip');
        table.timestamps(true, true);
      } )
      .createTable('movies', function(table){
        table.increments('movie_id');
        table.string('title');
        table.integer('runtime_in_minutes');
        table.string('rating');
        table.text('description');
        table.string('image_url');
      } ) 
      .createTable('movies_theaters', function(t) {
        t.integer('movie_id').unsigned();
        t.integer('theater_id').unsigned();
        t.boolean('is_showing');
        t.foreign('movie_id').references('movies.movie_id');
        t.foreign('theater_id').references('theaters.theater_id');
      });

};

exports.down = function(knex) {
    return knex.schema.dropTable('movies_theaters')
    .dropTable('movies')
    .dropTable('theaters');
};
