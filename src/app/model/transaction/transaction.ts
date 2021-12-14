export class Transaction {
    id: number;
    topic: string;
    description?: string;
    amount: number;
    date: Date;
    year: number;
    month: string;
    day: string;
    type?: string;
    icon?: string;
    budgetId?: number;
}
