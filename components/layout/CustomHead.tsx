import Head from "next/head";
interface MetaInfo {
  page_title?: string;
  page_description?: string;
  page_keywords?: string;
}

function CustomHead(meta: MetaInfo) {
  return (
    <Head>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <meta name="keywords" content={meta.page_keywords} />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={meta.page_description} />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link
        rel="shortcut icon"
        href="/7237492031/favicon.svg"
        type="image/x-icon"
      />
      <title>{meta.page_title}</title>
    </Head>
  );
}

CustomHead.defaultProps = {
  page_title: "Acute Dashboard",
  page_description: "My site description",
  page_keywords: "managing",
};

export default CustomHead;
