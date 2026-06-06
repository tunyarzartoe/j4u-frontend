import { Link } from "react-router-dom";
import "./MainNav.css";
import logo from "../../images/j4u-logo.svg";
import { MDBIcon } from "mdb-react-ui-kit";
import { getToken, logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
const MainNav = () => {
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  const loginUser = useSelector(state => state.auths.user)
  console.log(loginUser.username)

  let myAccountItem = "";

  if (token) {
    myAccountItem = (
      <Link
        to=""
        className="d-flex align-items-center gap-10  text-dark mx-3"
        onClick={() => {
          dispatch(logout());
        }}
      >
        {/* <div class="dropdown">
          <div
            class=" dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fas fa-user "></i>
          </div>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link class="dropdown-item" href="#">
                My Profile
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" href="#">
                Another action
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" href="#">
                Something else here
              </Link>
            </li>
          </ul>
        </div> */}
        <p className="mb-0 button btn btn-outline-primary ">Log out</p>
      </Link>
    );
  } else {
    myAccountItem = (
      <Link
        to="/login"
        className="d-flex align-items-center gap-10 text-dark mx-3"
      >
        {/* <div class="dropdown">
          <div
            class=" dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fas fa-user "></i>
          </div>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link class="dropdown-item" href="#">
                My Profile
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" href="#">
                Another action
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" href="#">
                Something else here
              </Link>
            </li>
          </ul>
        </div> */}

        <p className="mb-0 button btn btn-outline-primary ">Log in</p>
      </Link>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top ">
      <div className="container ">
        {/* <Link className="navbar-brand" to="/">
        hello
          <img src={logo} alt="J4U" className="brand-logo" />
        </Link> */}
        <Link
          className="navbar-brand d-flex align-items-center gap-10 text-dark"
          // aria-current="page"
          to="/"
        >
          <img src={logo} alt="J4U" className="brand-logo" />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MDBIcon icon="bars" fas />
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto navUl align-items-center">
            <li className="nav-item ">
              <Link
                className="nav-link linkItems active "
                aria-current="page"
                to="/"
              >
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link linkItems" to="/jobPost">
                JOBS
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link linkItems" to="/company">
                COMPANIES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link linkItems" to="/about">
                ABOUT US
              </Link>
            </li>

            <li className="nav-item">
              <div class="dropdown">
                <div
                  class=" dropdown-toggle"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fas fa-user "></i>
                </div>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <Link class="dropdown-item" href="#">
                      {loginUser.fullname}
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item ">
              <div className="text-dark">{myAccountItem}</div>
            </li>

            {/* <div className=" mx-3">
              <Link to="/login">
                <button className="button btn btn-outline-primary ">LOGIN</button>
              </Link>
            </div> */}
            {/* <div className="form-check form-switch ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label className="form-check-label" for="flexSwitchCheckDefault">
                Dark Mode
              </label>
            </div> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
