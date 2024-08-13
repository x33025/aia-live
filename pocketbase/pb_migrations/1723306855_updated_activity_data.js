/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kukv2u6xy6xi50y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mliubbkt",
    "name": "deleted",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kukv2u6xy6xi50y")

  // remove
  collection.schema.removeField("mliubbkt")

  return dao.saveCollection(collection)
})
