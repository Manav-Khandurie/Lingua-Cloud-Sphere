// import "./Header.css";

const Header = () => (
  <header className="header">
    <div className="logo">LCS.</div>
    <nav>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
    <div className="auth-buttons">
      <button className="login">Log in</button>
      <button className="signup">Sign up</button>
    </div>
  </header>
);

export default Header;
