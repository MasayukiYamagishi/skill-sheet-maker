import Profile from '@/app/routes/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './app/Layout';
import Home from './app/routes/Home';
import { sampleUsers } from './test/sampleUser';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={sampleUsers[0]} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
