import { useNavigate } from '@tanstack/react-router';
import type { User } from 'better-auth';
import { authClient } from '#/lib/auth/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

type Props = {
	user: User;
};

export function AvatarDropdown({ user }: Props) {
	const navigate = useNavigate();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="icon" className="rounded-full">
						<Avatar>
							<AvatarImage src={user.image ?? undefined} alt="shadcn" />
							<AvatarFallback>
								{user.name?.charAt(0).toUpperCase() || 'U'}
							</AvatarFallback>
						</Avatar>
					</Button>
				}
			/>
			<DropdownMenuContent className="w-32">
				<DropdownMenuGroup>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						variant="destructive"
						onClick={() => {
							void authClient.signOut({
								fetchOptions: {
									onSuccess: () => {
										navigate({ to: '/' });
									}
								}
							});
						}}
					>
						Log out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
