import React from "react";
import { badge, type BadgeVariants } from "../../utils/styles";

type Props = React.HTMLAttributes<HTMLSpanElement> & BadgeVariants;

export const Badge: React.FC<Props> = ({ level, className, ...props }) => {
    return <span className={badge({ level, className })} {...props} />;
};
