package com.vampz.stocksprout.domain.holdingMVC;

import org.springframework.stereotype.Service;

@Service
public class HoldingService {
    private final HoldingRepository holdingRepository;

    public HoldingService(HoldingRepository holdingRepository) {
        this.holdingRepository = holdingRepository;
    }

    public Holding getHoldingById(Long id) {
        return holdingRepository.findById(id).orElseThrow();
    }

    public Holding saveHolding(Holding holding) {
        return holdingRepository.save(holding);
    }

}
