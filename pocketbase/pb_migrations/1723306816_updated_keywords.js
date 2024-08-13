/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6l0779009cmrpm")

  // remove
  collection.schema.removeField("mtinoile")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6l0779009cmrpm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtinoile",
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
})
