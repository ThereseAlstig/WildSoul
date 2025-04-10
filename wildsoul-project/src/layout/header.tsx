import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import traningLogo from "../assets/traning.png"; 
import naringLogo from "../assets/naring.png"; 
import lockIcon from "../assets/lock.png"; 
import frameLogo from "../assets/Frame.png"; 
import fallbackImage from "../assets/profile.png"; 


export const Header = () => {
  // MOCK: ändra till auth-logik sen
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  let logoToShow = frameLogo;

  useEffect(() => {
    void setIsLoggedIn; // Detta använder funktionen utan att göra något
  }, []);
  
  if (location.pathname.startsWith("/traning")) {
    logoToShow = traningLogo;
  } else if (location.pathname.startsWith("/naring")) {
    logoToShow = naringLogo;
  }else{
    logoToShow = frameLogo;
  }


  const user = {
    name: "Therese",
    profilePicture: "" // ← töm om du vill testa fallback
  };

  return (
    <header className="headerContainer">
      <nav className="headerNav">
     
        <ul className="headerList">
          <li><Link to="/" className="headerListItem text-gold "> <img src={logoToShow} alt="Logo" className="logo-img" /></Link></li>
          
          <li className="headerListItem text-gold dropdown">
  <span className="font-header">TRÄNING ▼</span>
  <ul className="dropdownMenu">
    <li><Link to="/traning" className="text-gold">TRÄNING</Link></li>
    <li><Link to="/traning/styrka" className="text-gold">UTMANINGAR</Link></li>
    <li><Link to="/traning/kondition" className="text-gold">TRÄNINGSPLANERARE</Link></li>
    <li><Link to="/traning/mobilitet" className="text-gold">FOKUS</Link></li>
  </ul>
</li>
         <li className="headerListItem text-gold dropdown">
  <span className="font-header">NÄRING/KOST ▼</span>
  <ul className="dropdownMenu">
          <li><Link to="/naring" className="text-gold ">NÄRING/KOST</Link></li>
          <li><Link to="/naring/recept" className="text-gold ">RECEPT/GLUTENFFRITT</Link></li>
          <li><Link to="/naring/tips" className="text-gold ">TIPS</Link></li>
          <li><Link to="/naring/livsstil" className="text-gold ">LIVSSTIL</Link></li>
         </ul>
         
         </li>
          
         <li className="headerListItem text-gold dropdown">
         <span className="font-header">COMMUNITY ▼</span>
          <ul className="dropdownMenu">
          <li><Link to="/community" className="headerListItem text-gold">COMMUNITY </Link></li>
          <li><Link to="/community/forum" className="headerListItem text-gold">FORUM</Link></li>
          <li><Link to="/community/medlemmar" className="headerListItem text-gold">MEDLEMMAR</Link></li>
          <li><Link to="/community/inspiration" className="headerListItem text-gold">INSPIRATION</Link></li>
          <li><Link to="/community/meetups" className="headerListItem text-gold">MEETUPS</Link></li>
          
          </ul>

</li>

<li className="headerListItem text-gold dropdown">
         <span className="font-header">SHOP ▼</span>
          <ul className="dropdownMenu">
          <li><Link to="/shop" className="headerListItem text-gold ">SHOP</Link></li>
          <li><Link to="/shop/frukost" className="headerListItem text-gold ">FRUKOST/MELLANMÅL</Link></li>
          <li><Link to="/shop/bakning" className="headerListItem text-gold ">BAKNING</Link></li>
          <li><Link to="/shop/traning" className="headerListItem text-gold ">TRÄNING</Link></li>
          <li><Link to="/shop/wildsoul-produkter" className="headerListItem text-gold ">WILDSOUL-PRODUKTER</Link></li>
          <li><Link to="/shop/kundkorg" className="headerListItem text-gold ">KUNDKORG</Link></li>
</ul>
        </li>

          <li className="headerListItem text-gold dropdown">
         <span className="font-header">WILDSOUL WEEKLY  ▼</span>
          <ul className="dropdownMenu">
          <li><Link to="/wildsoulweekly" className="headerListItem text-gold ">WILDSOUL WEEKLY</Link></li>
          <li><Link to="/wildsoulweekly/recept" className="headerListItem text-gold ">RECEPT</Link></li>
          <li><Link to="/wildsoulweekly/kosttips" className="headerListItem text-gold ">KOSTTIPS</Link></li>
          <li><Link to="/wildsoulweekly/traningsinspiration" className="headerListItem text-gold ">TRÄNINGSINSPIRATION</Link></li>
          <li><Link to="/wildsoulweekly/ovrigt" className="headerListItem text-gold ">ÖVRIGT</Link></li>
</ul>
        </li>

        </ul>
      </nav>

      <div className="loginArea">
        {isLoggedIn ? (
          <img
          src={user?.profilePicture || fallbackImage}
          alt="Profilbild"
          className="profileImg"
        />
        ) : (
          <button className="loginBtn text-gold ">
            <img src={lockIcon} alt="Logga in" className="lockIcon " />
            LOGGA IN
          </button>
        )}
      </div>
    </header>
  )
};