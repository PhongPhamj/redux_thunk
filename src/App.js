import PostList from "./feature/posts/PostList";
import AddPostForm
 from "./feature/posts/AddPostForm";
function App() {
  return (
    <main className="App">
      <AddPostForm/>
      <PostList/>     
    </main>
  );
}

export default App;
