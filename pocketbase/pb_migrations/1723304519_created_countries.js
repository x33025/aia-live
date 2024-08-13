/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6kk6lnenjyu735g",
    "created": "2024-08-10 15:41:59.260Z",
    "updated": "2024-08-10 15:41:59.260Z",
    "name": "countries",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fzglcknb",
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
  const collection = dao.findCollectionByNameOrId("6kk6lnenjyu735g");

  return dao.deleteCollection(collection);
})
