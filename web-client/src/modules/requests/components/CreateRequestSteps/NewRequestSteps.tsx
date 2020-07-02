import React from 'react';

import Step1 from './Step1ChooseLocation';
import Step2 from './Step2DescriptionTypeTags';
import Step3 from './Step3Review';
import Step4 from './Step4Confirmation';

const NewRequestSteps: React.FC<NewRequestStepsProps> = ({
  currentStep,
}): React.ReactElement => {
  const dummyFunction = () =>
    // eslint-disable-next-line no-console
    console.log('dummy function called');
  const dummyStringFunction = (str: string) =>
    // eslint-disable-next-line no-console
    console.log('dummy string function called', str);
  const dummyRequestObject = {
    type: 'foo',
    other: 'foo',
    description: 'foo',
    streetAddress: 'foo',
  };
  const steps = [
    {
      title: 'Locate your request',
      content: (
        <Step1
          onSubmit={dummyFunction}
          request={dummyRequestObject}
          setStreetAddress={dummyStringFunction}
          setMapAddress={dummyStringFunction}
          setMyLocation={dummyFunction}
        />
      ),
    },
    {
      title: 'Describe your request',
      content: (
        <Step2
          onSubmit={dummyFunction}
          request={dummyRequestObject}
          setStreetAddress={dummyStringFunction}
          setMapAddress={dummyStringFunction}
          setMyLocation={dummyFunction}
        />
      ),
    },
    {
      title: 'Review your request',
      content: (
        <Step3
          isSubmitting={false}
          request={dummyRequestObject}
          saveRequest={dummyFunction}
          goBack={dummyFunction}
        />
      ),
    },
    {
      title: 'Request confirmed!',
      content: <Step4 showModal={false} closeModal={dummyFunction} />,
    },
  ];

  return (
    <>
      <div className="steps-content">{steps[currentStep].content}</div>
    </>
  );
};

interface NewRequestStepsProps {
  currentStep: number;
  setCurrentStep: Function;
  onLoginGoogle: Function;
  onLoginFacebook: Function;
  onEmailSignInUp: Function;
}

export default NewRequestSteps;
