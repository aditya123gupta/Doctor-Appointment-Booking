import { useEffect, useRef, useContext } from 'react';
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import { authContext } from '../../context/AuthContext';

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleScroll = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky_header');
    } else {
      headerRef.current.classList.remove('sticky_header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

  useEffect(() => {
    console.log("User photo URL:", user?.photo); // Check the value of user.photo
  }, [user]);

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* logo */}
          <div>
            <img src={logo} alt="Logo" />
          </div>
          {/* menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.path}
                    className={navClass => navClass.isActive
                      ? "text-primaryColor text-[16px] leading-7 font-[600]"
                      : "text-textColor text-[16px] leading-7 font-[500] hover:text-color-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav right */}
          <div className="flex items-center gap-4">
            {
              token && user ? (
                <div className="flex items-center">
                  <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                      <img 
                        src={user?.photo} 
                        className="w-full rounded-full" 
                        alt="User" 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/35'; // Fallback image URL
                          e.target.alt = 'Default Image';
                        }} 
                      />
                    </figure>
                  </Link>
                  <h2 className="text-textColor text-sm ml-2">{user?.name}</h2> {/* Added ml-2 for margin */}
                </div>
              ) : (
                <Link to='/login'>
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    Login
                  </button>
                </Link>
              )
            }

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
