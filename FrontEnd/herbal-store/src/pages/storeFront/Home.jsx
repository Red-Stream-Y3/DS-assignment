import React, { useState } from 'react';
import {
  Navbar,
  HomeProducts,
  UserProfile,
  OrderTracker,
  Shops,
} from '../../components';

function Home() {
  const [activeComponent, setActiveComponent] = useState('homeProducts');

  const clickAction = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <Navbar clickAction={clickAction} />
      {activeComponent === 'homeProducts' && <HomeProducts />}
      {activeComponent === 'shop' && <Shops />}
      {activeComponent === 'orderTracker' && <OrderTracker />}
      {activeComponent === 'userProfile' && <UserProfile />}
    </div>
  );
}

export default Home;
