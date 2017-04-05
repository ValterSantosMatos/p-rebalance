const yahooFinance = require("yahoo-finance");

export interface IInstrument {
  symbol: string;
  name?: string;
  price?: number;
  currency?: string;
}

export interface IAllocation {
  quantity?: number;
  weight?: number;
  instrument: IInstrument;
}

export interface ISnapshot {
  symbol: string;
  name: string;
  lastTradePriceOnly: string;
}

export class PortfolioRebalance {

  public fillInstruments(allocations: IAllocation[]): Promise<any> {
    console.log("Getting instruments from Yahoo...");

    const symbols = allocations
      .map((a) => a.instrument.symbol);

    return yahooFinance.snapshot({
      fields: ["s", "n", "l1"],
      symbols,
    }).then((snapshots: ISnapshot[]) => {
      console.log("Snapshot: " + JSON.stringify(snapshots));

      return allocations
        .forEach((a) => {
          // Get the correspondent snapshot
          const snapshot = snapshots.filter((s) => s.symbol === a.instrument.symbol);
          if (snapshot.length === 0) {
            // It should never happen
            console.log("Symbol miss match for: " + a.instrument.symbol);
            return;
          }

          // Fill the instruments with the missing values
          a.instrument.currency = "USD";
          a.instrument.name = snapshot[0].name;
          a.instrument.price = parseFloat(snapshot[0].lastTradePriceOnly);
        });
    });
  }

  public calculatePortfolioWeight(allocations: IAllocation[]) {
    console.log("Calculating the allocations weight from the allocations " + JSON.stringify(allocations));

    // Calculates the portfolio market value
    const pMarketValue = allocations
      .map((a) => a.instrument.price * a.quantity)
      .reduce((a, b) => a + b, 0);

    // Calculates the allocations weight
    const allocationsWithWeight = allocations
      .forEach((a) => a.weight = a.instrument.price * a.quantity / pMarketValue);

    return allocations;
  }

  public getRebalance(holdings: IAllocation[], modelPortfolio: IAllocation[]): IAllocation[] {
    // Fill the instruments from the current holdings
    this.fillInstruments(holdings);

    return [{}] as IInstrument[];
  }
}





    // return new Promise<IInstrument[]>((resolve, reject) => {
    //   console.log('err');

    //   return yahooFinance.snapshot({
    //     fields: ["s", "n", "l1"],
    //     symbols: symbolList,
    //   }, (err: Error, snapshot: ISnapshot[]) => {
    //     if (err !== undefined) {
    //       console.error(err);
    //       reject(err);
    //       return;
    //     }

    //     console.log("Snapshot: " + JSON.stringify(snapshot));
    //     const instruments = snapshot.map((i) => {
    //       return {
    //         currency: "USD",
    //         name: i.name,
    //         price: parseFloat(i.lastTradePriceOnly),
    //         symbol: i.symbol,
    //       } as IInstrument;
    //     });
    //     resolve(instruments);
    //   });
    // });
