export interface MenuType {
	name: string;
	userID: string;
}

export interface MenuItem {
	name: string;
	price: number;
	image: string;
	description: string;
}

export interface MenuSection {
	name: string;
	image?: string;
	items: MenuItem[];
	description?: string;
}

export interface MenuPage {
	pageName: string;
	sections: MenuSection[];
}

export interface Menu {
	pages: MenuPage[];
}
