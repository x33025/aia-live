/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdpvhcea4wwpovh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1bzsous1",
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
  const collection = dao.findCollectionByNameOrId("qdpvhcea4wwpovh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1bzsous1",
    "name": "activity_data",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "kukv2u6xy6xi50y",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
