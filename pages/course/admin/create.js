import React from 'react';
import { Container } from '../../../components/layout';
import CourseForm from '../../../components/course/addCourseForm';

const CourseCreateAdmin = () => {
  const metaTags = {
    title: 'BNB Chain - Course Create Admin',
    description: 'Course Create Admin',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/admin/create`,
    shouldIndex: false
  };
  return (
    <Container metaTags={metaTags}>
      <CourseForm />
    </Container>
  );
};

export default CourseCreateAdmin;
