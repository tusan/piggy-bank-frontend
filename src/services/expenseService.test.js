import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ExpenseService, ExpenseServiceException } from './expenseService';
import moment from 'moment';

describe('expense service', () => {
    let sut;
    let axiosMock;

    beforeEach(() => {
        sut = new ExpenseService();
        axiosMock = new MockAdapter(axios);
    })

    it('should call GET expenses endpoint to load expenses', async () => {
        axiosMock
            .onGet('http://localhost:8080/api/v1/expenses', {
                params: {
                    'date-start': '20181126',
                    'date-end': '20181226'
                }
            })
            .reply(200, [{ amount: 0 }]);

        await expect(sut.loadExpenses(moment('20181126'), moment('20181226'))).resolves.toEqual([{ amount: 0 }]);
    })

    it('should handle service errors', async () => {
        axiosMock
            .onGet('http://localhost:8080/api/v1/expenses', {
                params: {
                    'date-start': '20181126',
                    'date-end': '20181226'
                }
            })
            .reply(500);

        await expect(sut.loadExpenses(moment('20181126'), moment('20181226'))).rejects.toThrowError(ExpenseServiceException);
    })

    it('should call addExpense to save espenses', async () => {
        const expense = {
            date: moment("20181225"),
            amount: 10,
            type: 'MOTO',
            description: 'test description'
        }

        axiosMock
            .onPost('http://localhost:8080/api/v1/expenses', {
                date: '20181225',
                amount: 10,
                type: 'MOTO',
                description: 'test description'
            })
            .reply(201, {});

       await sut.addExpense(expense);
    });

    it('should handle add expenses errors', async () => {
        const expense = {
            date: moment("20181225"),
            amount: 10,
            type: 'MOTO',
            description: 'test description'
        }

        axiosMock
            .onPost('http://localhost:8080/api/v1/expenses', {
                date: '20181225',
                amount: 10,
                type: 'MOTO',
                description: 'test description'
            })
            .reply(500, {});

       await expect(sut.addExpense(expense)).rejects.toThrowError(ExpenseServiceException);
    });
});
