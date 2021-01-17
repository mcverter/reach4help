# Timeline Model

# Model

```tsx
export enum TimelineItemAction {
  CREATE_REQUEST = 'CREATE_REQUEST',
  CANCEL_REQUEST = 'CANCEL_REQUEST',
  REMOVE_REQUEST = 'REMOVE_REQUEST',
  COMPLETE_REQUEST = 'COMPLETE_REQUEST',
  CAV_DECLINED = 'CAV_DECLINED',
  CREATE_OFFER = 'CREATE_OFFER',
  ACCEPT_OFFER = 'ACCEPT_OFFER',
  REJECT_OFFER = 'REJECT_OFFER',
  RATE_PIN = 'RATE_PIN',
  RATE_CAV = 'RATE_CAV',
}

export interface ITimelineItem extends firebase.firestore.DocumentData {
  actorRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  offerRef?: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  requestRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  actorSnapshot: IUser;
  offerSnapshot?: IOffer | null;
  requestSnapshot: IRequest;
  action: TimelineItemAction;
  createdAt?: firebase.firestore.Timestamp;
}
```

# Interaction with other Models

# Entity Diagram
