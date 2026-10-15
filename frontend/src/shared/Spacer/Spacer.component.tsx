import type { FC } from "react";
import styles from "./spacer.component.module.scss";
import type { SpacerProps } from "./spacer.component.props";
import clsx from "clsx";

export const Spacer: FC<SpacerProps> = ({ size = "md" }) => {
	return <div aria-hidden="true" className={clsx(styles["spacer"], styles[`spacer--${size}`])} />;
};
