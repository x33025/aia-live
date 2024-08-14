/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mn8h4v3h96v1isf")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mn8h4v3h96v1isf")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
