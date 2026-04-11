import {
	createFileRoute,
	Link,
	Outlet,
	redirect
} from '@tanstack/react-router';
import { AvatarDropdown } from '#/components/avatar-dropdown';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle
} from '#/components/ui/navigation-menu';
import { getSession } from '#/lib/auth/auth.functions';

export const Route = createFileRoute('/_protected')({
	beforeLoad: async ({ location }) => {
		const session = await getSession();

		if (!session) {
			throw redirect({
				to: '/',
				search: { redirect: location.href }
			});
		}

		return { user: session.user };
	},
	component: ProtectedLayout
});

function ProtectedLayout() {
	const { user } = Route.useRouteContext();

	return (
		<div>
			<header className="flex justify-between px-2.5 py-5">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem
							className={navigationMenuTriggerStyle()}
							render={<Link to="/dashboard">Dashboard</Link>}
						/>
					</NavigationMenuList>
				</NavigationMenu>
				<AvatarDropdown user={user} />
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
