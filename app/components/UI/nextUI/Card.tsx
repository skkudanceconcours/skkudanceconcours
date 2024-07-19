import { Card, CardBody } from "@nextui-org/react";
import { ReactNode } from "react";

type CardProps = {};

const NextCard = ({}: CardProps): ReactNode => {
  return (
    <Card isBlurred>
      <CardBody></CardBody>
    </Card>
  );
};

export default NextCard;
