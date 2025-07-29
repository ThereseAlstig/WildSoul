import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useContext} from "react";
import traningLogo from "../assets/traning.png"; 
import naringLogo from "../assets/naring.png"; 

import frameLogo from "../assets/Frame.png"; 
import fallbackImage from "../assets/profile.png"; 
import meLogo from "../assets/me2.png";
import shopLogo from "../assets/shop2.png";
import communityLogo from "../assets/comm.png";
import { AuthContext } from "../context/authContext";
import LoginModal from "../components/login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";


export const Header = () => {
  // MOCK: ändra till auth-logik sen
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

   const [isModalOpen, setIsModalOpen] = useState(false);
    const auth = useContext(AuthContext);
    // const [isOpen, setIsOpen] = useState(false);

    
    
    if (!auth) {
      throw new Error('AuthContext must be used within an AuthProvider');
    }
    
     const { isAuthenticated  } = auth;
  

    // const toggleMenu = () => {
    //     setIsOpen(!isOpen);
    // };

    const openModal = () => {
        setIsModalOpen(true);  // Öppna modalen när användaren vill logga in eller skapa konto
      };
    
      const closeModal = () => {
        setIsModalOpen(false); // Stäng modalen när användaren trycker på "stäng"
      };
    
    

      // const handleCloseMenu = () => {
      //   setIsOpen(false);
      // };

  let logoToShow = frameLogo;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // useEffect(() => {
  //   void setIsLoggedIn; // Detta använder funktionen utan att göra något
  // }, []);

  const toggleDropdown = (menuName: string) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };
  
  // Klick utanför => stäng meny
  const dropdownRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  if (location.pathname.startsWith("/traning")) {
    logoToShow = traningLogo;
  } else if (location.pathname.startsWith("/naring")) {
    logoToShow = naringLogo;
  
  } else if (location.pathname.startsWith("/shop")) {
    logoToShow = shopLogo;
  
  } else if (location.pathname.startsWith("/community")) {
    logoToShow = communityLogo;
  } else if (location.pathname.startsWith("/wildsoulweekly")) {
    logoToShow = meLogo;
  }else{
    logoToShow = frameLogo;
  }

  const isActive = (basePath: string) => {
    return location.pathname.startsWith(basePath);
  };


  const user = {
    name: "Therese",
    profilePicture: "" // ← töm om du vill testa fallback
  };

  return (
    <header className="headerContainer">
      <nav className="headerNav">
     
        <ul className="headerList">
          <li><Link to="/" className="headerListItem text-gold "> <img src={logoToShow} alt="Logo" className="logo-img" /></Link></li>
          
          <li
  className="headerListItem text-gold dropdown"
  onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown('traning')}
  onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}
>
  <span className={`font-header ${isActive('/traning') ? 'active' : ''}`}
     onClick={() => {
      if (window.innerWidth <= 768) toggleDropdown('traning');
    }}
     >TRÄNING ▼</span>
      {openDropdown === 'traning' && (
  <ul className="dropdownMenu"  style={{ display: openDropdown === 'traning' ? 'block' : 'none' }}>
    <li><Link to="/traning" className="text-gold">TRÄNING</Link></li>
    <li><Link to="/traning/utmaningar" className="text-gold">UTMANINGAR</Link></li>
    <li><Link to="/traning/planner" className="text-gold">TRÄNINGSPLANERARE</Link></li>
    {/* <li><Link to="/traning/mobilitet" className="text-gold">FOKUS</Link></li> */}
  </ul>
    )}
