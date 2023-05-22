import React from 'react';
import { Container } from '../../../../components/layout';

const CourseDetailAdmin = () => {
  const metaTags = {
    title: 'BNB Chain - Course Detail Admin',
    description: 'Course Detail Admin',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/admin/`,
    shouldIndex: false
  };
  return (
    <Container metaTags={metaTags}>
      <h1>Course Detail Admin</h1>
    </Container>
  );
};

export default CourseDetailAdmin;
