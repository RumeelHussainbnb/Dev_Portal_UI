/**
 * Card Image helper function
 * @param {Object} content
 * @return {String}
 */
export default function defineImage(content) {
  if (content.Img) {
    return content.Img;
  } else if (content.ContentType === 'newsletters') {
    return '/Weekly_Report.jpg';
  }else if (content.ContentType === 'threads') {
    return '/twitter-placeholder.webp';
  } else if (content.Url && content.Url.includes('twitter') && content.ContentType === 'podcasts') {
    return '/twitter-placeholder.webp';
  } else if (content.ContentType === 'tutorials') {
    return '/tutorials-placeholder.jpg';
  } else if (content.ContentType === 'articles') {
    return '/article-pana.svg';
  } 

  return '/placeholder.webp';
}
