import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './style.css';

const Navbar = ({setShowSearch, watchList}) => {
  const [sticky, setSticky] = useState(false);
  const [responsive, setResponsive] = useState(false);
  const [showSide, setShowSide] = useState(false);

  const handleResponsive = () => {
    if (window.innerWidth < 820) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
  };

  useEffect(() => {
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
    return () => {
      window.removeEventListener('resize', handleResponsive);
    }
  })

  const handleScroll = () => {
    if (window.scrollY > 245) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    if(showSide) {
      document.body.style = 'overflow: hidden';
    }

    return () => {
      document.body.style = 'overflow: auto';
    }
  }, [showSide]);

  const handleShowSearch = () => {
    setShowSide(false);
    setShowSearch(true);
  }

  return (
    <nav className={sticky ? 'navbar sticky' : 'navbar'}>
      <div className='container'>
        <div className='row'>
          <div className='navbar-brand'>
            <Link className='navbar-item link' to='/'>
              <img src="data:image/png;base64,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" alt='MovieRating' className='logo' />
            </Link>
          </div>
          <ul className={responsive ? (showSide ? 'navbar-menu sidebar show' : 'navbar-menu sidebar') : 'navbar-menu'}>
            {
              responsive
              ? 
              (
                <button className="btn close-btn" onClick={() => setShowSide((prev) => false)}>
                  <i className="ri-close-line"></i>
                </button>
              )
              :
              null
            }
            <li className='navbar-item'>
              <Link className='navbar-link' to='/' onClick={() => setShowSide((prev) => false)}>
                Home
              </Link>
            </li>
            <li className='navbar-item'>
              <Link className='navbar-link' to='/#movies' onClick={() => setShowSide((prev) => false)}>
                Movies
              </Link>
            </li>
            {/* <li className='navbar-item'>
              <Link className='navbar-link favourites' to='/favourites' onClick={() => setShowSide((prev) => false)}>
                Favourites
                {
                  watchList.length ? <span className='num'>{watchList.length}</span> : null
                }
              </Link>
            </li>
            <li className='navbar-item'>
              <Link className='navbar-link' to='/#Subscribe' onClick={() => setShowSide((prev) => false)}>
                Subscribe
              </Link>
            </li> */}
            <li className='navbar-item'>
              <button className='navbar-link btn' onClick={() => handleShowSearch()}>
                Search
              </button>
            </li>
          </ul>
            {responsive ? (
              <div className='right-btns'>
                <button className='btn menu-toggle' onClick={() => setShowSide((prev) => true)}>
                  <i className='ri-menu-3-line'></i>
                </button>
              </div>
            ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;