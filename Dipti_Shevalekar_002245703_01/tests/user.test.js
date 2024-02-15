require('dotenv').config();
const supertest = require("supertest");
const testData = require("../tests/testData");
const app = require("../server");



const request = supertest(app);

describe("User API Integration Tests", () => {
  it("healthz-connection Success", (done) => {
    request
      .get("/healthz")
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        process.exit(1);
      });
    done();
  });
});

describe("User API Integration Tests", () => {
  it("Post - User Create", (done) => {
    console.log("Reached Here");
    request
      .post("/v1/user")
      .send(testData.userData)
      .expect(201)
      .end((err, response) => {
        if (err) {
          return done(err);
        }
      });
    done();

//     const token = Buffer.from(
//       `${testData.userData.UserName}:${testData.userData.Password}`
//     ).toString("base64");
//     console.log("This is token  : " + token);

    
    request
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
  it("Put - User Update", (done) => {
    console.log("Reached in put");
    request
      .put("/v1/user/self")
      .set(
        `Authorization`,
        `Basic ${Buffer.from(
          `${testData.userData.UserName}:${testData.userData.Password}`
        ).toString("base64")}`
      )
      .send(testData.updateUserData)
      .expect(204)
      .end((err, response) => {
        if (err) {
          return done(err);
        }
      });
    done();

    request
      .get("/v1/user/self")
      .set(
        `Authorization`,
        `Basic ${Buffer.from(
          `${testData.userData.UserName}:${testData.userData.Password}`
        ).toString("base64")}`
      )
      .expect(200);

      console.log("entered in last get")
 });
});





// it('Put - Update the User Data in MySQL DB', async () => {
//     const updateUserResponse = await chai.request(app)
//         .put(`/v1/user/self`)
//         .auth(testData.userData.UserName, testData.userData.Password)
//         .send({ /* updated user data */ });
//
//     expect(updateUserResponse).to.have.status(204);

//     console.log("Reached after post")
//    // const token = Buffer.from(`${testData.userData.UserName}:${testData.userData.Password}`).toString('base64');

//    console.log("this is th username " + testData.userData.UserName)

//     request
//     .get('/v1/user/self')
//     .set(`Authorization`, `Basic ${Buffer.from(`${testData.userData.UserName}:${testData.userData.Password}`).toString('base64')}`)
//     .expect(200)
//     .end((err, response) => {
//     if (err) return done(err);
//     console.log("Response body " + response.body);
//  process.exit(1);
//     // it('healthz-Connection Success', async () => {
//     //     const response = await chai.request(app)
//     //         .get('/healthz');

//         expect(response).to.have.status(200);
//         // expect(response.text).to.equal('OK');
//     });

// it('Post - User Create', async () => {
//     const createUserResponse = await chai.request(app)
//         .post('/v1/user')
//         .send(testData.userData);
//     expect(createUserResponse).to.have.status(201);
//     UserID = createUserResponse.body.UserName;
// });
//
// it('Get - Get User Data added to the MySQL DB', async () => {
//     const response = await chai.request(app)
//         .get(`/v1/user/self`)
//         .auth(testData.userData.UserName, testData.userData.Password);
//
//     expect(response).to.have.status(200);
//     //expect(response.body).to.have.property('id').to.equal(123); // Assuming user ID is 123
//     expect(response.body).to.have.property('UserName').to.equal(testData.userData.UserName);
//     expect(response.body).to.have.property('Password').to.equal(testData.userData.Password);
//     expect(response.body).to.have.property('FirstName').to.equal(testData.userData.FirstName);
//     expect(response.body).to.have.property('LastName').to.equal(testData.userData.LastName);
// });

//
// it('Put - Update the User Data in MySQL DB', async () => {
//     const updateUserResponse = await chai.request(app)
//         .put(`/v1/user/self`)
//         .auth(testData.userData.UserName, testData.userData.Password)
//         .send({ /* updated user data */ });
//
//     expect(updateUserResponse).to.have.status(204);
// //import fetch from "node-fetch";
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// //const expect = chai.expect;
// //const mysql = require('mysql2');
// const app = require('../server.js');

// //require("mysql2/node_modules/iconv-lite").encodingExists("foo");
// chai.should()
// chai.use(chaiHttp);

// describe('User API Integration Tests', () => {
//     let UserID;

//     it('healthz-connection Success', (done)=>{
//         chai.request(app).get("/healthz")
//             .end((err,response)=>{
//                 response.should.have.status(200);
//             done()
//     })
//     })