import React from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
  children
}) => {
  const intl = useIntl();
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      {children}

      <footer>
        <small>
          All right reserved © {new Date().getFullYear()} to auctux ,made by - 
          <a target="_blank" rel="noopener noreferrer" href="https://www.auctux.com/">
            Auctux
          </a>
        </small>
        <br />
        <div className="social-bagdes">
          <a href="mailto:bakulikiraj@gmail.com" target="_blank" rel="noopener noreferrer">
            <img
              alt="Mail"
              src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
              width="20px"
            />
          </a>
          <a href="mailto:bakulikiraj@gmail.com" target="_blank" rel="noopener noreferrer">
            bakulikiraj@gmail.com
          </a>
        </div>
      </footer> 
    </main>
  );
};

export default Main;