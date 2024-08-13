/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdpvhcea4wwpovh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jwskjxox",
    "name": "category",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tpbgu39cwdoujig",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6wrgo7hc",
    "name": "status",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "09v0ttdq5azstx3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aogrj73t",
    "name": "website",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "140gf7sjf1talqe",
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

  // remove
  collection.schema.removeField("jwskjxox")

  // remove
  collection.schema.removeField("6wrgo7hc")

  // remove
  collection.schema.removeField("aogrj73t")

  return dao.saveCollection(collection)
})
