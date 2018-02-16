import * as tokenUtils from '../../utils/tokenUtils';

describe('test localstorage token', () => {
    it('gets token in localstorage', () => {
        tokenUtils.setAuthToken('abcdefgh12345');
        expect(tokenUtils.getAuthToken('token')).toBe('abcdefgh12345');
    });

    it('deletes token in localstorage', () => {
        tokenUtils.setAuthToken('abcdefgh12345');
        tokenUtils.deleteAuthToken('token');
        expect(tokenUtils.getAuthToken('token')).toBeNull();
    });

    it('token is null when it is not set', () => {
        expect(tokenUtils.getAuthToken('token')).toBeNull();
    });
});
