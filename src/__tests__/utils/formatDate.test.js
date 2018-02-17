import formatDate from '../../utils/formatDate';

describe('test notifyDate formatter', () => {
    it('with a date object', () => {
        expect(formatDate(new Date(Date.now()))).toBe(formatDate(Date.now()));
    });

    it('with a string object', () => {
        // date written in an american format
        expect(formatDate('12/24/2018')).toBe('2018-12-24');
    });

    it('with date formatted with underscores', () => {
        // April, 2nd 2018 ... date the american way
        expect(formatDate('02-04-2018')).toBe('2018-02-04');
    });
});
