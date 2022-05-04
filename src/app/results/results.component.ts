import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../transaction';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {

    @Input() transactions!: Transaction[];

    total: number = 0;

    constructor() { 
        this.total = this.getTotal();
    }

    getTotal(): number {
        let total = 0;
        if (this.transactions) {
            for (let i = 0; i < this.transactions.length; i++) {
                total += this.transactions[i].amount;
            }
        }
        return total;
    }

    ngOnInit(): void { }

}
