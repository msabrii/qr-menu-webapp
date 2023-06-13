import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import 'normalize.css';

function App() {
	const firebaseConfig = {
		apiKey: 'AIzaSyD6mDmwQoes2bV49f8S3BeXcMsk0NPFFwU',
		authDomain: 'qr-menu-app-308014.firebaseapp.com',
		projectId: 'qr-menu-app-308014',
		storageBucket: 'qr-menu-app-308014.appspot.com',
		messagingSenderId: '116112517012',
		appId: '1:116112517012:web:d98307cf803de7c7b7d181',
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	return (
		<>
			<h1 className="text-center text-2xl font-medium text-red-700">Hello World</h1>
			<button onClick={() => signInWithGoogle()}>Login With Google</button>
			{user && <p>{user.user.displayName}</p>}
		</>
	);
}

export default App;
