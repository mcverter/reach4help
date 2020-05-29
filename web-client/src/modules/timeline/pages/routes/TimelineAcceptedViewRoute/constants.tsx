import Location from 'react-app-location';
import * as Yup from 'yup';

export const TimelineAcceptedViewLocation = new Location(
  '/timeline/accepted/:requestId',
  {
    requestId: Yup.string().required(),
  },
);
