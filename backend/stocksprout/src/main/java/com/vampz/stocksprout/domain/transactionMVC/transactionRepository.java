package com.vampz.stocksprout.domain.transactionMVC;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface transactionRepository extends JpaRepository<Transaction, Long> {
        List<Transaction> findByPortfolioIdOrderByTimestampDesc(Long portfolioId);

}
