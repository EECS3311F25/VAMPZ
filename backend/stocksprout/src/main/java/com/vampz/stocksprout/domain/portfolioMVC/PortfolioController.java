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
import com.vampz.stocksprout.domain.watchMVC.WatchItem;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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

    public PortfolioController(PortfolioService portfolioService, UserRepository userRepository,
            marketDataService marketDataService, HoldingService holdingService, TransactionService transactionService) {
        this.portfolioService = portfolioService;
        this.userRepository = userRepository;
        this.marketDataService = marketDataService;
        this.holdingService = holdingService;
        this.transactionService = transactionService;
    }

    @PostMapping("/buy")
    public ResponseEntity<?> buyStock(
            @RequestBody HoldingREQ holdingREQ,
            HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session == null || holdingREQ.getQuantity() <= 0) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        Object userId = session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        AppUser user = userRepository.findById((Long) userId).orElseThrow(() -> new RuntimeException("User not found"));
        Portfolio portfolio = user.getPortfolio();
        double currentStockPrice = marketDataService.getCurrentStockPrice(holdingREQ.getSymbol()).getPrice();
        BigDecimal stockPrice = new BigDecimal(currentStockPrice).setScale(2, RoundingMode.HALF_UP);
        BigDecimal stockQuantity = new BigDecimal(holdingREQ.getQuantity()).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalCost = stockPrice.multiply(stockQuantity).setScale(2, RoundingMode.HALF_UP);
        if (portfolio.getCash().compareTo(totalCost) == -1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Insufficient funds"));
        } else {
            portfolio.setCash(portfolio.getCash().subtract(totalCost));

            Optional<Holding> existingHoldingOpt = portfolio.getHoldings().stream()
                    .filter(h -> h.getSymbol().equalsIgnoreCase(holdingREQ.getSymbol()))
                    .findFirst();

            Holding holdingToSave;
            if (existingHoldingOpt.isPresent()) {
                holdingToSave = existingHoldingOpt.get();
                int oldQuantity = holdingToSave.getQuantity();
                int newQuantity = holdingREQ.getQuantity();
                BigDecimal oldBuyPrice = holdingToSave.getAvgBuyPrice();

                BigDecimal oldTotalValue = oldBuyPrice.multiply(BigDecimal.valueOf(oldQuantity));
                BigDecimal newTotalValue = stockPrice.multiply(BigDecimal.valueOf(newQuantity));
                int totalQuantity = oldQuantity + newQuantity;
                BigDecimal newAvgPrice = (oldTotalValue.add(newTotalValue)).divide(BigDecimal.valueOf(totalQuantity), 2,
                        RoundingMode.HALF_UP);

                holdingToSave.setQuantity(totalQuantity);
                holdingToSave.setAvgBuyPrice(newAvgPrice);

            } else {
                // If not, create a new holding
                holdingToSave = new Holding(portfolio, holdingREQ.getSymbol(), holdingREQ.getQuantity(), stockPrice);
            }

            holdingService.saveHolding(holdingToSave);

            Transaction transaction = new Transaction(
                    TransactionType.BUY,
                    portfolio,
                    holdingToSave.getSymbol(),
                    holdingREQ.getQuantity(),
                    stockPrice,
                    totalCost);
            transactionService.saveTransaction(transaction);
            int flag=0;
            for(int i = 0; i < portfolio.getHoldings().size(); i++){
                if(portfolio.getHoldings().get(i).getSymbol().equalsIgnoreCase(holdingToSave.getSymbol())){
                    portfolio.getHoldings().get(i).setAvgBuyPrice(holdingToSave.getAvgBuyPrice());
                    portfolio.getHoldings().get(i).setQuantity(holdingToSave.getQuantity());
                    portfolio.getHoldings().get(i).setCurrentPrice(holdingToSave.getCurrentPrice());
                    portfolio.getHoldings().get(i).setName(holdingToSave.getName());
                    portfolio.getHoldings().get(i).setSymbol(holdingToSave.getSymbol());
                    flag=1;
                }
            }
            if(flag==0){
                portfolio.getHoldings().add(holdingToSave);
            }
            portfolio.getTransactions().add(transaction);
            portfolioService.refresh(portfolio);
            return ResponseEntity.ok(holdingToSave);
        }
    }

    @PostMapping("/sell")
    public ResponseEntity<?> sellStock(
            @RequestBody HoldingREQ HoldingREQ,
            HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        Object userId = session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        AppUser user = userRepository.findById((Long) userId).orElseThrow(() -> new RuntimeException("User not found"));
        Portfolio portfolio = user.getPortfolio();

        Optional<Holding> holdingSellOpt = portfolio.getHoldings().stream()
                .filter(h -> h.getSymbol().equals(HoldingREQ.getSymbol()))
                .findFirst();

        if (holdingSellOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Holding not found"));
        }

        Holding holdingSell = holdingSellOpt.get();

        if (holdingSell.getQuantity() < HoldingREQ.getQuantity()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Insufficient stock quantity to sell"));
        }

        double currentStockPrice = marketDataService.getCurrentStockPrice(HoldingREQ.getSymbol()).getPrice();
        BigDecimal stockPrice = new BigDecimal(currentStockPrice).setScale(2, RoundingMode.HALF_UP);
        BigDecimal stockQuantity = new BigDecimal(HoldingREQ.getQuantity());
        BigDecimal totalProceeds = stockPrice.multiply(stockQuantity).setScale(2, RoundingMode.HALF_UP);

        portfolio.setCash(portfolio.getCash().add(totalProceeds));
        holdingSell.setQuantity(holdingSell.getQuantity() - HoldingREQ.getQuantity());

        if (holdingSell.getQuantity() == 0) {
            portfolio.getHoldings().remove(holdingSell); // JPA will handle deletion due to orphanRemoval=true
        } else {
            holdingService.saveHolding(holdingSell);
        }

        Transaction transaction = new Transaction(TransactionType.SELL, portfolio, holdingSell.getSymbol(),
                HoldingREQ.getQuantity(), stockPrice, totalProceeds);
        transactionService.saveTransaction(transaction);

        portfolioService.refresh(portfolio);
        return ResponseEntity.ok(Map.of("status", "success", "message", "Sale successful"));

    }

    @GetMapping
    @RequestMapping(path = "/watchList")
    public ResponseEntity<?> getWatchList(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        Object userId = session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        AppUser user = userRepository.findById((Long) userId).orElseThrow(() -> new RuntimeException("User not found"));
        Portfolio portfolio = user.getPortfolio();
        return ResponseEntity.ok(portfolio.getWatchList());
    }

    @PostMapping(path = "/watchlist")
    public ResponseEntity<?> addToWatchList(
            @RequestParam String symbol,
            HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        Object userId = session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        AppUser user = userRepository.findById((Long) userId).orElseThrow(() -> new RuntimeException("User not found"));
        Portfolio portfolio = user.getPortfolio();
        WatchItem newWatchItem = new WatchItem(symbol,portfolio);
        for(int i = 0; i < portfolio.getWatchList().size(); i++){
            if(portfolio.getWatchList().get(i).getSymbol().equalsIgnoreCase(symbol)){
                return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                        "status", "error",
                        "message", "Symbol already in watchlist"));
            }
        }


        portfolio.getWatchList().add(newWatchItem);
        portfolioService.refresh(portfolio);
        return ResponseEntity.ok(newWatchItem);

    }

    @DeleteMapping(path = "/watchlist")
    public ResponseEntity<?> removeFromWatchList(
            @RequestParam String symbol,
            HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        Object userId = session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        AppUser user = userRepository.findById((Long) userId).orElseThrow(() -> new RuntimeException("User not found"));
        Portfolio portfolio = user.getPortfolio();
        for(int i = 0; i < portfolio.getWatchList().size(); i++){
            if(portfolio.getWatchList().get(i).getSymbol().equalsIgnoreCase(symbol)){
                portfolio.getWatchList().remove(i);

                portfolioService.refresh(portfolio);
                return ResponseEntity.ok(Map.of("status", "success", "message", "Removed from watchlist"));
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("status", "error", "message", "Symbol not found in watchlist"));

    }


    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        Object userId = session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"));
        }

        AppUser user = userRepository.findById((Long) userId).orElseThrow(() -> new RuntimeException("User not found"));
        Portfolio portfolio = user.getPortfolio();
        return ResponseEntity.ok(portfolio);
    }

}
