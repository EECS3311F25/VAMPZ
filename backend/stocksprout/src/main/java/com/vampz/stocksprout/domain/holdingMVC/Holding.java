package com.vampz.stocksprout.domain.holdingMVC;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Holding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    @JsonIgnore
    private Portfolio portfolio;

    // stock identity
    private String symbol;
    private String name;

    // position info

    private int quantity;

    @Column(precision = 19, scale = 2)
    private BigDecimal
            e;

    @Column(precision = 19, scale = 2)
    private BigDecimal currentPrice;

    public Holding() {
    }

    public Holding(Portfolio portfolio, String symbol, int quantity, BigDecimal buyPrice)
             {
        this.portfolio = portfolio;
        this.symbol = symbol;
        this.name = symbol;
        this.quantity = quantity;
        this.buyPrice = buyPrice.setScale(2, RoundingMode.HALF_UP);
        this.currentPrice = buyPrice.setScale(2, RoundingMode.HALF_UP);
    }


}
