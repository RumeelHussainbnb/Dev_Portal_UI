import fetch from '../utils/fetcher';

export async function loadSpecialTagHot() {

    const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/specialtag/Hot`
      );

    return data
}