package com.vampz.stocksprout.domain.portfolioMVC;

import com.vampz.stocksprout.domain.portfolioMVC.Portfolio;
import com.vampz.stocksprout.domain.portfolioMVC.PortfolioRepository;
import com.vampz.stocksprout.appuser.UserRepository;
import com.vampz.stocksprout.appuser.AppUser;
import lombok.AllArgsConstructor;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;


    public Optional<Portfolio> getPortfolioByOwnerID(Long ownerID){
        return portfolioRepository.findByOwnerId(ownerID);
    }


}
