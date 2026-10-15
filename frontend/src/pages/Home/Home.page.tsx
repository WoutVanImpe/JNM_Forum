import type { FC } from "react";
import clsx from "clsx";
import styles from "./home.page.module.scss";
import type { HomePageProps } from "./home.page.props";
import { Spacer } from "@/shared/Spacer";
import { useFetchUsersMutation } from "@/hooks/useUsers";

export const HomePage: FC<HomePageProps> = ({}) => {
	const { mutate: fetchUsers, data: users, isPending } = useFetchUsersMutation();

	return (
		<>
			<h1 className={clsx(styles["title"])}>template</h1>
			<Spacer size="xs" />
			<p>good luck!</p>
			<Spacer size="md" />
			<button onClick={() => fetchUsers()} disabled={isPending}>
				{isPending ? "Laden..." : "Haal gebruikers op"}
			</button>

			<ul>
				{users?.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</>
	);
};
