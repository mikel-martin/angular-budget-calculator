import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { Transaction } from '../transaction';

@Component({
    selector: 'transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})

export class TransactionComponent implements OnInit {

    @Input() transaction?: Transaction;

    @Output() getTransactionsEvent = new EventEmitter<number>();

    constructor(private transacionsService: TransactionsService) { }

    removeTransaction(): void {
        this.transacionsService.removeTransaction(this.transaction!.id!)
            .subscribe(transaction => {
                this.getTransactionsEvent.next();
            });
    }

    ngOnInit(): void { }

}
