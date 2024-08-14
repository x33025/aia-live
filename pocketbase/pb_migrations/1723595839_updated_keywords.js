/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6l0779009cmrpm")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_wd9Tb9r` ON `keywords` (`keyword`)",
    "CREATE UNIQUE INDEX `idx_ySFglPY` ON `keywords` (`activity`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6l0779009cmrpm")

  collection.indexes = []

  return dao.saveCollection(collection)
})
