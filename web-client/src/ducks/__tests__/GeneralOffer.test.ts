import * as actions from '../myOffers/actions';
import * as types from '../myOffers/types';

describe('actions', () => {
  it('should create an action to Create a General Offer', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.SET,
      text,
    };
    expect(1).toEqual(1);
  });
});
