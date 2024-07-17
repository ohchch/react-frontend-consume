import logo from './logo.svg';
import './App.css';
import UserAuth from './UserAuth';
import UserComponent from './UserCompenent';
import TaskCreate from './TaskCreate';
import UserInformation from './UserInformation';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <UserInformation />
      <UserComponent />
      <UserAuth />
      <TaskCreate />
    </div>
  );
}

export default App;
