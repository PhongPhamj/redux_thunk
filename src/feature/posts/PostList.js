import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import React from "react";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //fetch API
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  //Display content based on API fetching status
  let content;
  if (postStatus === "loading") {
    console.log("loading");
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    console.log("succeeded");
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));
    // content = orderedPosts.map((post) => (
    //   <PostsExcerpt key={post.id} post={post} />
    // ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}

export default PostList;
