import { Offer } from 'src/models/offers';
import { ApplicationPreference, User } from 'src/models/users';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType } = createActionTypeFactory('OFFERS');

export const OBSERVE_OFFERS = observerType('OBSERVE_OFFERS');

export const GET_OFFERS_FOR_REQUEST = asyncType('GET_OFFERS_FOR_REQUEST');

export const SET = asyncType('SET');

export const UPDATE = asyncType('UPDATE');

export interface OffersState {
  forRequest?: {
    requestId: string;
    data?: Record<string, Offer>;
    loading: boolean;
    error?: Error;
  };
  data?: Record<string, Offer>;
  loading: boolean;
  error?: Error;
  observerReceivedFirstUpdate: boolean;
  setAction: {
    success: boolean;
    loading: boolean;
    modalState: boolean;
    error?: Error;
  };
}

export interface IgetOffers {
  userRef?: firebase.firestore.DocumentReference<User>;
  userType: ApplicationPreference;
}

export interface IgetRequestOffers {
  userRef?: firebase.firestore.DocumentReference<User>;
  userType: ApplicationPreference;
  requestId: string;
}
