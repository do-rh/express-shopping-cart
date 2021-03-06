/** Example middleware. */

const { BadRequestError } = require("./expressError");
const db = require("./fakeDb");

/** Logger: prints log message and goes to next. */

function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}
// end logger

/** Check that name param must be Elie or raise Unauth. */

function isInCart(req, res, next) {
    const itemName = req.params.name || req.body.name;
    const itemIndex = db.items.findIndex((item) => item.name === itemName);
    console.log('itemIndex: ', itemIndex, 'itemName: ', itemName);
    if (itemIndex === -1) {
        throw new BadRequestError("Item does not exist in shopping cart");
    };
    next();
}

module.exports = { logger, isInCart };
