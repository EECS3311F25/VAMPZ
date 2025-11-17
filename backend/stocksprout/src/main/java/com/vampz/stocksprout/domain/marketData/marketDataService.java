package com.vampz.stocksprout.domain.marketData;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class marketDataService {

    private final ObjectMapper mapper = new ObjectMapper();


    public StockCurrentDTO getCurrentStockPrice(String symbol) {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://financialmodelingprep.com/stable/quote-short?symbol=" + symbol + "&apikey=zmkyyBDHwBHD52ckQ0vyaDTaFrr8T1Wt"))
                .GET()
                .build();

        HttpResponse<String> response = null;
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Status: " + response.statusCode());
            System.out.println("Response: " + response.body());

            List<StockCurrentDTO> list = mapper.readValue(response.body(), mapper.getTypeFactory().constructCollectionType(List.class, StockCurrentDTO.class));
           if(!list.isEmpty()) {
               list.get(0).setDateTimeStamp(LocalDateTime.now());
           }
            return list.isEmpty() ? null : list.get(0);


        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
