import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";


export default function MyPage() {

      const auth = useContext(AuthContext);
      
  if (!auth) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }  
  const { logout, isAuthenticated, username } = auth;

    const navigate = useNavigate(); 


    //Utloggning för samtliga anändare Även google och github användare
    const handleLogout = async () => {
      console.log('logout');
      try {
        console.log('logging out');
        logout(); 
        navigate('/'); 
        
      } catch (err) {
        console.error('Logout failed', err);
      }
    };

    function capitalizeName(fullName: string) {
      return fullName
        .split(" ")
        .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
        .join(" ");
    }
    return (
        <div>
         { !isAuthenticated && (
            <div className="">
                <h1 className="center">Log in to see your trips</h1>
                <div className="cart-links">
      
</div>
                <button className="loginButton" onClick={() => navigate('/login')}>Log In</button>
            </div>
          )}

 { isAuthenticated &&(
<>
            <h2 className="center">Welcome {username ? capitalizeName(username) : "User"}!</h2>
            <button className="logoutButton" onClick={handleLogout}>Log Out</button>
  
        
</>
      )}     </div>
          

      

    );
}
