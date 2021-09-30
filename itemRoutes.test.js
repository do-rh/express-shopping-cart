const request = require("supertest");
// NOTE: DOCS call it request not supertest

const app = require("./app");
let db = require("./fakeDb");
// const router = new express.Router();

// const test1 = { name: "cheerioz", price: 22.22 };
// const test2 = { name: "popsicle", price: 2222 };

const testItems = [
  { name: "cheerioz", price: 22.22 },
  { name: "popsicle", price: 2222 },
];

beforeEach(function () {
  db.items.push(...testItems);
});

afterEach(function () {
  db.items = [];
});

describe("GET / items", function () {
  it("Get list of items", async function () {
    const resp = await request(app).get(`/items`);
    // NOTE: request(app) from supertest

    expect(resp.body).toEqual({ items: testItems });
  });
});

describe("POST / items", function () {
  it("Create a item", async function () {
    const resp = await request(app).post(`/items`).send({
      name: "banana",
      price: 12,
    });
    // NOTE: request(app) from supertest

    expect(resp.statusCode).toEqual(201);
    expect(db.items.length).toEqual(3);
  });
});

describe("GET / items/:name", function () {
  it("Get specific item", async function () {
    const resp = await request(app).get(`/items/popsicle`);
    // NOTE: request(app) from supertest

    expect(resp.body).toEqual({ items: testItems[1] });
  });
});

describe("PATCH / items/:name", function () {
  it("Update an individual item in list", async function () {
    const resp = await request(app)
      .patch(`/items/${testItems[1].name}`)
      .send({ name: "popsicle", price: 12 });
    // NOTE: request(app) from supertest

    expect(resp.body).toEqual({ updated: { name: "popsicle", price: 12 } });
  });

  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

describe("DELETE / items/:name", function () {
  it("Delete a specific item in list", async function () {
    const resp = await request(app).delete(`/items/${testItems[1].name}`);
    // NOTE: request(app) from supertest

    expect(resp.body).toEqual({ message: "Deleted" });
    console.log("db.items", db.items);
    expect(db.items.length).toEqual(1);
  });
});
