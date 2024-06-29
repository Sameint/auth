

import Nav from './Nav';
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Paginate from './Paginate';
import InfiniteScrol from './InfiniteScrol';
import PaginationData from './PaginationData';
function App() {
  return (
    <div className="App">
     <Nav/>
     <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/Signin"  element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Paginate" element={<Paginate />} />
          <Route path="/InfiniteScrol" element={<InfiniteScrol />} />
          <Route path="/PaginationData" element={<PaginationData />} />
        </Route>
      </Routes>
    </BrowserRouter>
</div>
  );
}

export default App;
