import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext';

const Home = () => {
	const { user, loading } = useContext(FirebaseAuthContext);
	return (
		<div>
			<h1>Home</h1>
			{loading && <p>Loading...</p>}
		</div>
	);
};

export default Home;
