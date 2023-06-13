import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const authCxt = useContext(FirebaseAuthContext);
	const { signInWithGoogle } = authCxt;
	const navigate = useNavigate();
	return (
		<div>
			<h1>Login</h1>
			<button
				onClick={async () => {
					await signInWithGoogle();
					navigate('/');
				}}
			>
				Login With Google
			</button>
		</div>
	);
};

export default Login;
