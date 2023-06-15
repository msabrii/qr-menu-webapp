import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FirebaseFirestoreContext } from '../../contexts/FirebaseFireStoreContext';
import { Menu, MenuItem, MenuSection } from '../../types';

const testData: Menu = {
	pages: [
		{
			pageName: 'Menu 1',
			sections: [
				{
					name: 'Turkish Baklavas',
					image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/240x160/mjwjuotZb/a7d30214-2af9-4336-bc82-96809ad54d78.png',
					items: [
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Pistachio Square Baklava',
							price: 49,
						},
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Walnut Sultan Baklava',
							price: 45,
						},
					],
				},
				{
					name: 'Special Plates and chips and fries',
					image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/240x160/mjwjuotZb/a7d30214-2af9-4336-bc82-96809ad54d78.png',
					items: [
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Sultan Plate',
							price: 55,
						},
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Saray Plate',
							price: 147.5,
						},
					],
				},
				{
					name: 'Special Plates',
					image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/240x160/mjwjuotZb/a7d30214-2af9-4336-bc82-96809ad54d78.png',
					items: [
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Sultan Plate',
							price: 55,
						},
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Saray Plate',
							price: 147.5,
						},
					],
				},
				{
					name: 'Special Plates',
					image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/240x160/mjwjuotZb/a7d30214-2af9-4336-bc82-96809ad54d78.png',
					items: [
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Sultan Plate',
							price: 55,
						},
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Saray Plate',
							price: 147.5,
						},
					],
				},
				{
					name: 'Special Plates',
					image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/240x160/mjwjuotZb/a7d30214-2af9-4336-bc82-96809ad54d78.png',
					items: [
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Sultan Plate',
							price: 55,
						},
						{
							image: 'https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/180x180/mjwjuotZb/f07eed79-70a7-45e1-a349-c0f5a44fe5b6.png',
							description: 'this is a gfame and i kove tjfs kdfj skljfkdlj fksdj',
							name: 'Saray Plate',
							price: 147.5,
						},
					],
				},
			],
		},
	],
};

const userData = {
	bgColor: '#454545',
	accentColor: '#585858',
	textColor: 'gold',
	logo: 'https://media.finedinemenu.com/fit-in/filters:strip_exif()/filters:format(webp)/1280x640/mjwjuotZb/05d1f7b1-90a8-45e8-9f87-96d5ae33f9f9.png',
};

const MenuNav = () => {
	return (
		<div className="flex flex-row justify-between p-2">
			<p>Back</p>
			<img className="w-11" src={userData.logo} />
			<p>SideBar</p>
		</div>
	);
};

const SectionCard = ({ section, onClick }: { section: MenuSection; onClick: (section: MenuSection) => void }) => {
	return (
		<div
			className="flex-shrink-0 flex-col mx-1 w-[120px] h-[135px]"
			draggable
			onClick={() => {
				onClick(section);
			}}
		>
			<img src={section.image} className="w-full h-[80px] object-cover rounded" />
			<p className="mt-2 uppercase font-semibold text-center flex justify-center items-center h-[45px] overflow-hidden">{section.name}</p>
		</div>
	);
};

const SectionsCarousel = ({ sections, onClick }: { sections: MenuSection[]; onClick: (section: MenuSection) => void }) => {
	return (
		<div className="flex flex-row overflow-x-auto md:items-center md:justify-center">
			{sections.map((section, idx) => (
				<SectionCard section={section} onClick={onClick} key={idx} />
			))}
		</div>
	);
};

const ItemCard = ({ item }: { item: MenuItem }) => {
	return (
		<div className="flex flex-col p-3 mx-4 my-2 rounded-md" style={{ background: userData.accentColor }}>
			<div className="flex">
				<div className="flex flex-col w-full">
					<p className="text-lg font-semibold">{item.name}</p>
					<p className="text-sm">{item.description}</p>
				</div>
				<img src={item.image} className="w-[100px] h-[100px] object-cover rounded" />
			</div>
			<p>{item.price}</p>
		</div>
	);
};

const SectionDisplay = ({ section }: { section: MenuSection }) => {
	return (
		<div className="flex flex-col">
			<h2 className="text-2xl font-semibold text-center my-4">{section.name}</h2>
			{section.items.map((item, idx) => (
				<ItemCard item={item} key={idx} />
			))}
		</div>
	);
};

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

	const [currentSection, setCurrentSection] = useState<MenuSection>(testData.pages[0].sections[0]);

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : (
				!noMenuFound && (
					<div className="h-screen flex flex-col w-screen" style={{ backgroundColor: userData.bgColor, color: userData.textColor }}>
						<MenuNav />
						<h2 className="text-center mt-1 mb-4 text-xl">{testData.pages[0].pageName}</h2>
						<SectionsCarousel sections={testData.pages[0].sections} onClick={(section: MenuSection) => setCurrentSection(section)} />
						<SectionDisplay section={currentSection} />
					</div>
				)
			)}
		</div>
	);
};

export default ViewMenu;
