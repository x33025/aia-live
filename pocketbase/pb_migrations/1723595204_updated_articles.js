/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdpvhcea4wwpovh")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_NrrxFcW` ON `articles` (`activity`)",
    "CREATE UNIQUE INDEX `idx_gGaX6k1` ON `articles` (`main_keyword`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdpvhcea4wwpovh")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_NrrxFcW` ON `articles` (`activity`)"
  ]

  return dao.saveCollection(collection)
})
