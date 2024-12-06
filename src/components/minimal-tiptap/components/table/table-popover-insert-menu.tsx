import { buttonVariants } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import {
	LucideArrowUpToLine,
	LucideArrowDownToLine,
	LucideArrowLeftToLine,
	LucideArrowRightToLine,
	Trash2,
} from 'lucide-react';

interface TablePopoverInsertMenuProps {
	insertRowAbove: () => void;
	insertRowBelow: () => void;
	insertColumnLeft: () => void;
	insertColumnRight: () => void;
	deleteRow: () => void;
	deleteColumn: () => void;
	onRemove: () => void;
}

const TablePopoverInsertMenu = ({
	insertRowAbove,
	insertRowBelow,
	insertColumnLeft,
	insertColumnRight,
	deleteRow,
	deleteColumn,
	onRemove,
}: Readonly<TablePopoverInsertMenuProps>) => {

	// NavMenus are assigned `onMouseDown` because `onClick` requires two clicks to register.

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Insert</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="w-full flex flex-col items-start justify-start">
							<NavigationMenuLink
								onMouseDown={insertRowAbove}
								className={cn(
									buttonVariants({
										variant: 'ghost',
										className: 'flex justify-between  h-8 w-full text-left cursor-pointer',
									})
								)}
							>
								<LucideArrowUpToLine /> Insert Row Above
							</NavigationMenuLink>
							<NavigationMenuLink
								onMouseDown={insertRowBelow}
								className={cn(
									buttonVariants({
										variant: 'ghost',
										className: 'flex justify-between  h-8 w-full text-left cursor-pointer',
									})
								)}
							>
								<LucideArrowDownToLine /> Insert Row Below
							</NavigationMenuLink>
							<NavigationMenuLink
								onMouseDown={insertColumnLeft}
								className={cn(
									buttonVariants({
										variant: 'ghost',
										className: 'flex justify-between  h-8 w-full text-left cursor-pointer',
									})
								)}
							>
								<LucideArrowLeftToLine /> Insert Column Left
							</NavigationMenuLink>
							<NavigationMenuLink
								onMouseDown={insertColumnRight}
								className={cn(
									buttonVariants({
										variant: 'ghost',
										className: 'flex justify-between  h-8 w-full text-left cursor-pointer',
									})
								)}
							>
								<LucideArrowRightToLine /> Insert Column Right
							</NavigationMenuLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>
						<Trash2 className="size-4" />
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="w-full flex flex-col items-start justify-start">
							<NavigationMenuLink
								onMouseDown={deleteRow}
								className={cn(
									buttonVariants({
										variant: 'ghost',
										className: 'flex justify-between h-8 w-full text-left cursor-pointer text-destructive',
									})
								)}
							>
								Delete Row
							</NavigationMenuLink>
							<NavigationMenuLink
								onMouseDown={deleteColumn}
								className={cn(
									buttonVariants({
										variant: 'ghost',
										className: 'flex justify-between h-8 w-full text-left cursor-pointer text-destructive',
									})
								)}
							>
								Delete Column
							</NavigationMenuLink>
							<NavigationMenuLink
								onMouseDown={onRemove}
								className={cn(
									buttonVariants({
										variant: 'ghost',
										className: 'flex justify-between h-8 w-full text-left cursor-pointer text-destructive',
									})
								)}
							>
								Delete Table
							</NavigationMenuLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default TablePopoverInsertMenu;
