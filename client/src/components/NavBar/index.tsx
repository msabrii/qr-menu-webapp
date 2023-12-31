import React, { useContext } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FirebaseAuthContext, auth } from '../../contexts/FirebaseAuthContext';

const NavBar = () => {
	const [signOut] = useSignOut(auth);
	const { user } = useContext(FirebaseAuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const userSignOut = async () => {
		await signOut();
		navigate('/');
	};
	return (
		!location.pathname.startsWith('/menu') && ( // do not display navbar on view menu page
			<div className="sticky flex flex-row top-0 bg-black text-white w-full justify-end gap-2">
				<Link to="/">
					<p>Home</p>
				</Link>
				{user ? (
					<button onClick={() => userSignOut()}>Logout</button>
				) : (
					<Link to="/login">
						<p>Login</p>
					</Link>
				)}
				{user && (
					<Link to="/profile">
						<p>Profile</p>
					</Link>
				)}
			</div>
		)
	);
};

export default NavBar;
