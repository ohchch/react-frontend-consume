import './Home.css'; // Import CSS stylesheet for styling

function Home() {
  const userId = localStorage.getItem('userId'); // Get user ID from local storage
  const username = 'User'; // Placeholder username (assume retrieved from backend)
  const showTasksFeature = false; // Set to false to hide Create Tasks feature

  return (
    <div className="home-container">
      <h1>Welcome to the Know-Your-Neighborhood</h1>
      <p>This is your go-to place for Know Your Neighborhood.</p>
      {userId ? (
        <div className="user-info">
          <h2>Hello, {username}!</h2>
          {showTasksFeature && (
            <p>You have 5 pending tasks.</p>
          )}
        </div>
      ) : (
        <div className="guest-info">
          <p>Please <a href="/login">login</a> or <a href="/register">register</a> to get started.</p>
        </div>
      )}
      <div className="main-features">
        <h2>Main Features</h2>
        <div className="features">
          {showTasksFeature && (
            <div className="feature">
              <h3>Create Tasks</h3>
              <p>Quickly create and manage your tasks.</p>
              <a href="/tasks">Go to Tasks</a>
            </div>
          )}
          <div className="feature">
            <h3>View Profile</h3>
            <p>Manage your user profile and settings.</p>
            <a href="/profile">Go to Profile</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
