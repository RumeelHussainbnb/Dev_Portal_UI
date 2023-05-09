import fetch from '../utils/fetcher';

export async function loadCourseProgress(params) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/userProgress/allprogress/${params}`
  );

  return data.data;
}

export async function onCourseStatusCheck(userId, courseId) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/userProgress/check/${userId}/${courseId}`
  );

  return data.data;
}

export async function onGetUserProgress(userId) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/userProgress/allprogress/${userId}`
  );

  return data.data;
}

export async function onUpdateUserProgress(params) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/userProgress/`, params);

  return data.data;
}

export async function onBatchCreate(params) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/userProgress/batchCreate`,
    params
  );
  return data.data;
}
