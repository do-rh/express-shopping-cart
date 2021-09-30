/** Routes for shopping cart app. */

const express = require("express");
const { BadRequestError } = require("./expressError");

const db = require("./fakeDb");
const router = new express.Router();
const middleware = require("./middleware");
const app = express();

/** GET /items: get list of items */
router.get("/", function (req, res, next) {
  return res.json({ items: db.items });
});

/** POST /items: add item to list */
router.post("/", function (req, res, next) {
  let newItem = req.body; //json of new item
  db.items.push(newItem);
  return res.json({ added: newItem });
});

router.use(middleware.isInCart);

/** GET /items/:name get single item from list */
router.get("/:name", function (req, res, next) {
  const itemName = req.params.name;
  const itemInList = db.items.find((item) => item.name === itemName);
  return res.json({ items: itemInList });
});

/** PATCH /items/:name update a single item from list, return {updated: Updated Item} */
router.patch("/:name", function (req, res, next) {
  const item = req.body;
  const itemName = req.body.name;
  const itemIndex = db.items.findIndex((item) => item.name === itemName);
  db.items[itemIndex] = item;
  return res.json({ updated: item });
});

/** DELETE /items/:name delete an item from the list, return {message: Deleted} */
router.delete("/:name", function (req, res, next) {
  const itemName = req.body.name;
  db.items = db.items.filter((item) => item.name !== itemName);
  return res.json({ message: "Deleted" });
});

module.exports = router;
