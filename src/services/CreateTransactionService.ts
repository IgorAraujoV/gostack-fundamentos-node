import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    if (type !== 'income' && type !== 'outcome')
      throw new Error('This type is invalid');

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.income < balance.outcome + value) {
      throw new Error('Value is bigget than balance.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
