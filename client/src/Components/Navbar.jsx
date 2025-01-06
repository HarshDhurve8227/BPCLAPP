import React, { useState, useContext, useEffect } from 'react';
import myLogo from './images/1723176521233.png';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';
import NotificationModal from './NotificationModal';

export default function Navbar(props) {
  const { logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlighted, setHighlighted] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleNotificationClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Redirect to login or home page after logout
  };

  // Handle search input change
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;

    // Find all elements that might contain the search term
    const elements = document.querySelectorAll('table td'); // Adjust this selector based on your page structure

    elements.forEach((element) => {
      if (element.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
        // Scroll to the first match
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight the matching text
        const innerHTML = element.innerHTML;
        const index = innerHTML.toLowerCase().indexOf(searchTerm.toLowerCase());
        if (index !== -1) {
          element.innerHTML = `${innerHTML.slice(0, index)}<mark>${innerHTML.slice(index, index + searchTerm.length)}</mark>${innerHTML.slice(index + searchTerm.length)}`;
          setHighlighted(true);

          // Remove highlight after 10 seconds
          setTimeout(() => {
            element.innerHTML = innerHTML;
            setHighlighted(false);
          }, 10000);
        }
      }
    });
  };

  // Add effect for handling dropdown submenus
  useEffect(() => {
    const submenus = document.querySelectorAll('.dropdown-submenu');

    // Store event handler functions to remove later
    const handleMouseOver = (submenu) => {
      submenu.querySelector('.dropdown-menu').style.display = 'block';
    };

    const handleMouseLeave = (submenu) => {
      submenu.querySelector('.dropdown-menu').style.display = 'none';
    };

    const handleClick = (submenu, event) => {
      event.preventDefault(); // Prevent default action for links
      const dropdownMenu = submenu.querySelector('.dropdown-menu');
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    };

    submenus.forEach((submenu) => {
      const submenuLink = submenu.querySelector('.dropdown-item');

      // Show the submenu on hover
      submenuLink.addEventListener('mouseover', () => handleMouseOver(submenu));
      submenu.addEventListener('mouseleave', () => handleMouseLeave(submenu));

      // Optionally, toggle on click
      submenuLink.addEventListener('click', (event) => handleClick(submenu, event));
    });

    // Cleanup event listeners
    return () => {
      submenus.forEach((submenu) => {
        const submenuLink = submenu.querySelector('.dropdown-item');
        submenuLink.removeEventListener('mouseover', () => handleMouseOver(submenu));
        submenu.removeEventListener('mouseleave', () => handleMouseLeave(submenu));
        submenuLink.removeEventListener('click', (event) => handleClick(submenu, event));
      });
    };
  }, []);

  return (
    <>
      <div>
        <div className="container">
          <div className="scrolling-text">
            <p className="text-danger" style={{ fontSize: '20px', fontWeight: 'bold' }}>
              www.bpspareslpgnagpur.com
            </p>
          </div>
          <img id="resize-image" src={myLogo} alt="Logo" className="fixed-size-image" />
        </div>

        <nav className="navbar navbar-expand-lg bg-info">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active text-white fs-4" aria-current="page" href="/home">
                    {props.title}
                  </a>
                </li>

                <li className="dropdown" style={{ padding: '10px', marginBottom: '5px' }}>
                  <button
                    id="dropdownMenuButton"
                    className="btn btn-dark btn-outline-warning dropdown-toggle nav-link active text-dark"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    SPARES
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <a className="dropdown-item" href="/products" aria-current="page">
                        Electrician
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/firefight">
                        FireFighting
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/technician">
                        Technician
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="dropdown" style={{ padding: '10px', marginBottom: '5px' }}>
                  <button
                    id="dropdownMenuButton"
                    className="btn btn-dark btn-outline-warning dropdown-toggle nav-link active text-dark"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    AMC
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <a className="dropdown-item" href="/amc">
                        Annual Maintainance Contract
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="dropdown" style={{ padding: '10px', marginBottom: '5px' }}>
                  <button
                    id="dropdownMenuButton"
                    className="btn btn-dark btn-outline-warning dropdown-toggle nav-link active text-dark"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    RACKS
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <a className="dropdown-item" href="/about">
                        Store Racks
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="/rackadmin">
                        Admin Racks
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="dropdown" style={{ padding: '10px', marginBottom: '5px' }}>
                  <button
                    id="dropdownMenuButton"
                    className="btn btn-dark btn-outline-warning dropdown-toggle nav-link active text-dark"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    SOP HANDLING
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <a className="dropdown-item" href="" aria-current="page" onClick={() => console.log('Action')}>
                        SOP LPG BULK HANDLING FORMATS 120411
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        SOP PLANNING FORMATS
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="#">
                      SOP BOTTLING OPS FORMAT 130411
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item" href="#">
                        SOP ADMIN & SECURITY FORMATS
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="/AS11">
                            Checklist For Packed Lorries
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/as10">
                            Checklist for bulk lpg tank trunks at unloading location
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/as09">
                            Packed Lorry In/Out Register
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/as08">
                            Tank lorry In/Out Register
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/as06">
                            Tank lorry Checklist
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/as12">
                            Material in Register
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/as14">
                            Material out Register 
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/as15">
                            Returnable Material Register
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/as16">
                            Handing over checklist to security
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/as17">
                            Security guard petrolling record
                          </a>
                        </li>

                       
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>

              <NotificationModal show={showModal} handleClose={handleCloseModal} />

              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleChange}
                  style={{ width: '50%' }} // Set the width to 50%
                />
                <button className="btn btn-dark fs-5 custom-table-head" type="submit">
                  Search
                </button>
              </form>

              {/* Add the Logout Button */}
              <button className="btn btn-danger text-white ms-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
