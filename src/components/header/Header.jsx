import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './header.scss';

import { useEffect } from 'react';
import logo from '../../assets/d-dmovie.png';
import Button from '../button/Button';

//material ui
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Register from '../../auth/components/register/Register';
import {
    IconButton,
    Box,
    Button as But,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Login from '../../auth/components/login/Login';
import { useSelector } from 'react-redux';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/userSlice';

const useStyles = {
    position: 'absolute',
    top: '8px',
    right: 0,
    fontSize: '25',
    marginRight: '15px',
    zIndex: 1,
    color: '#333',
};

const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
];

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};
const Header = () => {
    const { pathname } = useLocation();

    const headerRef = useRef(null);
    const dispatch = useDispatch();

    const active = headerNav.findIndex((e) => e.path === pathname);

    //material ui

    const loggedInUser = useSelector((state) => state.user.current);

    const isLoggedIn = !!loggedInUser.id;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
    };

    useEffect(() => {
        const shrinkHeader = () => {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        };
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {};
    }, [active]);
    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <Link to="/">DMovies</Link>
                </div>
                <ul className="header__nav">
                    {headerNav.map((e, i) => (
                        <li
                            key={i}
                            className={`${i === active ? 'active' : ''}`}
                        >
                            <Link to={e.path}>{e.display}</Link>
                        </li>
                    ))}
                    <li>
                        {!isLoggedIn && (
                            <Button className="small" onClick={handleClickOpen}>
                                Login
                            </Button>
                        )}
                        {isLoggedIn && (
                            <IconButton color="inherit">
                                <AccountCircleOutlinedIcon
                                    fontSize="large"
                                    onClick={handleClick}
                                    aria-controls={
                                        open ? 'simple-menu' : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                ></AccountCircleOutlinedIcon>
                                <Menu
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    getContentAnchorEl={null}
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleCloseMenu}>
                                        <ContactMailOutlinedIcon />
                                        <p style={{ marginLeft: '10px' }}>
                                            Profile
                                        </p>
                                    </MenuItem>

                                    <MenuItem onClick={handleLogoutClick}>
                                        <ExitToAppOutlinedIcon />
                                        <p
                                            style={{
                                                marginLeft: '10px',
                                            }}
                                        >
                                            Logout
                                        </p>
                                    </MenuItem>
                                </Menu>
                            </IconButton>
                        )}

                        <Dialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <IconButton style={useStyles} onClick={handleClose}>
                                <Close />
                            </IconButton>
                            <DialogContent>
                                {mode === MODE.REGISTER && (
                                    <>
                                        <Register closeDialog={handleClose} />
                                        <Box textAlign="center">
                                            <But
                                                color="primary"
                                                onClick={() =>
                                                    setMode(MODE.LOGIN)
                                                }
                                            >
                                                Already have an account. Login
                                                here
                                            </But>
                                        </Box>
                                    </>
                                )}
                                {mode === MODE.LOGIN && (
                                    <>
                                        <Login closeDialog={handleClose} />
                                        <Box textAlign="center">
                                            <But
                                                color="primary"
                                                onClick={() =>
                                                    setMode(MODE.REGISTER)
                                                }
                                            >
                                                Don't have an account. Register
                                                here
                                            </But>
                                        </Box>
                                    </>
                                )}
                            </DialogContent>
                        </Dialog>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
