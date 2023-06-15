import React, { useContext, useEffect, useState } from 'react';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { FirebaseFirestoreContext } from '../../contexts/FirebaseFireStoreContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuType } from '../../types';

const Home = () => {
	const { user } = useContext(FirebaseAuthContext);
	const { getData } = useContext(FirebaseFirestoreContext);
	const [existingMenu, setExistingMenu] = useState<MenuType | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log(user);
		if (user) {
			const fetchExistingMenu = async () => {
				setLoading(true);
				console.log('User', user.uid);
				const data = await getData(user.uid);
				const menuData = data.docs.map((doc) => doc.data());
				console.log(menuData);
				if (menuData.length > 0) setExistingMenu(menuData[0] as MenuType);
				setLoading(false);
			};
			fetchExistingMenu();
		}
	}, [user]); // user is null on reload

	return (
		<div className="flex flex-col">
			{!user ? (
				<Link to="/login" className="p-2 mt-2 bg-black text-center text-white rounded-lg w-28">
					Login
				</Link>
			) : loading ? (
				<div className="w-screen h-screen flex justify-center items-center">
					<motion.div className="w-12 h-12 rounded-full border-white border-4 border-t-red-600" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}></motion.div>;
				</div>
			) : (
				<>
					<h1>Home</h1>
					{existingMenu ? existingMenu.name : 'No menu found'}
					<Link to={'/new-menu'} className="p-2 mt-2 bg-black text-white rounded-lg w-28">
						Create Menu
					</Link>
					{existingMenu && (
						<Link to={`/menu/${user!.uid}`} target="_blank" className="p-2 mt-2 bg-black text-white rounded-lg w-28">
							View Menu
						</Link>
					)}
				</>
			)}
		</div>
	);
};

export default Home;
