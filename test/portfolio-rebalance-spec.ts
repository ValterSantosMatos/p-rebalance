
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;

import { PortfolioRebalance } from "../src/portfolio-rebalance";

describe("Portfolio rebalance module", () => {
  it("should get the instruments from a list of symbols", () => {
    const pr = new PortfolioRebalance();
    const symbols = ["AAPL", "GOOGL"];

    return pr.getInstruments(symbols).then((asd) => {
      console.log(asd)
      expect(asd[0]).to.equal("asd");
    });

    // expect(pr.getInstruments(symbols)).to.eventually.have.length(2);
    // expect(pr.getInstruments(symbols)).to.eventually.have.deep.property("[0].symbol", "AAPL");
    // expect(pr.getInstruments(symbols)).to.eventually.have.deep.property("[0].name", "Apple Inc.");
    // expect(pr.getInstruments(symbols)).to.eventually.have.deep.property("[0].currency", "USD");
    // expect(pr.getInstruments(symbols)).to.eventually.have.deep.property("[1].symbol", "GOOGL");
    // expect(pr.getInstruments(symbols)).to.eventually.have.deep.property("[1].name", "Alphabet Inc.");
    // expect(pr.getInstruments(symbols)).to.eventually.have.deep.property("[1].currency", "USD");
  });
});
