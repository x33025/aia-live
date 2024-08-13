/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mn8h4v3h96v1isf",
    "created": "2024-08-10 15:44:42.616Z",
    "updated": "2024-08-10 15:44:42.616Z",
    "name": "role",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "63hvdwsk",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mn8h4v3h96v1isf");

  return dao.deleteCollection(collection);
})
