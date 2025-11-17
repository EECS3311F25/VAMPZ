package com.vampz.stocksprout.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.MathContext;

@Entity
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getAvgBuyPrice() {
        return avgBuyPrice;
    }

    public void setAvgBuyPrice(BigDecimal avgBuyPrice) {
        this.avgBuyPrice = avgBuyPrice;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

}
