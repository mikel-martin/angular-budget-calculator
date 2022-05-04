import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { Transaction } from '../transaction';

@Component({
    selector: 'transaction-form',
    templateUrl: './transaction-form.component.html',
    styleUrls: ['./transaction-form.component.scss']
})

export class TransactionFormComponent implements OnInit {

    concept: string = "";
    amount: number = 0;

    @Output() getTransactionsEvent = new EventEmitter();

    constructor(private transactionsService: TransactionsService) { }

    createTransaction(event: any): void {
        event.preventDefault();
        this.transactionsService.createTransaction(this.concept, this.amount)
            .subscribe(transaction => {
                this.getTransactionsEvent.emit();
                this.concept = "";
                this.amount = 0;
            });
    }        

    ngOnInit(): void { }

}
