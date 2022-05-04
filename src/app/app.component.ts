import { Component } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    title = "Budget calculator";

    filter: string = "all";

    loading: boolean = true;

    total: number = 0;
    transactions: Transaction[] = [];

    constructor(private transacionsService: TransactionsService) {
        this.getTransactions();
    }

    getTotal(): void {
        let total = 0;
        let transactions = this.filteredTransactions();
        for(let i = 0; i < transactions.length; i++) 
            total += transactions[i].amount;
        this.total = total;
    }

    filteredTransactions(): Transaction[] {
        if (this.filter === "all") 
            return this.transactions;
        return this.transactions.filter(transaction => {
            return (this.filter === "income" && transaction.amount >= 0)
                || (this.filter === "expenses" && transaction.amount < 0);
        });;
    }

    getTransactions(): void {
        this.loading = true;
        this.transacionsService.getTransactions()
            .subscribe(transactions => {
                this.transactions = transactions;
                this.loading = false;
                this.getTotal();
            });
    }

}
