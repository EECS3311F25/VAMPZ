package com.vampz.stocksprout.domain.holdingMVC;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HoldingRepository extends JpaRepository<Holding, Long> {
        List<Holding> findByPortfolioId(Long portfolioId);
        Holding findByPortfolioIdAndSymbol(Long portfolioId, String symbol);
        

}
