import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, Firestore, DocumentData, setDoc, doc } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { QuerySnapshot } from 'firebase/firestore/lite';
import { createContext } from 'react';

interface FirestoreContext {
	db: Firestore;
	getData: (name: string) => Promise<QuerySnapshot<DocumentData>>;
	updateUserMenus: (userID: string, menuName: string) => Promise<void>;
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
const db = getFirestore(app);
const menus = collection(db, 'menus');

const getUserMenus = (userID: string): Promise<QuerySnapshot> => {
	const q = query(menus, where('userID', '==', userID));
	return getDocs(q);
};

const updateUserMenus = (userID: string, menuName: string) => {
	const m = doc(db, 'menus', userID);
	return setDoc(m, {
		name: menuName,
		userID: userID,
	});
};

const FirebaseFirestoreContext = createContext<FirestoreContext>({ db: db, getData: getUserMenus, updateUserMenus });

const FirebaseFirestoreContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const initialContext = { db, getData: getUserMenus, updateUserMenus };

	return <FirebaseFirestoreContext.Provider value={initialContext}>{children}</FirebaseFirestoreContext.Provider>;
};

export { FirebaseFirestoreContext, FirebaseFirestoreContextProvider };
