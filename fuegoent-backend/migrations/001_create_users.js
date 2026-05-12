exports.up = function (knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('email').notNullable().unique();
    t.string('password_hash').notNullable();
    // guest | user | poweruser | manager | owner
    t.enum('permission_level', ['guest', 'user', 'poweruser', 'manager', 'owner'])
      .notNullable()
      .defaultTo('user');
    t.boolean('is_active').notNullable().defaultTo(true);
    t.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
