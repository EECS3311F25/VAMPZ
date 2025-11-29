package com.vampz.stocksprout.domain.watchMVC;

import com.vampz.stocksprout.domain.holdingMVC.Holding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface WatchItemRepository extends JpaRepository<WatchItem, Long> {
}
