import { useState, useId, useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Container } from '../../../components/layout';
import CourseAdminHeader from '../../../components/course/courseAdminHeader';
import CourseContent from '../../../components/card/card-course';
import { http } from '../../../utils/http';

export default function CourseAdmin({}) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      const { data } = await http.get(`/course/`);
      console.log('data', data);
      setCourse(data.data);
    };
    getCourse();
  }, []);

  const metaTags = {
    title: 'BNB Chain - Course Admin',
    description: 'Course Admin',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/admin`,
    shouldIndex: false
  };

  return (
    <Container metaTags={metaTags}>
      <div className=" mx-auto w-full rounded-lg px-10 py-8 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
        <CourseAdminHeader />

        <CourseContent content={course} />
      </div>
    </Container>
  );
}
