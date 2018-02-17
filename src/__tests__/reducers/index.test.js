import reducers from '../../reducers';

describe('combined reducers', () => {
    it('combine all reducers', () => {
        const auth = {
            isAuthenticated: true,
        };
        const snacks = {
            isSnackBarActive: false,
        };
        const lists = {
            shoppingLists: [],
        };
        const items = {
            items: [],
        };

        expect(reducers(
            {
                auth,
                snacks,
                lists,
                items,
            },
            {},
        )).toEqual({
            auth: { isAuthenticated: true },
            items: { items: [] },
            lists: { shoppingLists: [] },
            snacks: { isSnackBarActive: false },
        });
    });
});
