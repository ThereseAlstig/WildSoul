import { Link } from "react-router-dom"

export const Header = () => {

    return(
        <div className="headerContainer">
          
            <nav className="headerNav">
                <ul className="headerList">
                 <Link to="/"> <li className="headerListItem">Home</li></Link>  
                  <Link to="/traning"><li className="headerListItem">About</li></Link>  
                    <li className="headerListItem">Portfolio</li>
                    <li className="headerListItem">Contact</li>
                </ul>
            </nav>
        </div>
    )
}