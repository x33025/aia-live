/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdpvhcea4wwpovh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qm9biyfq",
    "name": "keywords",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "x6l0779009cmrpm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdpvhcea4wwpovh")

  // remove
  collection.schema.removeField("qm9biyfq")

  return dao.saveCollection(collection)
})
