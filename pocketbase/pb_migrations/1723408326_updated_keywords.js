/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6l0779009cmrpm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "noezsydo",
    "name": "country",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6kk6lnenjyu735g",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6l0779009cmrpm")

  // remove
  collection.schema.removeField("noezsydo")

  return dao.saveCollection(collection)
})
