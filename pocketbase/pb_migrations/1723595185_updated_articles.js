/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdpvhcea4wwpovh")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_NrrxFcW` ON `articles` (`activity`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8vegla4f",
    "name": "main_keyword",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "x6l0779009cmrpm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdpvhcea4wwpovh")

  collection.indexes = []

  // remove
  collection.schema.removeField("8vegla4f")

  return dao.saveCollection(collection)
})
