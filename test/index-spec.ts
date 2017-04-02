
import index = require("../src/index");
import * as chai from "chai";

const expect = chai.expect;

describe("index", () => {
  it("should provide Greeter", () => {
    // tslint:disable-next-line:no-unused-expression
    expect(index.PortfolioRebalance).to.not.be.undefined;
  });
});
