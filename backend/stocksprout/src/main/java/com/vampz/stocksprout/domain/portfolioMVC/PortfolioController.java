package com.vampz.stocksprout.domain.portfolioMVC;

import com.vampz.stocksprout.appuser.AppUser;
import com.vampz.stocksprout.appuser.UserRepository;
import com.vampz.stocksprout.domain.TransactionType;
import com.vampz.stocksprout.domain.holdingMVC.Holding;
import com.vampz.stocksprout.domain.holdingMVC.HoldingREQ;
import com.vampz.stocksprout.domain.holdingMVC.HoldingService;
import com.vampz.stocksprout.domain.marketDataService.marketDataService;
import com.vampz.stocksprout.domain.transactionMVC.Transaction;
import com.vampz.stocksprout.domain.transactionMVC.TransactionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final UserRepository userRepository;
    private final marketDataService marketDataService;
    private final HoldingService holdingService;
    private final TransactionService transactionService;

    public PortfolioController(PortfolioService portfolioService, UserRepository userRepository, marketDataService marketDataService, HoldingService holdingService, TransactionService transactionService) {
        this.portfolioService = portfolioService;
        this.userRepository = userRepository;
        this.marketDataService = marketDataService;
        this.holdingService = holdingService;
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<?> buyStock(
            @RequestBody HoldingREQ HoldingREQ,
            HttpServletRequest request){

        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"
            ));
        }

        Object userId = session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"
            ));
        }


        AppUser user= userRepository.findById((Long) userId).orElseThrow(() -> new RuntimeException("User not found"));
        Portfolio portolio = user.getPortfolio();
        double currentStockPrice = marketDataService.getCurrentStockPrice(HoldingREQ.getSymbol()).getPrice();
        BigDecimal stockPrice = new BigDecimal(currentStockPrice).setScale(2, RoundingMode.HALF_UP);
        BigDecimal stockQuantity = new BigDecimal(HoldingREQ.getQuantity()).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalCost = stockPrice.multiply(stockQuantity).setScale(2, RoundingMode.HALF_UP);
        if(portolio.getCash().compareTo(totalCost)==-1)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Insufficient funds"
            ));
        }
        else{
            portolio.setCash(portolio.getCash().subtract(totalCost));
            Holding holding = new Holding(portolio, HoldingREQ.getSymbol(), HoldingREQ.getQuantity(), stockPrice);

            holdingService.saveHolding(holding);
            Transaction transaction = new Transaction(
                    TransactionType.BUY,
                    portolio,
                    holding.getSymbol(),
                    holding.getQuantity(),
                    holding.getCurrentPrice(),
                    totalCost);
            transactionService.saveTransaction(transaction);
            portfolioService.refresh(portolio);
            return ResponseEntity.ok(holding);
        }
    }
}
