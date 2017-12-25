# Migrations
Helpful knex commands
```bash
# Make migration file
knex migrate:make shows
# Rollback to previous migration
knex migrate:rollback
# Run latest migrations
knex migrate:latest
# Run seed files (refer knexfile.js to see reference of seed file location)
knex seed:run
```
# Tips
Refer file `db/queries` for helpful query builder with Mongoose type syntax (repeat writing knex queries)

# TODO
Create associations join table query
Optional: come up with an easier query to join associations (or don't)
