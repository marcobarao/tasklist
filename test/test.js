const chai = require("chai");
const request = require("request");
const config = require("config");

const expect = chai.expect;
const should = chai.should();

global.domain = `http://${config.HOST}:${config.PORT}`;

describe("---Testing the task list api---", () => {
  it("GET: Task list", done => {
    const options = {
      url: `${domain}/tasks`,
      headers: {
        "Content-Type": "application/json"
      },
      json: {
        task: "Hello world"
      }
    };
    request.post(options, (error, response, body) => {
      response.statusCode.should.equal(200);
      expect(body).to.be.a("array");
      expect(body).to.include(options.json.task);
      done();
    });
  });
});
