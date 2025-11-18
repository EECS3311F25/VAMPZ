package com.vampz.stocksprout.domain.transactionMVC;

import com.vampz.stocksprout.domain.TransactionType;
import com.vampz.stocksprout.domain.portfolioMVC.Portfolio;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TransactionType type;   // BUY or SELL

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    // stock identifier at the time of trade
    private String symbol;

    @Column
    private int quantity;

    @Column(precision = 19, scale = 4)
    private BigDecimal pricePerUnit;

    @Column(precision = 19, scale = 4)
    private BigDecimal totalAmount;

    private Instant timestamp;

    public Transaction() {
    }

    public Transaction(TransactionType type,
                       Portfolio portfolio,
                       String symbol,
                       int quantity,
                       BigDecimal pricePerUnit,
                       BigDecimal totalAmount,
                       Instant timestamp) {
        this.type = type;
        this.portfolio = portfolio;
        this.symbol = symbol;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.totalAmount = totalAmount;
        this.timestamp = timestamp;
    }



}
