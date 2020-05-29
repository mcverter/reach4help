import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Map from '../../../../components/WebClientMap/WebClientMap';
import { VolunteerMarkerProps } from '../../../../components/WebClientMap/WebClientMarker';
import { observeOffers, setOffer } from '../../../../ducks/offers/actions';
import { OffersState } from '../../../../ducks/offers/types';
import { ProfileState } from '../../../../ducks/profile/types';
import { observeOpenRequests } from '../../../../ducks/requests/actions';
import { RequestState } from '../../../../ducks/requests/types';
import { firestore } from '../../../../firebase';
import { OfferStatus } from '../../../../models/offers';
import { Request } from '../../../../models/requests';
import { ApplicationPreference } from '../../../../models/users';
import RequestItem from '../../components/RequestItem/RequestItem';

interface MapRequestProps {
  center: VolunteerMarkerProps;
  id: string;
}

const RequestDetails = styled.div`
  position: fixed;
  bottom: 64px;
  width: 100%;
  background: white;
`;

const FindRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();

  const [expandedRequestId, setExpandedRequestId] = useState<
    string | undefined
  >(undefined);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const [currentLocation, setCurrentLocation] = useState<VolunteerMarkerProps>(
    () =>
      profileState &&
      profileState.privilegedInformation &&
      profileState.privilegedInformation.address &&
      profileState.privilegedInformation.address.coords
        ? {
            lat: profileState.privilegedInformation.address.coords.latitude,
            lng: profileState.privilegedInformation.address.coords.longitude,
          }
        : {
            lat: 13.4124693,
            lng: 103.8667,
          },
  );

  const [requestsWithoutOffer, setRequestsWithoutOffer] = useState<
    MapRequestProps[]
  >([]);

  const [pendingRequests, setPendingRequests] = useState<
    Record<string, Request>
  >({});

  const openRequests = useSelector(
    ({ requests }: { requests: RequestState }) => requests.openRequests,
  );

  const offersState = useSelector(
    ({ offers }: { offers: OffersState }) => offers,
  );

  navigator.geolocation.getCurrentPosition(
    position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentLocation(pos);
    },
    error => {
      // eslint-disable-next-line no-console
      console.error(error.message);
    },
  );

  useEffect(() => {
    if (openRequests && openRequests.data) {
      const internalPendingRequests: Record<string, Request> = {
        ...openRequests.data,
      };

      for (const key in offersState.data) {
        if (offersState.data[key]) {
          if (internalPendingRequests[offersState.data[key].requestRef.id]) {
            delete internalPendingRequests[offersState.data[key].requestRef.id];
          }
        }
      }
      setPendingRequests(internalPendingRequests);
    }
  }, [offersState, openRequests]);

  useEffect(() => {
    if (pendingRequests) {
      const requestsData = pendingRequests;
      const transformedRequests: MapRequestProps[] = Object.keys(
        requestsData,
      ).reduce(
        (acc: MapRequestProps[], curr: string) =>
          !requestsData[curr]
            ? acc
            : [
                ...acc,
                {
                  id: curr,
                  center: {
                    lat: requestsData[curr].latLng.latitude,
                    lng: requestsData[curr].latLng.longitude,
                  },
                },
              ],
        [],
      );

      setRequestsWithoutOffer(transformedRequests);
    }
  }, [pendingRequests]);

  useEffect(() => {
    if (profileState.profile && profileState.profile.applicationPreference) {
      const openRequestsSubscription = observeOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
      });
      const offersStateSubscription = observeOffers(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
      });
      return () => {
        openRequestsSubscription();
        offersStateSubscription();
      };
    }
  }, [profileState, dispatch]);

  const onRequestHandler = (id: string) => {
    setExpandedRequestId(id);
  };

  const handleRequestForAcceptReject = (action?: boolean) => {
    if (
      expandedRequestId &&
      openRequests &&
      openRequests.data &&
      profileState.userRef &&
      profileState.profile &&
      profileState.profile.applicationPreference === ApplicationPreference.cav
    ) {
      dispatch(
        setOffer({
          cavUserRef: profileState.userRef,
          pinUserRef: openRequests.data[expandedRequestId].pinUserRef,
          requestRef: firestore.collection('requests').doc(expandedRequestId),
          cavUserSnapshot: profileState.profile,
          message: 'I want to help!',
          status: action ? OfferStatus.pending : OfferStatus.cavDeclined,
        }),
      );
      setExpandedRequestId(undefined);
    }
  };

  const maybeRequestDetails = () => {
    if (expandedRequestId && openRequests && openRequests.data) {
      const request = openRequests.data[expandedRequestId];
      return request ? (
        <RequestDetails>
          <RequestItem
            request={request}
            handleRequest={handleRequestForAcceptReject}
            isCavAndOpenRequest
          />
        </RequestDetails>
      ) : null;
    }
    return null;
  };

  return (
    <>
      <Map
        requests={requestsWithoutOffer}
        volunteerLocation={currentLocation}
        onRequestHandler={id => onRequestHandler(id)}
      />
      {maybeRequestDetails()}
    </>
  );
};

FindRequestsContainer.propTypes = {};

export default FindRequestsContainer;
