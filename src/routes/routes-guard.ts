import { queryKeys } from "@/queries";
import { badHint } from "@/services/hint";
import { AuthenticatedUser } from "@/types/api-types";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { routes } from "./routes";
import { protectedRoutes } from "./protected-routes";
import { useEffectAfterMount, useQuerySubscribe } from "@/hooks/misc";

export function useRoutesGuard(isPendingAuthentication: boolean) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [firstLoad, setFirstLoad] = useState(true);
	const user = useQuerySubscribe<AuthenticatedUser>([queryKeys.userAuth]);

	useEffectAfterMount(() => {
		isPendingAuthentication || routesGuard();
	}, [pathname, user]);

	function routesGuard() {
		if (user) {
			if (!protectedRoutes[user.roles[0]].includes(pathname)) navigate(routes.home);
		} else if (!protectedRoutes.Customer.includes(pathname)) {
			navigate(routes.signIn);
			firstLoad && badHint("You are not signed in! Sign in first.");
		}

		scrollTo({ top: 0, behavior: "smooth" });
		setFirstLoad(false);
	}
}
