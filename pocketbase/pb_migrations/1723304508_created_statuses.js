/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "09v0ttdq5azstx3",
    "created": "2024-08-10 15:41:48.209Z",
    "updated": "2024-08-10 15:41:48.209Z",
    "name": "statuses",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "v7kqy8n1",
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
  const collection = dao.findCollectionByNameOrId("09v0ttdq5azstx3");

  return dao.deleteCollection(collection);
})
