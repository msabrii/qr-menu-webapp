import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext';

const Profile = () => {
	const { user, loading } = useContext(FirebaseAuthContext);
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
