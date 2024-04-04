import { Card, CardBody, NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

type CardProps = {
  
}

const NextCard = ({}:CardProps): ReactNode => {
  return (
    <NextUIProvider>
      <Card
        isBlurred
        >
        <CardBody>

        </CardBody>
      </Card>
    </NextUIProvider>
  );
};

export default NextCard;