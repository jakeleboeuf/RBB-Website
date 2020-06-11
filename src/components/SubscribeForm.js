import React from 'react';
import * as Sentry from '@sentry/browser';

import { FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/core';
import Button from './Button';

const FORM_USER = 'a5fccdceb916e00a46d603ed8';
const FORM_ID = '992a06eec8';

const SubscribeForm = () => {
  const formAction = `https://rebuildblackbusiness.us10.list-manage.com/subscribe/post?u=${FORM_USER}&amp;id=${FORM_ID}`;

  const handleSubmit = values => {
    Sentry.configureScope(scope => {
      scope.setUser({
        id: values.EMAIL,
        username: values.EMAIL,
        role: FORM_ID,
      });
    });
  };

  return (
    <form action={formAction} method="post" noValidate onSubmit={handleSubmit}>
      <Stack spacing={8}>
        <FormControl isRequired>
          <FormLabel htmlFor="mce-EMAIL">Email Address</FormLabel>
          <Input type="email" name="EMAIL" id="mce-EMAIL" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="mce-FNAME">First Name</FormLabel>
          <Input type="text" name="FNAME" id="mce-FNAME" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="mce-LNAME">Last Name</FormLabel>
          <Input type="text" name="LNAME" id="mce-LNAME" />
        </FormControl>

        <div
          style={{ position: 'absolute', left: '-5000px' }}
          aria-hidden="true"
        >
          <input
            type="text"
            name={`b_${FORM_USER}_${FORM_ID}`}
            tabIndex="-1"
            defaultValue=""
          />
        </div>

        <Button type="submit" name="subscribe">
          Subscribe
        </Button>

        <Text fontSize="xs">
          We won't sell your email address or personal info. You can unsubscribe
          at any time using the link in our emails
        </Text>
      </Stack>
    </form>
  );
};

export default SubscribeForm;
