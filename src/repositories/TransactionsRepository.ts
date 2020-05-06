import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const total = this.transactions.reduce(
      (sum, transaction) => {
        return {
          income:
            sum.income +
            (transaction.type === 'income' ? transaction.value : 0),
          outcome:
            sum.outcome +
            (transaction.type === 'outcome' ? transaction.value : 0),
        };
      },
      { income: 0, outcome: 0 },
    );

    const balance: Balance = {
      income: total.income,
      outcome: total.outcome,
      total: total.income - total.outcome,
    };

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = {
      id: uuid(),
      title,
      type,
      value,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
