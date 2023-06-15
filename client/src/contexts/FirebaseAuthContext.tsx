import { initializeApp } from 'firebase/app';
import { User, getAuth } from 'firebase/auth';
import { createContext, useEffect } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

interface AuthContext {
	user: User | null | undefined;
	loading: boolean;
	error: Error | undefined;
	signInWithGoogle: () => void;
}

const firebaseConfig = {
	apiKey: 'AIzaSyD6mDmwQoes2bV49f8S3BeXcMsk0NPFFwU',
	authDomain: 'qr-menu-app-308014.firebaseapp.com',
	projectId: 'qr-menu-app-308014',
	storageBucket: 'qr-menu-app-308014.appspot.com',
	messagingSenderId: '116112517012',
	appId: '1:116112517012:web:d98307cf803de7c7b7d181',
};

// Initialize the default app instance
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseAuthContext = createContext<AuthContext>({ user: null, loading: false, error: undefined, signInWithGoogle: () => {} });

const FirebaseAuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const [user, loading, error] = useAuthState(auth);
	const initialContext = { user, loading, error, signInWithGoogle };

	// useEffect(() => {
	// 	console.log(loading, 'USER');
	// }, [loading]);

	return <FirebaseAuthContext.Provider value={initialContext}>{children}</FirebaseAuthContext.Provider>;
};

export { FirebaseAuthContext, FirebaseAuthContextProvider, auth };
