package com.vampz.stocksprout.domain.portfolioMVC;

import com.vampz.stocksprout.appuser.AppUser;
import com.vampz.stocksprout.domain.holdingMVC.Holding;
import com.vampz.stocksprout.domain.holdingMVC.HoldingService;
import com.vampz.stocksprout.domain.watchMVC.WatchItem;
import com.vampz.stocksprout.domain.watchMVC.WatchItemService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final HoldingService holdingService;
    private final WatchItemService watchItemService;


    public PortfolioService(PortfolioRepository portfolioRepository, HoldingService holdingService, WatchItemService watchItemService) {
        this.portfolioRepository = portfolioRepository;
        this.holdingService = holdingService;
        this.watchItemService = watchItemService;
    }

    public Portfolio getPortfolioById(Long id) {
        return portfolioRepository.findById(id).orElseThrow();
    }

    public Portfolio newDefaultPortfolio(AppUser owner) {
        Portfolio portfolio = new Portfolio(owner);
        return portfolioRepository.save(portfolio);
    }


    public void refresh(Portfolio portolio) {

        BigDecimal invested = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        BigDecimal stockValue = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        for (Holding holding : portolio.getHoldings()) {
            holdingService.refresh(holding);
            invested = invested.add(holding.getAvgBuyPrice().setScale(2, RoundingMode.HALF_UP).multiply(
                    BigDecimal.valueOf(holding.getQuantity()).setScale(2, RoundingMode.HALF_UP)
            )).setScale(2, RoundingMode.HALF_UP);
            stockValue = stockValue.add(holding.getCurrentPrice().setScale(2, RoundingMode.HALF_UP).multiply(
                    BigDecimal.valueOf(holding.getQuantity()).setScale(2, RoundingMode.HALF_UP)).setScale(2, RoundingMode.HALF_UP));
        }


        for(WatchItem watchItem : portolio.getWatchList()){
            watchItemService.refresh(watchItem);
        }


        portolio.setInvested(invested);
        portolio.setStockValue(stockValue);
        portfolioRepository.save(portolio);
    }

    public void save(Portfolio portfolio) {
        portfolioRepository.save(portfolio);
    }
}
