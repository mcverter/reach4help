import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StepBackButton, StepForwardButton } from 'src/components/Buttons';
import styled from 'styled-components';

import TitleWithAddon from '../../../../components/TitleWithAddon/TitleWithAddon';

const Step3Review: React.FC<Step3ReviewProps> = ({
  isSubmitting,
  request,
  saveRequest,
  goBack,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <MainDiv>
      <TitleWithAddon alignAddon="left" level={3} left="0%" transform="none">
        {t('newRequest.title')}
      </TitleWithAddon>
      <Title style={{ color: 'rgba(0, 0, 0, 1)', marginTop: '20px' }}>
        {t('Step3Review.deliveryAddress')}
      </Title>
      <ReviewText
        style={{
          color: 'rgba(0, 0, 0, 0.85)',
          marginBottom: '20px',
        }}
      >
        {request.streetAddress}
      </ReviewText>
      <Title style={{ color: 'rgba(0, 0, 0, 1)' }}>
        {request.type === 'Deliveries' ? request.type : request.other}
      </Title>
      <ReviewText
        style={{
          color: 'rgba(0, 0, 0, 0.85)',
          marginBottom: '20px',
        }}
      >
        {request.description}
      </ReviewText>
      <Row>
        <Col span={6}>
          <StepBackButton onClick={() => goBack()}>
            {t('Step3Review.back')}
          </StepBackButton>
        </Col>
        <Col span={16} offset={2}>
          <StepForwardButton
            loading={isSubmitting}
            onClick={() => saveRequest(request)}
          >
            {t('Step3Review.submit')}
          </StepForwardButton>
        </Col>
      </Row>
    </MainDiv>
  );
};
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
`;

const Title = styled.h4`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

const ReviewText = styled.p`
  margin-bottom: 3px;
  font-family: Roboto, sans-serif;
`;

export interface RequestInput {
  type: string;
  other: string;
  description: string;
  streetAddress: string;
}

export interface Step3ReviewProps {
  isSubmitting: boolean;
  request: RequestInput;
  saveRequest: Function;
  goBack: Function;
}

export default Step3Review;
