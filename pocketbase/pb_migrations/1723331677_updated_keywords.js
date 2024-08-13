/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6l0779009cmrpm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v1lae1se",
    "name": "activity",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "kukv2u6xy6xi50y",
      "cascadeDelete": true,
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
  collection.schema.removeField("v1lae1se")

  return dao.saveCollection(collection)
})
