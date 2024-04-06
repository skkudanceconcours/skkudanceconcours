import { ReactNode } from "react";
import {Accordion, AccordionItem } from "@nextui-org/react";

type AccordianProps = {
    contents: [string,string][]
}
const NextAccordian = ({contents}:AccordianProps) :ReactNode => {

    return(
      <div className="w-full lg:w-[60rem] self-center mb-2">
        <Accordion
          fullWidth
          variant="shadow"
          isCompact
          >
          {contents.map(item => {
            const [title,content] = item;
            return <AccordionItem 
            key={title} 
            aria-label={title}
            subtitle="눌러서 상세보기" 
            title={title}
            className="whitespace-pre-wrap leading-5 w-full">
            {content}
          </AccordionItem>})}
        </Accordion>
      </div>)
}

export default NextAccordian;