package com.vampz.stocksprout.domain.holdingMVC;

import com.vampz.stocksprout.domain.marketDataService.marketDataService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class HoldingService {
    private final HoldingRepository holdingRepository;
    private final marketDataService marketDataService;


    public HoldingService(HoldingRepository holdingRepository, marketDataService marketDataService) {
        this.holdingRepository = holdingRepository;
        this.marketDataService = marketDataService;
    }

    public Holding getHoldingById(Long id) {
        return holdingRepository.findById(id).orElseThrow();
    }

    public Holding saveHolding(Holding holding) {
        return holdingRepository.save(holding);
    }

    public void refresh(Holding holding) {
       double price = marketDataService.getCurrentStockPrice(holding.getSymbol()).getPrice();
       holding.setCurrentPrice(BigDecimal.valueOf(price).setScale(2, RoundingMode.HALF_UP));
       holdingRepository.save(holding);
    }
}
