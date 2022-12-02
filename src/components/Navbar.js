//styles
import styles from "./Navbar.module.css";
//
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Logout from "../assets/logout.svg";

export default function Navbar() {
  const { logout } = useLogout();

  const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>YousFinance</li>

        {/*if user null */}
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              Hello,{" "}
              <span style={{ color: "#1f9751", fontWeight: "bold" }}>
                {user.displayName}!
              </span>
            </li>
            <li>
              <button className="logout" onClick={logout}>
                <img src={Logout} alt="logout" />
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
