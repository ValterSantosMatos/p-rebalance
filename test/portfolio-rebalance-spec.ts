import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;

import { IInstrument, PortfolioRebalance } from "../src/portfolio-rebalance";

describe("Portfolio rebalance module", () => {
  (it as any)("getInstruments() should get the instruments with prices from a list of symbols", () => {
    const pr = new PortfolioRebalance();
    const symbols = ["AAPL"];

    return pr.getInstruments(symbols)
      .then((instruments: IInstrument[]) => {
        // Confirm the apple stock
        expect(instruments[0].symbol).to.equal("AAPL");
        expect(instruments[0].name).to.equal("Apple Inc.");
        expect(instruments[0].currency).to.equal("USD");
        // tslint:disable-next-line:no-unused-expression
        expect(instruments[0].price).to.not.be.undefined;
      });
    // Increase the timeout since we are making an API call
  }).timeout(5000);

  (it as any)("getInstruments() should get the instruments with prices from a list of symbols", () => {
    const pr = new PortfolioRebalance();
    const symbols = ["AAPL"];

    // Increase the timeout since we are making an API call
    return pr.getInstruments(symbols)
      .then((instruments: IInstrument[]) => {
        // Confirm the apple stock
        expect(instruments[0].symbol).to.equal("AAPL");
        expect(instruments[0].name).to.equal("Apple Inc.");
        expect(instruments[0].currency).to.equal("USD");
        // tslint:disable-next-line:no-unused-expression
        expect(instruments[0].price).to.not.be.undefined;
      });
  }).timeout(5000);
});
