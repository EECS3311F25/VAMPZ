package com.vampz.stocksprout.domain.watchMVC;

import com.vampz.stocksprout.domain.marketDataService.marketDataService;
import org.springframework.stereotype.Service;

@Service
public class WatchItemService {

    private final WatchItemRepository watchItemRepository;
    private final marketDataService marketDataService;
    public WatchItemService(WatchItemRepository watchItemRepository, marketDataService marketDataService) {
        this.watchItemRepository = watchItemRepository;
        this.marketDataService = marketDataService;
    }


    public void refresh(WatchItem watchItem) {
        WatchItem newWatchItem = marketDataService.getStockData(watchItem.getSymbol());
        watchItem.setName(newWatchItem.getName());
        watchItem.setMarketCap(newWatchItem.getMarketCap());
        watchItem.setPrice(newWatchItem.getPrice());
        watchItem.setChange(newWatchItem.getChange());
        watchItem.setChangePercentage(newWatchItem.getChangePercentage());
        watchItem.setVolume(newWatchItem.getVolume());
        watchItem.setOpen(newWatchItem.getOpen());
        watchItem.setDayHigh(newWatchItem.getDayHigh());
        watchItem.setDayLow(newWatchItem.getDayLow());
        watchItem.setPreviousClose(newWatchItem.getPreviousClose());

        watchItemRepository.save(watchItem);
    }
}
