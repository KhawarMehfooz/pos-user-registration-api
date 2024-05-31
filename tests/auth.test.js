const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../index"); // Import app without starting server
const User = require("../models/User");

let mongoServer;
let server;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

   if (mongoose.connection.readyState === 0) {
     await mongoose.connect(uri);
   }
  server = app.listen(3000); // Start the server for tests
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close(); // Close the server after tests
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Auth API", () => {
  it("should register a user successfully", async () => {
    const res = await request(app).post("/user/register").send({
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  it("should login a user successfully", async () => {
    await request(app).post("/user/register").send({
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const res = await request(app).post("/user/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should validate a token successfully", async () => {
    await request(app).post("/user/register").send({
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const loginRes = await request(app).post("/user/login").send({
      email: "john@example.com",
      password: "password123",
    });

    const token = loginRes.body.token;

    const validateRes = await request(app)
      .post("/user/validate")
      .set("Authorization", `Bearer ${token}`);

    expect(validateRes.statusCode).toEqual(200);
    expect(validateRes.body).toHaveProperty("message", "Valid Token");
  });
});
