import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FirebaseFirestoreContext } from '../../contexts/FirebaseFireStoreContext';

const ViewMenu = () => {
	const { slug } = useParams();
	const { getData } = useContext(FirebaseFirestoreContext);
	const [existingMenu, setExistingMenu] = useState<any | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [noMenuFound, setNoMenuFound] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchExistingMenu = async () => {
			if (slug) {
				setLoading(true);
				console.log('User', slug);
				const data = await getData(slug);
				const menuData = data.docs.map((doc) => doc.data());
				console.log(menuData);
				if (menuData[0]) setExistingMenu(menuData[0]);
				else setNoMenuFound(true);
				setLoading(false);
			}
		};

		fetchExistingMenu();
	}, []);

	useEffect(() => {
		if (noMenuFound) navigate('/error');
	}, [noMenuFound]);

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : (
				!noMenuFound && (
					<>
						<h1>View Menu</h1>
						<p>{existingMenu.name}</p>
					</>
				)
			)}
		</div>
	);
};

export default ViewMenu;
