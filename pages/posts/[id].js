import Head from "next/head";
import Date from '../../components/date';
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from "../../lib/posts";

//3
//そうすることでコンポーネントのpropsにpostDataを渡すと
export default function Post({ postData }) {
  return (
    //title,idはmdファイルのメタデータの部分でidはファイル名自身
    <Layout>
      <Head>{postData.title}</Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
    //4
    //↑の部分を表示することができる
    // -----
    // <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />について
    //divタグのなかにpostDataのcontentHtmlを入れ込んでいる
  );
}
//1番目
//まずこれで動的なidでどんなページを表示する可能性があるのか
//今回ならpre-renderingとssg-ssrの2つを読み込む
//ビルとした時に事前に静的ファイルとして用意
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

//2
//表示するコンテンツがなんなのか、データはどこにあるのかっていうのをgetStaticPropsでデータをとってくる
//そのデータっていうのはgetPostDataっていうpost.jsにある関数を使ってファイルの中身を読み込む（post.js getPostData参照）
//getPostDataから渡ってくるデータが結果的にtitle,id,date
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    //postのものをリターンしている
    //getStaticPropsがリターンする値は必ずオブジェクト型でkeyにpropsを持っている必要がある
    //propsのvalueがオブジェクト型でpostData
    props: {
      postData,
    },
  };
}
