"use client";

import { useContext, useEffect, useState, createContext } from "react";
import { usePathname } from "next/navigation";

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const navigation = useNavigation();
	return (
		<NavigationContext.Provider value={navigation}>
			{children}
		</NavigationContext.Provider>
	);
};

const useNavigation = () => {
	const pathname = usePathname();

	const [currentRoute, setCurrentRoute] = useState<string | null>(null);
	const [previousRoute, setPreviousRoute] = useState<string | null>(null);

	useEffect(() => {
		setPreviousRoute(currentRoute);
		setCurrentRoute(pathname);
	}, [pathname]);

	return { previousRoute };
};

const NavigationContext = createContext<ReturnType<typeof useNavigation>>({
	previousRoute: null,
});
