import LocaleSwitcher from "../features/LocaleSwitcher";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-list navbar-start">
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              About
            </a>
          </li>
        </ul>
        <div className="navbar-end">
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
