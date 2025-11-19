package com.vampz.stocksprout.domain.marketDataService;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import com.vampz.stocksprout.domain.marketDataService.StockCurrentDTO;
@Service
public class marketDataService {

    private ObjectMapper mapper ;

    private final String apiKey = "zmkyyBDHwBHD52ckQ0vyaDTaFrr8T1Wt";

    public marketDataService() {
        this.mapper = new ObjectMapper();
        this.mapper.registerModule(new JavaTimeModule());
        this.mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }




    public StockCurrentDTO getCurrentStockPrice(String symbol) {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://financialmodelingprep.com/stable/quote-short?symbol=" + symbol + "&apikey="+apiKey))
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


    public List<StockHistDTO> getStockPriceHistory(String symbol,String startDate,String endDate) {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://financialmodelingprep.com/stable/historical-price-eod/light?symbol="+symbol+"&from="+startDate+"&to="+endDate + "&apikey="+apiKey))
                .GET()
                .build();

        HttpResponse<String> response = null;
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Status: " + response.statusCode());
            System.out.println("Response: " + response.body());

            List<StockHistDTO> list = mapper.readValue(response.body(), mapper.getTypeFactory().constructCollectionType(List.class, StockHistDTO.class));
            return list.isEmpty() ? null : list;


        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public StockCurrentDTO getYesterdayStockPrice(String symbol) {
        // Get yesterday's date
        LocalDate yesterday = LocalDate.now().minusDays(1);
        String formattedDate = yesterday.format(DateTimeFormatter.ISO_DATE);

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://financialmodelingprep.com/stable/historical-price-eod/light?symbol="
                        + symbol + "&from=" + formattedDate + "&to=" + formattedDate + "&apikey=" + apiKey))
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Status: " + response.statusCode());
            System.out.println("Response: " + response.body());

            // Parse response as a list of StockHistDTO
            List<StockHistDTO> list = mapper.readValue(
                    response.body(),
                    mapper.getTypeFactory().constructCollectionType(List.class, StockHistDTO.class)
            );

            if (list.isEmpty()) return null;

            StockHistDTO yesterdayData = list.get(0);

            // Map StockHistDTO to StockCurrentDTO
            StockCurrentDTO currentDTO = new StockCurrentDTO();
            currentDTO.setSymbol(yesterdayData.getSymbol());
            currentDTO.setPrice(yesterdayData.getPrice()); // use close price for "yesterday's price"
            currentDTO.setDateTimeStamp(LocalDateTime.now()); // or you can convert yesterdayData.getDate() to LocalDateTime

            return currentDTO;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

}

