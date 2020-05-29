import { firestore } from 'src/firebase';
import {
  Request,
  RequestFirestoreConverter,
  RequestStatus,
} from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';

import { IgetNonOpenRequests, IgetOpenRequests } from './types';

const whereConditionHelper = {
  applicationPreference: {
    [ApplicationPreference.pin]: 'pinUserRef',
    [ApplicationPreference.cav]: 'cavUserRef',
  },
};

export const observeOpenRequests = (
  nextValue: Function,
  payload: IgetOpenRequests,
): firebase.Unsubscribe => {
  let initialQuery = firestore
    .collection('requests')
    .where('status', '==', RequestStatus.pending);

  if (payload.userType === ApplicationPreference.pin) {
    initialQuery = initialQuery.where('pinUserRef', '==', payload.userRef);
  }

  return initialQuery
    .withConverter(RequestFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));
};

export const observeNonOpenRequests = (
  nextValue: Function,
  payload: IgetNonOpenRequests,
): firebase.Unsubscribe =>
  firestore
    .collection('requests')
    .where('status', '==', payload.requestStatus)
    .where(
      whereConditionHelper.applicationPreference[payload.userType],
      '==',
      payload.userRef,
    )
    .withConverter(RequestFirestoreConverter)
    .onSnapshot(snap =>
      nextValue({
        requestStatus: payload.requestStatus,
        snap,
      }),
    );

export const createUserRequest = async ({
  requestPayload,
}: {
  requestPayload: Request;
}) =>
  firestore
    .collection('requests')
    .doc()
    .withConverter(RequestFirestoreConverter)
    .set(requestPayload);

export const setUserRequest = async ({
  requestPayload,
  requestId,
}: {
  requestPayload: Request;
  requestId: string;
}) =>
  firestore
    .collection('requests')
    .doc(requestId)
    .withConverter(RequestFirestoreConverter)
    .set(requestPayload);
