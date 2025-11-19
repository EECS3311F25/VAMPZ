package com.vampz.stocksprout.domain.portfolioMVC;

import com.vampz.stocksprout.domain.portfolioMVC.PortfolioRepository;

import lombok.AllArgsConstructor;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;

    public Optional<Portfolio> getPortfolioByOwnerID(Long ownerID){
        return portfolioRepository.findByOwnerId(ownerID);
    }
}
