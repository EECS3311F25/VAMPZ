package com.vampz.stocksprout.domain.portfolioMVC;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vampz.stocksprout.domain.transactionMVC.Transaction;
import com.vampz.stocksprout.domain.holdingMVC.Holding;
import com.vampz.stocksprout.domain.watchMVC.WatchItem;
import com.vampz.stocksprout.domain.watchMVC.WatchItemService;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import com.vampz.stocksprout.appuser.AppUser;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@ToString
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(precision = 19, scale = 2)
    private BigDecimal cash = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);

    @Column(precision = 19, scale = 2)
    private BigDecimal invested = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);

    @Column(precision = 19, scale = 2)
    private BigDecimal stockValue = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private AppUser owner;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Holding> holdings = new ArrayList<>();

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions = new ArrayList<>();

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WatchItem> watchList = new ArrayList<>();

    public Portfolio() {
    }

    public Portfolio(String name, AppUser owner) {
        this.name = name;
        this.owner = owner;
    }
}
