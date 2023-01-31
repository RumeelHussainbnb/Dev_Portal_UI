import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  function richSnippet(){
    return {
      __html: `{
        "@context": "https://schema.org/",
          "@type": "WebSite",
          "name": "BNB Chain Dev",
          "url": "https://bnbdev.community/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "{search_term_string}",
            "query-input": "required name=search_term_string"
          }
      }`
  }
}

function breadcrumbs(){
  return{
    __html: `{
      "@context": "https://schema.org/", 
        "@type": "BreadcrumbList", 
        "itemListElement": [{
          "@type": "ListItem", 
          "position": 1, 
          "name": "BNB Chain Dev",
          "item": "https://bnbdev.community/"  
        },{
          "@type": "ListItem", 
          "position": 2, 
          "name": "Newsletters",
          "item": "https://bnbdev.community/newsletters"  
        },{
          "@type": "ListItem", 
          "position": 3, 
          "name": "Submit new content",
          "item": "https://bnbdev.community/submit"  
        },{
          "@type": "ListItem", 
          "position": 4, 
          "name": "BNBChain Development Course",
          "item": "https://bnbdev.community/course"  
        },{
          "@type": "ListItem", 
          "position": 5, 
          "name": "BNB Tutorials",
          "item": "https://bnbdev.community/library/tutorials"  
        },{
          "@type": "ListItem", 
          "position": 6, 
          "name": "BNB Articles",
          "item": "https://bnbdev.community/library/articles"  
        },{
          "@type": "ListItem", 
          "position": 7, 
          "name": "BNB Podcasts",
          "item": "https://bnbdev.community/library/podcasts"  
        },{
          "@type": "ListItem", 
          "position": 8, 
          "name": "BNB Dapp Development",
          "item": "https://bnbdev.community/library/projects"  
        }]
    }`
  }
}
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />

        {/*<script
          type="application/ld+json"
          dangerouslySetInnerHTML={richSnippet()}
          key="product-jsonld"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={breadcrumbs()}
          key="product-jsonld"
        />
      */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
