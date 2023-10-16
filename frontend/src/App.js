import { Route, Routes } from 'react-router-dom';
import './App.css';
import Todopage from './page/todopage';
import Eidittodo from './page/eiditpage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Todopage />} />
        <Route path="todoeidit/:id" element={<Eidittodo />}/>
      </Routes>
    </>
  );
}

export default App;
