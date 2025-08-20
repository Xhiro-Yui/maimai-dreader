import React from "react";
import { card, type CardVariants } from "../../utils/styles";

type Props = React.HTMLAttributes<HTMLDivElement> & CardVariants;

export const Card: React.FC<Props> = ({ size, className, ...props }) => {
    return <div className={card({ size, className })} {...props} />;
};
