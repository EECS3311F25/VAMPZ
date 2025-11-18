package com.vampz.stocksprout.domain.transactionMVC;

import org.springframework.data.jpa.repository.JpaRepository;

public interface transactionRepository extends JpaRepository<Transaction, Long> {
}
