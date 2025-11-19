package com.vampz.stocksprout.domain.portfolioMVC;

import com.vampz.stocksprout.appuser.AppUser;
import com.vampz.stocksprout.domain.portfolioMVC.Portfolio;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
        Optional<Portfolio> findByOwnerId(Long ownerId);
}
