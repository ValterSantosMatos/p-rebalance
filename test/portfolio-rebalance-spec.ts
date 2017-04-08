import * as chai from "chai";

import { IAllocation, IInstrument, PortfolioRebalance } from "../src/portfolio-rebalance";

describe("Portfolio rebalance module", () => {
  const appleInstrument = {
    currency: "USD",
    name: "Apple Inc.",
    price: 143.34,
    symbol: "AAPL",
  } as IInstrument;
  const googleInstrument = {
    currency: "USD",
    name: "Alphabet Inc.",
    price: 842.10,
    symbol: "GOOGL",
  } as IInstrument;

  describe("getInstrument()", () => {
    (it as any)("should get the instrument with price from a symbol", () => {
      // Apple stock symbol

      return PortfolioRebalance.getInstrument(appleInstrument.symbol)
        .then((instrument: IInstrument) => {
          // Confirms we received the apple stock
          chai.expect(instrument.symbol).to.equal(appleInstrument.symbol);
          chai.expect(instrument.name).to.equal(appleInstrument.name);
          chai.expect(instrument.currency).to.equal(appleInstrument.currency);
          chai.expect(instrument.price).to.not.equal(undefined);
        });
      // Increase the timeout since we are making an API call
    }).timeout(5000);

    (it as any)("should return an empty instrument if it fails", () => {
      const symbol = ".";

      return PortfolioRebalance.getInstrument(symbol)
        .then((instrument: IInstrument) => {
          // Confirms we received the apple stock
          chai.expect(instrument).to.be.equal(undefined);
        });
      // Increase the timeout since we are making an API call
    }).timeout(5000);
  });

  describe("rebalance()", () => {

    it("should return an empty portfolio if no market value is provided", () => {
      const portfolio = [
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.2 },
        { instrument: appleInstrument, weight: 0.8 }];

      const rebalancePortfolio = PortfolioRebalance.rebalance(portfolio, 0);
      chai.expect(rebalancePortfolio).to.be.deep.equal([]);
    });

    it("should return an empty portfolio if allocations weights are bigger than 1", () => {
      const portfolio = [
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.1 },
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.2 },
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.8 }];

      const rebalancePortfolio = PortfolioRebalance.rebalance(portfolio, 100);
      chai.expect(rebalancePortfolio).to.be.deep.equal([]);
    });

    it("should return an empty portfolio if any allocation weights are bigger than 1", () => {
      const portfolio = [
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 1.2 },
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.2 },
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.8 }];

      const rebalancePortfolio = PortfolioRebalance.rebalance(portfolio, 100);
      chai.expect(rebalancePortfolio).to.be.deep.equal([]);
    });

    it("should return an empty portfolio if any allocation weights are smaller than 0", () => {
      const portfolio = [
        { instrument: PortfolioRebalance.usdCashInstrument, weight: -0.2 },
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.2 },
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 1 }];

      const rebalancePortfolio = PortfolioRebalance.rebalance(portfolio, 100);
      chai.expect(rebalancePortfolio).to.be.deep.equal([]);
    });

    it("should return an empty portfolio if there are duplicate instruments", () => {
      const portfolio = [
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.5 },
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.5 }];

      const rebalancePortfolio = PortfolioRebalance.rebalance(portfolio, 100);
      chai.expect(rebalancePortfolio).to.be.deep.equal([]);
    });

    it("should create an empty portfolio if there are duplicate instruments", () => {
      const portfolio = [
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.5 },
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.5 }];

      const rebalancePortfolio = PortfolioRebalance.rebalance(portfolio, 100);
      chai.expect(rebalancePortfolio).to.be.deep.equal([]);
    });

    it("should add the cash instrument to a portfolio with remaining cash", () => {
      const portfolio = [
        { instrument: appleInstrument, weight: 0.5 },
        { instrument: googleInstrument, weight: 0.5 }];

      const rebalancePortfolio = PortfolioRebalance.rebalance(portfolio, 5000);
      chai.expect(rebalancePortfolio.length).to.be.equal(3);
    });

    it("should rebalance a portfolio :)", () => {
      const portfolio = [
        { instrument: PortfolioRebalance.usdCashInstrument, weight: 0.2 },
        { instrument: appleInstrument, weight: 0.3 },
        { instrument: googleInstrument, weight: 0.5 }];

      const rebalancePortfolio = PortfolioRebalance.rebalance(portfolio, 500000);
      chai.expect(rebalancePortfolio[0].weight).to.be.equal(0.20160952000000001);
      chai.expect(rebalancePortfolio[1].weight).to.be.equal(0.29986728);
      chai.expect(rebalancePortfolio[2].weight).to.be.equal(0.4985232);
    });
  });
});
