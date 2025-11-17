package com.vampz.stocksprout.domain.marketData;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Locale;

@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockCurrentDTO{
    private String symbol;
    private double price;
    private LocalDateTime dateTimeStamp;

}
