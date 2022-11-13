import fetch from '../utils/fetcher';

export async function loadSpecialTagNew() {

    const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/specialtag/New`);


    return data
}