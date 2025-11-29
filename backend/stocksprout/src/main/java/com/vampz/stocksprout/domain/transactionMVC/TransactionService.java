package com.vampz.stocksprout.domain.transactionMVC;

import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    private final transactionRepository transactionRepository;
    public TransactionService(transactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
