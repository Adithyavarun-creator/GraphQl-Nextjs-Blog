import { GraphQLClient, gql } from "graphql-request";
import classes from "../../styles/BlogCard.module.css";

const graphCMS = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl91lm1i926c601t2e4i91q6y/master"
);

const Query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;
export async function getStaticPaths() {
  const { posts } = await graphCMS.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphCMS.request(Query, { slug });
  const post = data.post;
  return {
    props: {
      post: post,
    },
    revalidate: 10,
  };
}

const Article = ({ post }) => {
  //console.log(post);
  return (
    <div className={classes.articleContainer}>
      <img src={post.coverPhoto.url} className={classes.blogPicture} alt="" />
      <div className={classes.blogBy}>
        <img src={post.author.avatar.url} className={classes.authorImage} />
        <h2 className={classes.authorName}>Posted by {post.author.name}</h2>
        <h2 className={classes.authorName}>at {post.datePublished}</h2>
      </div>
      <h2 className={classes.title}>This is about {post.title}</h2>
      <article
        className={classes.postArticle}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></article>
    </div>
  );
};

export default Article;
