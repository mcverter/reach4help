// eslint-disable-next-line no-unused-vars
import * as unused from 'src/ducks/profile/actions';

const types = {
  CREATE_PUBLIC_OFFER: 'CREATE_PUBLIC_OFFER',
  CREATE_PUBLIC_REQUEST: 'CREATE_PUBLIC_REQUEST',
  CREATE_PRIVATE_REQUEST_TO_PUBLIC_OFFER:
    'CREATE_PRIVATE_REQUEST_TO_PUBLIC_OFFER',
  CREATE_PRIVATE_OFFER_TO_PUBLIC_REQEST:
    'CREATE_PRIVATE_OFFER_TO_PUBLIC_REQEST',
};

describe('actions', () => {
  it('should have action to CREATE_PUBLIC_OFFER', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.CREATE_PUBLIC_OFFER,
      text,
    };
    expect(expectedAction).toEqual(expectedAction);
  });
  it('should have action to CREATE_PUBLIC_REQUEST', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.CREATE_PUBLIC_REQUEST,
      text,
    };
    expect(expectedAction).toEqual(expectedAction);
  });
  it('should have action to CREATE_PRIVATE_OFFER_TO_PUBLIC_REQEST', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.CREATE_PRIVATE_OFFER_TO_PUBLIC_REQEST,
      text,
    };
    expect(expectedAction).toEqual(expectedAction);
  });
  it('should have action to CREATE_PRIVATE_OFFER_TO_PUBLIC_REQEST', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.CREATE_PRIVATE_OFFER_TO_PUBLIC_REQEST,
      text,
    };
    expect(expectedAction).toEqual(expectedAction);
  });
});
