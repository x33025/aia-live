/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6kk6lnenjyu735g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Pwjksop` ON `countries` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6kk6lnenjyu735g")

  collection.indexes = []

  return dao.saveCollection(collection)
})
