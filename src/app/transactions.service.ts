import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction';

@Injectable({
    providedIn: 'root'
})

export class TransactionsService {

    transactions: Transaction[] = [];

    API: string = "http://localhost:8000/transactions/";

    constructor(private http: HttpClient) { }

    getTransactions(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(this.API);
    }
    
    createTransaction(concept: string, amount: number): Observable<Transaction> {
        const todayDate = (new Date()).toISOString().split("T")[0];
        const maxId = 99999;
        const minId = 10000;
        const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
        const transaction: Transaction = {
            id, 
            concept, 
            amount,
            date: todayDate
        }
        return this.http.post<Transaction>(this.API, transaction);
    }
    
    removeTransaction(id: number): Observable<Transaction> {
        return this.http.delete<Transaction>(this.API + id);
    }

}
