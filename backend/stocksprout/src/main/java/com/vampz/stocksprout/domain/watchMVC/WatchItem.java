package com.vampz.stocksprout.domain.watchMVC;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vampz.stocksprout.domain.portfolioMVC.Portfolio;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class WatchItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;

    private String name;
    
    @Column(precision = 19, scale = 2)
    private BigDecimal marketCap;

    @Column(precision = 19, scale = 2)
    private BigDecimal price;

    @Column(precision = 19, scale = 2)
    private BigDecimal change;

    @Column(precision = 19, scale = 2)
    private BigDecimal changePercentage;

    private Long volume;
    @Column(precision = 19, scale = 2)
    private BigDecimal open;

    @Column(precision = 19, scale = 2)
    private BigDecimal dayHigh;

    @Column(precision = 19, scale = 2)
    private BigDecimal dayLow;

    @Column(precision = 19, scale = 2)
    private BigDecimal previousClose;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    @JsonIgnore
    private Portfolio portfolio;


    public WatchItem(String symbol, String name, BigDecimal marketCap, BigDecimal price, BigDecimal change, BigDecimal changePercentage, Long volume, BigDecimal open, BigDecimal dayHigh, BigDecimal dayLow, BigDecimal previousClose, Portfolio portfolio) {
        this.symbol = symbol;
        this.name = name;
        this.marketCap = marketCap;
        this.price = price;
        this.change = change;
        this.changePercentage = changePercentage;
        this.volume = volume;
        this.open = open;
        this.dayHigh = dayHigh;
        this.dayLow = dayLow;
        this.previousClose = previousClose;
        this.portfolio = portfolio;
    }

    public WatchItem() {

    }

    public WatchItem(String symbol, Portfolio portfolio){
        this.symbol = symbol;
        this.name = "";
        this.marketCap = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        this.price = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        this.change = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        this.changePercentage = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        this.volume = 0l;
        this.open = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        this.dayHigh = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        this.dayLow = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        this.previousClose = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        this.portfolio = portfolio;
    }
}
