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
  } /*else if (content.Url && content.Url.includes('twitter')) {
    return '/twitter-placeholder.webp';
  } */else if (content.ContentType === 'tutorials') {
    return '/tutorials-placeholder.jpg';
  } else if (content.ContentType === 'articles') {
    return '/article-pana.svg';
  } else if (content.ContentType === 'ama') {
    return '/ama-placeholder.png';
  } else if (content.ContentType === 'security') {
    return '/security-placeholder.png';
  } else if (content.ContentType === 'podcasts') {
    return '/podcast-placeholder.png';
  } else if (content.ContentType === 'implementations') {
    return '/implementations-placeholder.png';
  } else if (content.ContentType === 'projects') {
    return '/dappdev-placeholder.png';
  } else if (content.ContentType === 'scaffolds') {
    return '/scaffolds-placeholder.png';
  } 


  return '/placeholder.webp';
}
