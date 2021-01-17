# Request Model

- This used to be called "Request" but name was changed because "Request" isn't unambiguous noun.

- This is very broken. Why is the definition spread among so many interfaces?

## Model

```tsx
export interface IRequest extends firebase.firestore.DocumentData {
  cavUserRef?: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  cavUserSnapshot?: IUser | null;
  pinUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  pinUserSnapshot: IUser;
  title: string;
  description: string;
  streetAddress: string;
  latLng: firebase.firestore.GeoPoint;
  status?: RequestStatus;
  pinRating?: number | null;
  cavRating?: number | null;
  pinRatedAt?: firebase.firestore.Timestamp | null;
  cavRatedAt?: firebase.firestore.Timestamp | null;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}
```

```tsx
export interface IPrivilegedRequestInformation
  extends firebase.firestore.DocumentData {
  address: google.maps.GeocoderResult;
}
```

```tsx
export interface IOfferWithLocation extends IOffer {
  address: IUserAddress;
}
```

```tsx
export enum AbstractRequestStatus {
  pending = 'pending',
  accepted = 'accepted',
  ongoing = 'ongoing',
  finished = 'finished',
  archived = 'archived',
}

export interface IRequestWithOffersAndTimeline extends IRequest {
  offers: Record<string, IOfferWithLocation>;
  timeline: ITimelineItem[];
  contactNumber?: string | null;
}
```

## Relationships with Other Models

## Entity Diagram
