/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "140gf7sjf1talqe",
    "created": "2024-08-10 16:22:07.226Z",
    "updated": "2024-08-10 16:22:07.226Z",
    "name": "websites",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9tf5tywt",
        "name": "url",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "fb2dw30q",
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
  const collection = dao.findCollectionByNameOrId("140gf7sjf1talqe");

  return dao.deleteCollection(collection);
})
