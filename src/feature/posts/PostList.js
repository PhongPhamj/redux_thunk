import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import React from "react";
import { useEffect, useRef } from "react";
import PostsExcerpt from "./PostsExcerpt";

function PostList() {
  const effectRan = useRef(false)

  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //fetch API
  useEffect(() => {
    if (postStatus === "idle" && effectRan.current === false) {
      dispatch(fetchPosts());
      // effectRan.current = true
      return ()=>{ //this shit is called cleanup function, viết hết các cleanup vào đây cho đẹp code
        effectRan.current = true
      }
    }
  }, [postStatus, dispatch]);


  console.log("rerendered")
  //Display content based on API fetching status
  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }



  return (
    <section>
      {content}
    </section>
  );
}

export default PostList;
