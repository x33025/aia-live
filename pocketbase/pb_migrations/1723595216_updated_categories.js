/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tpbgu39cwdoujig")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_YMqNypd` ON `categories` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tpbgu39cwdoujig")

  collection.indexes = []

  return dao.saveCollection(collection)
})
