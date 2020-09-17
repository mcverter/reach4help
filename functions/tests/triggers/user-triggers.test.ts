import { triggerEventsWhenUserIsCreated } from '../../src/users';
import * as firebase from '@firebase/testing';
import * as Test from 'firebase-functions-test';

const projectId = 'reach-4-help-test';

const test = Test();

/**
 * Creates a new app with admin authentication.
 *
 * @return {object} the app.
 */
const adminApp = () => {
  return firebase.initializeAdminApp({ projectId }).firestore();
};

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
});

describe('user triggers', () => {
  it('should delete invalid data', async () => {
    const db = adminApp();

    const userRef = db.collection('users').doc('user1');

    return userRef
      .set({ displayName: 'fsdfs' })
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return userRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenUserIsCreated)(snap, {
          params: {
            userId: 'user1',
          },
        });
      })
      .then(() => {
        return userRef.get();
      })
      .then(snapAfter => {
        expect(snapAfter.exists).toBeFalsy();
      });
  });
});