</li>
         <li  className="headerListItem text-gold dropdown"
  onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown('naring')}
  onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}>
  <span className={`font-header ${isActive('/naring') ? 'active' : ''}`}
     onClick={() => {
      if (window.innerWidth <= 768) toggleDropdown('naring');
    }}
    >NÄRING/KOST ▼</span>
     {openDropdown === 'naring' && (
  <ul className="dropdownMenu" style={{ display: openDropdown === 'naring' ? 'block' : 'none' }}>
          <li><Link to="/naring" className="text-gold ">NÄRING/KOST</Link></li>
          <li><Link to="/naring/recept" className="text-gold ">RECEPT/GLUTENFFRITT</Link></li>
          <li><Link to="/naring/tips" className="text-gold ">TIPS</Link></li>
          <li><Link to="/naring/livsstil" className="text-gold ">LIVSSTIL</Link></li>
         </ul>
     )}
         </li>
         <li  className="headerListItem text-gold dropdown"
  onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown('community')}
  onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}>
         <span className={`font-header ${isActive('/community') ? 'active' : ''}`}
          onClick={() => {
            if (window.innerWidth <= 768) toggleDropdown('community');
          }}>COMMUNITY ▼</span>
         {openDropdown === 'community' && (
  <ul className="dropdownMenu" style={{ display: openDropdown === 'community' ? 'block' : 'none' }}>
          <li><Link to="/community" className="headerListItem text-gold">COMMUNITY </Link></li>
          <li><Link to="/community/forum" className="headerListItem text-gold">FORUM</Link></li>
          <li><Link to="/community/medlemmar" className="headerListItem text-gold">MEDLEMMAR</Link></li>
          <li><Link to="/community/inspiration" className="headerListItem text-gold">INSPIRATION</Link></li>
          <li><Link to="/community/meetups" className="headerListItem text-gold">MEETUPS</Link></li>
          
          </ul>
         )}
</li>

<li  className="headerListItem text-gold dropdown"
  onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown('shop')}
  onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}>
         <span className={`font-header ${isActive('/shop') ? 'active' : ''}`}  onClick={() => {
    if (window.innerWidth <= 768) toggleDropdown('shop');
  }}>SHOP ▼</span>
         {openDropdown === 'shop' && (
  <ul className="dropdownMenu" style={{ display: openDropdown === 'shop' ? 'block' : 'none' }}
>
          <li><Link to="/shop" className="headerListItem text-gold ">SHOP</Link></li>
          <li><Link to="/shop/frukost" className="headerListItem text-gold ">FRUKOST/MELLANMÅL</Link></li>
          <li><Link to="/shop/bakning" className="headerListItem text-gold ">BAKNING</Link></li>
          <li><Link to="/shop/traning" className="headerListItem text-gold ">TRÄNING</Link></li>
          <li><Link to="/shop/wildsoul-produkter" className="headerListItem text-gold ">WILDSOUL-PRODUKTER</Link></li>
          <li><Link to="/shop/kundkorg" className="headerListItem text-gold ">KUNDKORG</Link></li>
</ul>
         )}
        </li>

        <li  className="headerListItem text-gold dropdown"
  onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown('wildsoulweekly')}
  onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}>
         <span className={`font-header ${isActive('/wildsoulweekly') ? 'active' : ''}`} onClick={() => {
    if (window.innerWidth <= 768) toggleDropdown('wildsoulweekly');
  }}>WILDSOUL WEEKLY  ▼</span>
         {openDropdown === 'wildsoulweekly' && (
  <ul className="dropdownMenu" style={{ display: openDropdown === 'wildsoulweekly' ? 'block' : 'none' }}
 >
          <li><Link to="/wildsoulweekly" className="headerListItem text-gold ">WILDSOUL WEEKLY</Link></li>
          <li><Link to="/wildsoulweekly/kosttips" className="headerListItem text-gold ">KOSTTIPS</Link></li>
          <li><Link to="/wildsoulweekly/traningsinspiration" className="headerListItem text-gold ">TRÄNINGSINSPIRATION</Link></li>
          <li><Link to="/wildsoulweekly/ovrigt" className="headerListItem text-gold ">ÖVRIGT</Link></li>
</ul>
         )}
        </li>

        </ul>
      </nav>

      <div className="loginArea">
        {isAuthenticated ? (
          <img
          src={user?.profilePicture || fallbackImage}
          alt="Profilbild"
          className="profileImg"
        />
        ) : (
          <button className="loginBtn text-gold " onClick={openModal}>
              <FontAwesomeIcon
  icon={isAuthenticated ? faLock : faLockOpen} className="lockIcon "   title={isAuthenticated ? 'Logged In' : 'Logged Out'}
/> 
            LOGGA IN
          </button>
        )}

        <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
 
      </div>
    </header>
  )
};