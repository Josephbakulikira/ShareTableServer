import React, { useState } from 'react';
import Aside from './Aside';
import Main from './Main';

function Layout(props) {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    
    setCollapsed(!collapsed);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
    props.setLocale(checked ? 'fr' : 'en');
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <Aside
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange = {handleCollapsedChange}
      />
      <Main handleToggleSidebar={handleToggleSidebar}>
      {props.children}

        </Main>
      {/* <props.children/> */}
    </div>
  );
}

export default Layout;
