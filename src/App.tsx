import PostList from "./components/PostList/PostList";

function App() {

  const styles = {
    appContainer: {
      margin: '3rem'
    },
  };

  return (
    <div style={styles.appContainer}>
      <h1>CRUD App</h1>
      <PostList />
    </div>
  );
}

export default App;
