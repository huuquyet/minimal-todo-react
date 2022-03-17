import { Factory, hasMany, Model, RestSerializer, Server } from "miragejs";
import faker from "faker";
import seedrandom from "seedrandom";
import { nanoid } from "nanoid";

const IdSerializer = RestSerializer.extend({
  serializeIds: "always",
});

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.
let useSeededRNG = false;

let rng = seedrandom();

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem("randomTimestampSeed");
  let seedDate;

  if (randomSeedString) {
    seedDate = new Date(randomSeedString);
  } else {
    seedDate = new Date();
    randomSeedString = seedDate.toISOString();
    localStorage.setItem("randomTimestampSeed", randomSeedString);
  }

  rng = seedrandom(randomSeedString);
  faker.seed(seedDate.getTime());
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rng() * (max - min + 1)) + min;
}

const randomFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};

const todoTemplates = [
  { base: "Buy $THING", values: ["milk", "bread", "cheese", "toys"] },
  { base: "Clean $THING", values: ["house", "yard", "bedroom", "car"] },
  { base: "Read $THING", values: ["newspaper", "book", "email"] },
];

const generateTodoText = () => {
  const template = randomFromArray(todoTemplates);
  const value = randomFromArray(template.values);
  return template.base.replace("$THING", value);
};

new Server({
  routes() {
    this.namespace = "fakeApi";
    this.timing = 1000;

    this.resource("todos");
    this.resource("lists");

    const server = this;

    this.post("/todos", function () {
      const data = this.normalizedRequestAttrs();

      if (data.text === "error") {
        throw new Error("Could not save the todo!");
      }

      return server.create("todo", data);
    });
  },
  models: {
    todo: Model.extend({}),
    list: Model.extend({
      todos: hasMany(),
    }),
  },
  factories: {
    todo: Factory.extend({
      id() {
        return nanoid();
      },
      text() {
        return generateTodoText();
      },
      completed() {
        return false;
      },
      color() {
        return "";
      },
    }),
  },
  serializers: {
    todo: IdSerializer.extend({
      serialize(object, request) {
        return IdSerializer.prototype.serialize.apply(this, arguments);
      },
    }),
    list: IdSerializer,
  },
  seeds(server) {
    server.createList("todo", 5);
  },
});
