"use strict";
exports.__esModule = true;
var yahooFinance = require("yahoo-finance");
var PortfolioRebalance = (function () {
    function PortfolioRebalance() {
    }
    PortfolioRebalance.prototype.getInstruments = function (symbolList) {
        console.log("Getting instruments from Yahoo...");
        return new Promise(function (resolve, reject) {
            yahooFinance.snapshot({
                fields: ["s", "n", "l1"],
                symbols: symbolList
            }, function (err, snapshot) {
                if (err !== undefined) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log("Snapshot: " + JSON.stringify(snapshot));
                var instruments = snapshot.map(function (i) {
                    return {
                        currency: "USD",
                        name: i.name,
                        price: parseFloat(i.lastTradePriceOnly),
                        symbol: i.symbol
                    };
                });
                resolve(instruments);
            });
        });
    };
    PortfolioRebalance.prototype.getRebalance = function (holdings, modelPortfolio) {
        console.log("Getting instruments from Yahoo...");
        return [{}];
    };
    return PortfolioRebalance;
}());
exports.PortfolioRebalance = PortfolioRebalance;
