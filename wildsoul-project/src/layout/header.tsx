import { Link } from "react-router-dom";
import { useState } from "react";
import lockIcon from "../assets/lock.png"; // lägg till egen ikon
import frameLogo from "../assets/Frame.png"; // lägg till egen ikon
import fallbackImage from "../assets/profile.png"; // lägg till egen ikon


export const Header = () => {
  // MOCK: ändra till auth-logik sen
  const [isLoggedIn, setIsLoggedIn] = useState(false);
console.log(isLoggedIn);
setIsLoggedIn(true);
  const user = {
    name: "Therese",
    profilePicture: "" // ← töm om du vill testa fallback
  };

  return (
    <header className="headerContainer">
      <nav className="headerNav">
        <ul className="headerList">
          <li><Link to="/" className="headerListItem text-gold "> <img src={frameLogo} alt="Logo" className="logo-img" /></Link></li>
          <li><Link to="/traning" className="headerListItem text-gold ">TRÄNING ▼ </Link></li>
          <li><Link to="/naring" className="headerListItem text-gold ">NÄRING/KOST ▼ </Link></li>
          <li><Link to="/community" className="headerListItem text-gold ">COMMUNITY ▼ </Link></li>
          <li><Link to="/shop" className="headerListItem text-gold ">SHOP ▼ </Link></li>
          <li><Link to="/wildsoulweekly" className="headerListItem text-gold ">WILDSOUL WEEKLY ▼ </Link></li>
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
  );
};