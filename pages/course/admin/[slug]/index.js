import React, { useEffect, useState } from 'react';
import { Container } from '../../../../components/layout';
import { useRouter } from 'next/router';
import { http } from '../../../../utils/http';

import ViewCourseDetailAdmin from '../../../../components/course/viewCourseDetail';
import Table from '../../../../components/course/table-new';

const CourseDetailAdmin = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState(null);
  const metaTags = {
    title: 'BNB Chain - Course Detail Admin',
    description: 'Course Detail Admin',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/admin/${slug}`,
    shouldIndex: false
  };

  useEffect(() => {
    const getCourse = async () => {
      if (slug) {
        const { data } = await http.get(`/course/full-course-slug/${slug}`);
        setCourse(data.data[0]);
      }
    };
    getCourse();
  }, [slug]);

  return (
    <Container metaTags={metaTags}>
      <div className="w-full bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800">
        <div onClick={() => router.back()}>back</div>

        <ViewCourseDetailAdmin
          longTitle={course?.longTitle}
          shortTitle={course?.shortTitle}
          description={course?.description}
        />
        <Table courseContent={course.modules} isAdmin={true} slug={slug} />
      </div>
    </Container>
  );
};

export default CourseDetailAdmin;
