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
export declare class PortfolioRebalance {
    getInstruments(symbolList: string[]): Promise<IInstrument[]>;
    getRebalance(holdings: IAllocation[], modelPortfolio: IAllocation[]): IAllocation[];
}
