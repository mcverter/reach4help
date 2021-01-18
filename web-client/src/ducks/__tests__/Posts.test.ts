import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const types = {
  CREATE_PUBLIC_OFFER: 'CREATE_PUBLIC_OFFER',
  CREATE_PUBLIC_REQUEST: 'CREATE_PUBLIC_REQUEST',
  CREATE_PRIVATE_REQUEST_TO_PUBLIC_OFFER:
    'CREATE_PRIVATE_REQUEST_TO_PUBLIC_OFFER',
  CREATE_PRIVATE_OFFER_TO_PUBLIC_REQEST:
    'CREATE_PRIVATE_OFFER_TO_PUBLIC_REQEST',
};

/**
 * These should be async
 * https://redux.js.org/recipes/writing-tests#async-action-creators
 */
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

/*******
 * https://www.robinwieruch.de/firebase-test
 ********/

jest.mock('./firebase', () => {
  const set = jest.fn();

  return {
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        push: jest.fn(() => ({
          set,
        })),
      })),
    })),
  };
});

describe('createFreeCourse', () => {
  it('creates a course', async () => {
    const set = firebaseAdmin
      .database()
      .ref()
      .push().set;

    const result = createCourse(
      '1',
      'THE_ROAD_TO_GRAPHQL',
      'STUDENT',
      0,
      'FREE',
    );

    await expect(result).resolves.toEqual(true);

    expect(set).toHaveBeenCalledTimes(1);

    expect(set).toHaveBeenCalledWith({
      courseId: 'THE_ROAD_TO_GRAPHQL',
      packageId: 'STUDENT',
      invoice: {
        createdAt: 'TIMESTAMP',
        amount: 0,
        licensesCount: 1,
        currency: 'USD',
        paymentType: 'FREE',
      },
    });
  });
});
