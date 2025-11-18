package com.vampz.stocksprout.domain.marketDataService;
import com.vampz.stocksprout.domain.marketDataService.StockCurrentDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    @RequestMapping(path = "/StockPriceHistory")
    public List<StockHistDTO> getStockPriceHistory(@RequestParam String symbol) {
        List<StockHistDTO> response = marketDataService.getStockPriceHistory(symbol);
        System.out.println(response.toString());
        return response;

    }


}