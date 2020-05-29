import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { Offer } from 'src/models/offers';
import { Request } from 'src/models/requests';
import styled, { keyframes } from 'styled-components';

import { COLORS } from '../../../../theme/colors';
import avgRating from '../../assets/pinAverageRating.svg';
import defaultUserPic from '../../assets/role_pin.png';
import warningSign from '../../assets/warningExclamation.svg';

const Item = styled.div`
  overflow: auto;
  margin: 15px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid ${COLORS.strokeCards};
  border-radius: 2px;
`;

const Text = styled.div`
  float: left;
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.65);
  padding: 5px;
`;

const StyledTitle = styled.h4`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

const StyledText = styled.p`
  margin-bottom: 3px;
  font-family: Roboto, sans-serif;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const UserPic = styled.img`
  float: left;
  width: 56px;
  height: 56px;
  margin: 5px;
  border-radius: 105px;
  animation: ${fadeIn} 0.75s;
  object-fit: cover;
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UserDetails = styled.div`
  display: inline-block;
  margin-left: 15px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const WarningMessage = styled.div`
  border: 1px solid ${COLORS.secondaryLight};
  color: rgba(0, 0, 0, 0.65);
  font-family: Roboto;
  font-size: 12px;
  line-height: 20px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 2px;
`;

export interface RequestItemProps {
  request: Request;
  handleRequest: (action?: boolean) => void;
  isCavAndOpenRequest: boolean;
  hideUserPic?: boolean;
  offers?: Record<string, Offer>;
  toCloseRequest?: (action?: boolean) => void;
  isPinAndOpenRequest?: boolean;
}

const RequestItem: React.FC<RequestItemProps> = ({
  request,
  handleRequest,
  isCavAndOpenRequest,
  isPinAndOpenRequest = false,
  offers = {},
  hideUserPic,
  toCloseRequest,
}): React.ReactElement => {
  const [displayDetails, toggleDetails] = useState(false);

  const handleRequestClick = () => {
    if (isCavAndOpenRequest) {
      toggleDetails(true);
    } else {
      handleRequest();
    }
  };

  let bottomWarningMessage;
  if (
    isPinAndOpenRequest &&
    !Object.keys(offers).length &&
    Date.now() - request.createdAt.toDate().getTime() > 1000 * 60 * 60 * 24 * 7
  ) {
    bottomWarningMessage = (
      <WarningMessage
        style={{
          background: '#FAFAFA',
        }}
      >
        No one has replied to your request.
      </WarningMessage>
    );
  } else if (
    isPinAndOpenRequest &&
    toCloseRequest &&
    (Object.keys(offers).length >= 5 ||
      (Object.keys(offers).length < 5 &&
        Date.now() - request.createdAt.toDate().getTime() >
          1000 * 60 * 60 * 24 * 7))
  ) {
    bottomWarningMessage = (
      <WarningMessage
        style={{
          background: 'rgba(255, 203, 82, 0.1)',
        }}
      >
        <Row>
          <Col span={2}>
            <img
              src={warningSign}
              alt="Attention"
              style={{ animation: 'fadeIn 0.75s' }}
            />
          </Col>
          <Col span={22}>
            <p>
              Your request was viewed by several volunteers, but was not
              accepted. We suggest you &ldquo;Close Request&rdquo; and create a
              new one with a simpler description.
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={12}>
            <StyledButton
              onClick={() => toCloseRequest()}
              style={{ fontSize: '16px' }}
            >
              Close Request
            </StyledButton>
          </Col>
        </Row>
      </WarningMessage>
    );
  }

  if (displayDetails) {
    return (
      <Item>
        <div
          onClick={() => toggleDetails(false)}
          style={{ marginBottom: '15px' }}
        >
          <UserPic
            src={request.pinUserSnapshot.displayPicture || defaultUserPic}
            alt="Profile pic"
          />
          <UserDetails style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
            <StyledText style={{ fontSize: '18px' }}>
              {request.pinUserSnapshot.displayName}
            </StyledText>
            <div style={{ display: 'flex' }}>
              <StyledIcon src={avgRating} />
              <StyledText>{request.pinUserSnapshot.averageRating}</StyledText>
            </div>
          </UserDetails>
        </div>
        <hr style={{ margin: '5px' }} />
        <Text>
          <StyledTitle style={{ color: 'rgba(0, 0, 0, 1)' }}>
            {request.title}
          </StyledTitle>
          <StyledText
            style={{
              color: 'rgba(0, 0, 0, 0.85)',
              marginBottom: '20px',
            }}
          >
            {request.description}
          </StyledText>
          <Row>
            <Col span={11}>
              <StyledButton onClick={() => handleRequest(false)}>
                Cannot Help
              </StyledButton>
            </Col>
            <Col span={11} offset={2}>
              <StyledButton
                style={{
                  background: '#52C41A',
                  color: '#FFFFFF',
                }}
                onClick={() => handleRequest(true)}
              >
                Help {request.pinUserSnapshot.displayName}
              </StyledButton>
            </Col>
          </Row>
        </Text>
      </Item>
    );
  }

  return (
    <>
      <Item style={{ marginBottom: '0px' }}>
        <div
          onClick={handleRequestClick}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Text
            style={{
              width: '75%',
              whiteSpace: 'nowrap',
            }}
          >
            <StyledTitle
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'rgba(0, 0, 0, 0.65)',
              }}
            >
              {request.title}
            </StyledTitle>
            <StyledText
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {request.description}
            </StyledText>
          </Text>
          {!hideUserPic && (
            <UserPic
              style={{
                float: 'right',
              }}
              src={request.pinUserSnapshot.displayPicture || defaultUserPic}
              alt="Profile pic"
            />
          )}
        </div>
      </Item>
      {bottomWarningMessage}
    </>
  );
};

export default RequestItem;
