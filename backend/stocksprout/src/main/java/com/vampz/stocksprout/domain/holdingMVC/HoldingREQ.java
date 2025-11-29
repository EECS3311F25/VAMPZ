package com.vampz.stocksprout.domain.holdingMVC;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HoldingREQ {
    private String symbol;
    private int quantity;
}
