package com.vampz.stocksprout.domain.holdingMVC;

import com.vampz.stocksprout.domain.portfolioMVC.Portfolio;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.math.MathContext;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Holding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    // stock identity
    private String symbol;
    private String name;
    private String exchange;
    private String sector;

    // position info
    @Column(precision = 19, scale = 4)
    private BigDecimal quantity;

    @Column(precision = 19, scale = 4)
    private BigDecimal avgBuyPrice;

    @Column(precision = 19, scale = 4)
    private BigDecimal currentPrice;

    public Holding() {
    }

    public Holding(Portfolio portfolio,
            String symbol,
            String name,
            String exchange,
            String sector,
            BigDecimal quantity,
            BigDecimal avgBuyPrice,
            BigDecimal currentPrice) {
        this.portfolio = portfolio;
        this.symbol = symbol;
        this.name = name;
        this.exchange = exchange;
        this.sector = sector;
        this.quantity = quantity;
        this.avgBuyPrice = avgBuyPrice;
        this.currentPrice = currentPrice;
    }

    public BigDecimal getCurrentValue() {
        if (quantity == null || currentPrice == null) {
            return BigDecimal.ZERO;
        }
        return currentPrice.multiply(quantity);
    }

    public BigDecimal getGainLoss() {
        if (quantity == null || avgBuyPrice == null || currentPrice == null) {
            return BigDecimal.ZERO;
        }
        return currentPrice.subtract(avgBuyPrice).multiply(quantity);
    }

    public BigDecimal getGainLossPercent() {
        if (avgBuyPrice == null
                || avgBuyPrice.compareTo(BigDecimal.ZERO) == 0
                || currentPrice == null) {
            return BigDecimal.ZERO;
        }
        return currentPrice
                .subtract(avgBuyPrice)
                .divide(avgBuyPrice, MathContext.DECIMAL64)
                .multiply(BigDecimal.valueOf(100));
    }

}
