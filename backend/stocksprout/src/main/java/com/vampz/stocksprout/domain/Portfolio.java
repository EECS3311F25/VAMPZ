package com.vampz.stocksprout.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.vampz.stocksprout.appuser.AppUser;

@Entity
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
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getCash() {
        return cash;
    }

    public void setCash(BigDecimal cash) {
        this.cash = cash;
    }

    public BigDecimal getInvested() {
        return invested;
    }

    public void setInvested(BigDecimal invested) {
        this.invested = invested;
    }

    public BigDecimal getStockValue() {
        return stockValue;
    }

    public void setStockValue(BigDecimal stockValue) {
        this.stockValue = stockValue;
    }

    public AppUser getOwner() {
        return owner;
    }

    public void setOwner(AppUser owner) {
        this.owner = owner;
    }

    public List<Holding> getHoldings() {
        return holdings;
    }

    public void setHoldings(List<Holding> holdings) {
        this.holdings = holdings;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
    

}
