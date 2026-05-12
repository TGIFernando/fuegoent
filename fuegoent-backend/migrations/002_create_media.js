exports.up = function (knex) {
  return knex.schema.createTable('media', (t) => {
    t.increments('id').primary();
    t.string('title').notNullable();
    t.text('description').defaultTo('');
    t.string('filename').notNullable();   // e.g. archive-1.jpg
    t.string('filepath').notNullable();   // e.g. /images/archive/archive-1.jpg
    t.string('mimetype').defaultTo('image/jpeg');
    // archive | collections | deseo | traviesa | events | products | hero
    t.string('category').notNullable();
    t.decimal('price', 8, 2).nullable();  // null means not for sale
    t.date('event_date').nullable();
    t.string('tags').defaultTo('');       // comma-separated
    t.boolean('is_active').notNullable().defaultTo(true);
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('media');
};
