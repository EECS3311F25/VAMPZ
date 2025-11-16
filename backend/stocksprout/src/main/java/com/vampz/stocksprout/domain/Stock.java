package com.vampz.stocksprout.domain;

import lombok.*;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Stock {


    /**
     *Generate primary key for stock database
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Added columns for database 
     * cannot be Null and every value should be unique
     */
    @Column(nullable = false, unique = true)
    private String symbol;

    private String name;
    private String exchange;
    private String sector;

    /**
     * Connecting stock to stock price database
     */
    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StockPrice> prices = new ArrayList<>();

}
