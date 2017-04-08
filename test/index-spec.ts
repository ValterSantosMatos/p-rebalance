
import index = require("../src/index");
import * as chai from "chai";

describe("index", () => {
  it("should provide PortfolioRebalance", () => {
    chai.expect(index.PortfolioRebalance).to.not.equal(undefined);
  });
});
