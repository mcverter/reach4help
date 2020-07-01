import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StepForwardButton } from 'src/components/Buttons';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import SearchIcon from '../../assets/search.svg';
import { RequestInput } from './RequestReview';

const { Option } = Select;

/* TODO:  type clarification */
export const REQUEST_TYPES = {
  Deliveries: 'Deliveries',
  Other: 'Other',
};

const Step2DescriptionTypeTags: React.FC<Step2DescriptionTypeTagsProps> = ({
  onSubmit,
  request,
  setStreetAddress,
  setMapAddress,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [showOtherField, setShowOtherField] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      streetAddress: request.streetAddress,
      type: request.type || 'Deliveries',
      body: request.description || '',
      other: request.other || '',
    });
    setShowOtherField(form.getFieldValue('type') === 'Other');
  }, [form, request]);

  const toggleOtherField = (value: string) => {
    setShowOtherField(value === 'Other');
  };

  const mayBeOtherField = () => {
    if (!showOtherField) {
      return null;
    }
    return (
      <Form.Item
        name="other"
        rules={[
          {
            required: form.getFieldValue('type') === 'Other',
            message: t('Step2DescriptionTypeTags.form.other_error_message'),
          },
        ]}
      >
        <Input placeholder={t('Step2DescriptionTypeTags.form.other')} />
      </Form.Item>
    );
  };

  const LeftLabelColStyle = styled(Col)`
    font-size: 16x;
    font-weight: 700;
  `;

  const FormContent = (
    <MainDiv>
      <FormDiv>
        <TitleWithAddon level={3} left="0%" transform="none">
          {t('Step2DescriptionTypeTags.title')}
        </TitleWithAddon>

        {/* There is a bug with types regarding onFinish - apparently an issue with @types and antd types
        https://github.com/ant-design/ant-design/pull/21067 - If it's not please fix *.* */}
        <Step2DescriptionTypeTagsForm
          layout="vertical"
          form={form}
          onFinish={values => {
            onSubmit(
              values.type,
              values.body,
              values.streetAddress,
              values.other,
            );
          }}
        >
          <Row justify="space-between" align="middle">
            <Col span={21}>
              <FormItem
                name="streetAddress"
                label={t('Step2DescriptionTypeTags.form.address')}
                rules={[
                  {
                    required: true,
                    message: t(
                      'Step2DescriptionTypeTags.form.address_error_message',
                    ),
                  },
                ]}
              >
                <Input onChange={e => setStreetAddress(e.target.value)} />
              </FormItem>
            </Col>
            <Col span={2}>
              <MapActionButton
                onClick={() => setMapAddress(request.streetAddress)}
              >
                <img
                  src={SearchIcon}
                  style={{
                    maxHeight: '20px',
                    maxWidth: '15px',
                  }}
                  alt="Search for location"
                />
              </MapActionButton>
            </Col>
          </Row>
          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: t('Step2DescriptionTypeTags.form.type_error_message'),
              },
            ]}
          >
            <Row justify="space-between" align="middle">
              <LeftLabelColStyle lg={3} md={4} sm={6} xs={8}>
                {t('Step2DescriptionTypeTags.form.type')}
              </LeftLabelColStyle>
              <Col md={10} sm={12} xs={14}>
                <Select
                  defaultValue={Object.keys(REQUEST_TYPES)[0]}
                  onChange={toggleOtherField}
                >
                  {Object.keys(REQUEST_TYPES).map(key => (
                    <Option value={key} key={key}>
                      {' '}
                      {REQUEST_TYPES[key]}{' '}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col lg={11} md={10} sm={6} xs={2} />
            </Row>
          </Form.Item>
          {mayBeOtherField()}
          <FormItem
            name="body"
            label={t('Step2DescriptionTypeTags.form.body')}
            rules={[
              {
                required: true,
                message: t('Step2DescriptionTypeTags.form.body_error_message'),
              },
            ]}
          >
            <Input.TextArea
              placeholder={t('Step2DescriptionTypeTags.form.body')}
              maxLength={500}
            />
          </FormItem>
          <CharacterLimitDiv>500 Character Limit</CharacterLimitDiv>
          <Row>
            <Col span={24}>
              <StepForwardButton htmlType="submit">
                {t('Step2DescriptionTypeTags.form.submit')}
              </StepForwardButton>
            </Col>
          </Row>
        </Step2DescriptionTypeTagsForm>
      </FormDiv>
    </MainDiv>
  );

  return <>{FormContent}</>;
};
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 16px;
`;

const FormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const CharacterLimitDiv = styled.div`
  font-size: 12px;
  margin-bottom: 24px;
`;

const Step2DescriptionTypeTagsForm = styled(Form)`
  width: 100%;
  margin-top: 16px;
  .ant-form-item-label {
    line-height: 14px;
  }
  label {
    height: 14px;
    font-size: 12px;
  }
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 0;
`;

const MapActionButton = styled(Button)`
  padding: 10px 10px 30px 10px;
  border: 1px solid black;
  border-radius: 17%;
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    background-color: #e0e0e0;
  }
`;

interface Step2DescriptionTypeTagsProps {
  onSubmit: Function;
  request: RequestInput;
  setStreetAddress: (string: string) => void;
  setMapAddress: (string: string) => void;
  setMyLocation: () => void;
}

export default Step2DescriptionTypeTags;
