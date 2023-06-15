import React from 'react';
import 'normalize.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import { FirebaseAuthContextProvider } from './contexts/FirebaseAuthContext';
import { FirebaseFirestoreContextProvider } from './contexts/FirebaseFireStoreContext';
import LoadingScreen from './components/LoadingScreen';
import NewMenu from './pages/NewMenu';
import ViewMenu from './pages/ViewMenu';
import ErrorPage from './pages/ErrorPage';

function App() {
	return (
		<>
			<FirebaseAuthContextProvider>
				<FirebaseFirestoreContextProvider>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/new-menu" element={<NewMenu />} />
						<Route path="/menu/:slug" element={<ViewMenu />} errorElement={<ErrorPage />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
					<LoadingScreen />
				</FirebaseFirestoreContextProvider>
			</FirebaseAuthContextProvider>
		</>
	);
}

export default App;
