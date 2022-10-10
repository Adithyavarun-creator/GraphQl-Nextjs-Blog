import React from "react";
import Link from "next/link";
import classes from "./BlogCard.module.css";

const BlogCard = ({ post }) => {
  const { title, author, coverPhoto, datePublished, slug } = post;

  return (
    <div className={classes.blogcontainer}>
      <Link href={`/posts/${slug}`} className={classes.Link}>
        <div>
          <img src={coverPhoto?.url} className={classes.blogImage} alt="" />
        </div>
      </Link>
      <div className={classes.blogSubs}>
        <img src={author?.avatar.url} className={classes.avatar} alt="" />
        <h1 className={classes.title}>Related to {title}</h1>
        <h2 className={classes.date}>Published at {datePublished}</h2>
      </div>
    </div>
  );
};

export default BlogCard;
