import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // För omdirigering i React Router v6
 // För API-anrop
import ReactDOM from "react-dom";
import { AuthContext } from '../context/authContext';



interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
  
}

// Modal för inloggning och skapande av konto
const LoginModal: React.FC<LoginModalProps> = ({ isOpen, closeModal}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // För lyckat konto skapande
  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // För att växla mellan login och skapa konto
  const navigate = useNavigate(); // För att kunna omdirigera
  const auth = useContext(AuthContext);

 
  const handleGoogleLogin = () => {
    const key = import.meta.env.VITE_REACT_APP_BACKEND_URL;
 
    // Omdirigera användaren till Google OAuth-flödet via backend
    window.location.href = `${key}/user/google`;
   
  };

  if (!auth) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }  

  const handleGithubLogin = () => {
    const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL; // Din backend-URL
    window.location.href = `${backendUrl}/user/github`; // Backend-route som startar OAuth-flödet
};
  
  const { login} = auth;
  // Hantera inloggning
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password); // Anropa login från Context
      navigate('/minsida'); // Omdirigera användaren
      closeModal(); // Stäng modalen
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    }
  };


//Till resett password 
  const ResetPassword = () => {
    navigate('/reset-password');
    closeModal();
  };

  // Hantera skapande av nytt konto
  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    if (!email || !password) {
      setError('Please provide valid credentials.');
      return;
    }

    try {
      // Skicka POST-begäran till backend för att skapa användare
    const response =  await fetch(`${backendUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });

    
     
      // Visa meddelande om att kontot skapades framgångsrikt
      if (response.ok){
      setSuccessMessage('You created an account, please login.');

      }
      setError('');
      
      // Växla till login-formuläret efter en stund (eller när användaren trycker på OK)
      setTimeout(() => {
        setIsCreatingAccount(false);
        setSuccessMessage('');
      }, 3000);  // Vänta  sekunder innan vi byter tillbaka till login

    } catch (err) {
      // Hantera fel (t.ex. om användaren redan finns)
      setError('Error creating account. Please try again.');
    }
  };

  // Om modalen inte är öppen, rendera inget
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <h2>{isCreatingAccount ? 'Create Account' : 'Log in or create an account'}</h2>
        
        {/* Om vi är i skapande av konto-läge, visa formuläret för att skapa konto */}
        <form onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin}>
          <div>
            {isCreatingAccount && (
              <>
              <label htmlFor="username">Username:</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="username"
            /><br></br></>
            )
              }
            
            <label htmlFor='email'>E-mail:</label>
            <input
              type="email"
              value={email}
              aria-label="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type="password"
              aria-label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isCreatingAccount ? 'Create Account' : 'Log In'}</button>
          {!isCreatingAccount && (<><button onClick={handleGoogleLogin}>{isCreatingAccount ? 'Create Account' : 'Log In Via google'}</button><button onClick={handleGithubLogin}>{isCreatingAccount ? 'Create Account' : 'Log In Via GitHub'}</button></>)}
          {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Visa felmeddelande om det finns */}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Visa framgångsmeddelande */}
        </form>

        {/* Knapp för att växla mellan login och skapa konto */}
        <button onClick={() => setIsCreatingAccount(!isCreatingAccount)}>
          {isCreatingAccount ? 'Already have an account? Log in' : 'Create a new account'}
        </button>

        {/* Stäng knappen */}
        <button  type="button"  onClick={closeModal}>Close</button>
        <button onClick={ResetPassword}>Reset Password</button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default LoginModal;
