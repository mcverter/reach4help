# Unauthorized User Model

## Model

```tsx
export interface IUserAddress {
  address1?: string;
  address2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  coords: firebase.firestore.GeoPoint;
}

export interface IPrivilegedUserInformation
  extends firebase.firestore.DocumentData {
  addressFromGoogle: google.maps.GeocoderResult;
  address: IUserAddress;
  sendNotifications?: firebase.firestore.Timestamp | null;
  termsAccepted: firebase.firestore.Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  termsVersion: string;
  privacyAccepted: firebase.firestore.Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  privacyVersion: string;
}

```


```tsx
export interface IUser extends firebase.firestore.DocumentData {
  username: string;
  applicationPreference?: ApplicationPreference | null;
  cavQuestionnaireRef?: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  pinQuestionnaireRef?: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  averageRating?: number | null;
  casesCompleted?: number;
  requestsMade?: number;
  pinRatingsReceived?: number;
  cavRatingsReceived?: number;
  displayName?: string | null;
  displayPicture?: string | null;
  createdAt?: firebase.firestore.Timestamp;
}
```

## Relationships with Other Models

## Entity Diagram


