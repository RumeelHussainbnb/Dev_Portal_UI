import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Container } from '../../../../components/layout';
import { http } from '../../../../utils/http';
import EditCourseForm from '../../../../components/course/editCourseForm';

const CourseEditAdmin = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState(null);
  const metaTags = {
    title: 'BNB Chain - Course Detail Admin',
    description: 'Course Detail Admin',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/admin/`,
    shouldIndex: false
  };

  useEffect(() => {
    const getCourse = async () => {
      if (slug) {
        const { data } = await http.get(`/course/${slug}`);
        console.log('data', data);
        setCourse(data.data);
      }
    };
    getCourse();
  }, [slug]);

  return <Container metaTags={metaTags}>{course && <EditCourseForm content={course} />}</Container>;
};

export default CourseEditAdmin;
