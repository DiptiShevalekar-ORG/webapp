require("dotenv").config();
const supertest = require("supertest");
const testData = require("../tests/testData");
const app = require("../server");

const expressWinston = require('express-winston')
const { transports, format } = require('winston')


const logger = require('../weappLogs')
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

const request = supertest(app);

describe("User API Integration Tests", () => {
  it("healthz-connection Success", async () => {
    await request.get("/healthz").expect(200);
  });
});

describe("User API Integration Tests", () => {
  it("Post - User Create", async () => {
    console.log("Reached Here");
    await request.post("/v1/user").send(testData.userData).expect(201);
    //     const token = Buffer.from(
    //       `${testData.userData.UserName}:${testData.userData.Password}`
    //     ).toString("base64");
    //     console.log("This is token  : " + token);

    await request
      .get("/v1/user/self")
      .set(
        `Authorization`,
        `Basic ${Buffer.from(
          `${testData.userData.UserName}:${testData.userData.Password}`
        ).toString("base64")}`
      )
      .expect(200);
    console.log("Response username ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; ");
  });
});

describe("Put - Update USer", () => {
  it("Put - User Update", async () => {
    console.log("Reached in put");
    await request
      .put("/v1/user/self")
      .set(
        `Authorization`,
        `Basic ${Buffer.from(
          `${testData.userData.UserName}:${testData.userData.Password}`
        ).toString("base64")}`
      )
      .send(testData.updateUserData)
      .expect(204);

    request
      .get("/v1/user/self")
      .set(
        `Authorization`,
        `Basic ${Buffer.from(
          `${testData.userData.UserName}:${testData.userData.Password}`
        ).toString("base64")}`
      )
      .expect(200);

    console.log("entered in last get");
  });
});
