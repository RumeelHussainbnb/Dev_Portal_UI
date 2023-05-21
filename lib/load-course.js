import fetch from '../utils/fetcher';

export async function loadCourse() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/course`);

  return data.data;
}

export async function loadCourseBySlug(slug) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/lesson/${slug}`);
  console.log('data', data);
  return data.data;
}

export async function onCreateCourse(params) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/course`, params);
  return data.data;
}

export async function onOnlyGetName() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/only-name`);
  return data;
}
