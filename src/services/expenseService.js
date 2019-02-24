import axios from 'axios';
import * as urls from '../config/url';

export class ExpenseService {
    async loadExpenses(dateStart, dateEnd) {
        try {
            const res = await axios
                .get(`${urls.PROTOCOL}://${urls.BASE_URL}/${urls.EXPENSES_PATH}`, {
                    params: {
                        'date-start': dateStart.format('YYYYMMDD'),
                        'date-end': dateEnd.format('YYYYMMDD')
                    }
                });
            return res.data;
        } catch (error) {
            throw new ExpenseServiceException(error);
        }
    }

    async addExpense(expense) {
        try {
            await axios
                .post(`${urls.PROTOCOL}://${urls.BASE_URL}/${urls.EXPENSES_PATH}`, {
                    ...expense,
                    date: expense.date.format("YYYYMMDD")
                });
            return true;
        }
        catch (error) {
            throw new ExpenseServiceException(error);
        }
    }
}

export class ExpenseServiceException extends Error { }

const expenseService = new ExpenseService();
export default expenseService;