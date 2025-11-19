package com.vampz.stocksprout.domain.portfolioMVC;

import com.vampz.stocksprout.appuser.AppUser;
import com.vampz.stocksprout.domain.holdingMVC.Holding;
import com.vampz.stocksprout.domain.holdingMVC.HoldingService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final HoldingService holdingService;


    public PortfolioService(PortfolioRepository portfolioRepository, HoldingService holdingService) {
        this.portfolioRepository = portfolioRepository;
        this.holdingService = holdingService;
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
            invested = invested.add(holding.getBuyPrice().setScale(2, RoundingMode.HALF_UP).multiply(
                    BigDecimal.valueOf(holding.getQuantity()).setScale(2, RoundingMode.HALF_UP)
            )).setScale(2, RoundingMode.HALF_UP);
            stockValue = stockValue.add(holding.getCurrentPrice().setScale(2, RoundingMode.HALF_UP).multiply(
                    BigDecimal.valueOf(holding.getQuantity()).setScale(2, RoundingMode.HALF_UP)).setScale(2, RoundingMode.HALF_UP));
        }

        portolio.setInvested(invested);
        portolio.setStockValue(stockValue);
        portfolioRepository.save(portolio);
    }
}
