const yahooFinance = require("yahoo-finance");

export interface IInstrument {
  symbol: string;
  name: string;
  price: number;
  currency: string;
}

export interface IAllocation {
  quantity?: number;
  weight?: number;
  IInstrument?: IInstrument;
}

export interface ISnapshot {
  symbol: string;
  name: string;
  lastTradePriceOnly: string;
}

export class PortfolioRebalance {

  public getInstruments(symbolList: string[]): Promise<any> {
    console.log("Getting instruments from Yahoo...");



    return yahooFinance.snapshot({
      fields: ["s", "n", "l1"],
      symbols: symbolList,
    }).then((snapshot: ISnapshot[]) => {
      console.log("Snapshot: " + JSON.stringify(snapshot));
      return snapshot.map((i) => {
        return {
          currency: "USD",
          name: i.name,
          price: parseFloat(i.lastTradePriceOnly),
          symbol: i.symbol,
        } as IInstrument;
      });
    });
  }

  public getRebalance(holdings: IAllocation[], modelPortfolio: IAllocation[]): IAllocation[] {
    console.log("Getting instruments from Yahoo...");

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
