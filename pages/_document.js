import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  function richSnippet() {
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
    };
  }

  function breadcrumbs() {
    return {
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
    };
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
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5PHXRNS');
          `}
        </Script>
      </Head>

      <body>
        <Main />
        <NextScript />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5PHXRNS"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
      </body>
    </Html>
  );
}
