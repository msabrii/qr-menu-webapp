import React, { FormEvent, useContext, useState } from 'react';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { FirebaseFirestoreContext } from '../../contexts/FirebaseFireStoreContext';

const NewMenu = () => {
	const [menuName, setMenuName] = useState('');
	const { user } = useContext(FirebaseAuthContext);
	const { updateUserMenus } = useContext(FirebaseFirestoreContext);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(menuName);
		if (user) {
			const update = await updateUserMenus(user.uid, menuName);
			console.log('Menu created', update);
		}
	};

	const handleChange = (event: any) => {
		setMenuName(event.target.value);
	};

	return (
		<div className="flex flex-col">
			<h1>Create a Menu</h1>
			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} type="text" placeholder="Menu Name" className="border border-black w-44 p-1 mt-2" />
				<button type="submit" className="px-4 py-2 bg-black text-white rounded-lg ml-5">
					Submit
				</button>
			</form>
		</div>
	);
};

export default NewMenu;
