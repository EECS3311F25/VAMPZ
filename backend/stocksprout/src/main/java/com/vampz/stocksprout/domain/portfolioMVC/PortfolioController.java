package com.vampz.stocksprout.domain.portfolioMVC;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/portfolio")
@AllArgsConstructor
public class PortfolioController{
    private final PortfolioService portfolioService;

    @GetMapping("/owner/{ownerId}")
    public Optional<Portfolio> findbyOwnerID(@PathVariable Long ownerId){
        return portfolioService.getPortfolioByOwnerID(ownerId);
    }

}
