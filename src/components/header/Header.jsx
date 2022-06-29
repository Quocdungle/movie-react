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
const Header = () => {
    const { pathname } = useLocation();

    const headerRef = useRef(null);

    const active = headerNav.findIndex((e) => e.path === pathname);

    //material ui
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        <Button className="small" onClick={handleClickOpen}>
                            Login
                        </Button>
                        <Dialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogContent>
                                <Register />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    className="small"
                                    onClick={handleClose}
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
