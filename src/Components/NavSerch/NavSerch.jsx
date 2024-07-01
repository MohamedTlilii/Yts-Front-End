// NavSearch.js
import React, { useContext } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import SearchNav from '../../Components/SearchNav/SearchNav';
import { StoreContext } from '../../StoreContext';

const NavSearch = () => {
  const [store] = useContext(StoreContext);

  return (
    <div>
      <Navbar />
      {store.showNavbar && <SearchNav />}
    </div>
  );
};

export default NavSearch;
