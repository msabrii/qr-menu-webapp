import React from 'react';
import 'normalize.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import { FirebaseAuthContextProvider } from './contexts/FirebaseAuthContext';
import LoadingScreen from './components/LoadingScreen';

function App() {
	return (
		<>
			<FirebaseAuthContextProvider>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
				<LoadingScreen />
			</FirebaseAuthContextProvider>
		</>
	);
}

export default App;
