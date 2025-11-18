package com.vampz.stocksprout.domain.portfolioMVC;

import com.vampz.stocksprout.appuser.AppUser;
import com.vampz.stocksprout.domain.holdingMVC.Holding;
import com.vampz.stocksprout.domain.holdingMVC.HoldingService;
import org.springframework.stereotype.Service;
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
}
