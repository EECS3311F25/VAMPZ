package com.vampz.stocksprout.domain.marketDataService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/marketData")
public class marketDataController {

    private final marketDataService marketDataService;

    public marketDataController(marketDataService marketDataService) {
        this.marketDataService = marketDataService;
    }

    @GetMapping
    @RequestMapping(path = "/currentStockPrice")
    public StockCurrentDTO getCurrentStockPrice(@RequestParam String symbol) {
        StockCurrentDTO response = marketDataService.getCurrentStockPrice(symbol);
        System.out.println(response.toString());
        return response;

    }


}