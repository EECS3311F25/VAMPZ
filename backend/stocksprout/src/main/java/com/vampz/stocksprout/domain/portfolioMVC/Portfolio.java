package com.vampz.stocksprout.domain.portfolioMVC;

import com.vampz.stocksprout.domain.transactionMVC.Transaction;
import com.vampz.stocksprout.domain.holdingMVC.Holding;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.vampz.stocksprout.appuser.AppUser;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(precision = 19, scale = 4)
    private BigDecimal cash = BigDecimal.ZERO;

    @Column(precision = 19, scale = 4)
    private BigDecimal invested = BigDecimal.ZERO;

    @Column(precision = 19, scale = 4)
    private BigDecimal stockValue = BigDecimal.ZERO;

    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUser owner;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Holding> holdings = new ArrayList<>();

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions = new ArrayList<>();

    public Portfolio() {
    }

    public Portfolio(String name, AppUser owner) {
        this.name = name;
        this.owner = owner;
    }

    // convenience: net worth = cash + stockValue
    public BigDecimal getNetWorth() {
        return cash.add(stockValue);
    }
}
