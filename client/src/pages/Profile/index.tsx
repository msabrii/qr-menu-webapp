import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			return;
		}
		if (!user) {
			navigate('/');
		}
	}, [loading, user]);
	return (
		<div>
			<h1>Profile</h1>
			<h2>{user && user.displayName}</h2>
		</div>
	);
};

export default Profile;
