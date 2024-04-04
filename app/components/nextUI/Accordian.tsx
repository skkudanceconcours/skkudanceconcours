import { ReactNode } from "react";
import {Accordion, AccordionItem, NextUIProvider} from "@nextui-org/react";

type AccordianProps = {
    contents: [string,string][]
    defaultExpadedKeys?: string[]
}
const NextAccordian = ({contents,defaultExpadedKeys}:AccordianProps) :ReactNode => {

    return(
    <NextUIProvider> 
      <div className="w-[60rem] self-center mb-2">
        <Accordion
          variant="shadow"
          isCompact
          defaultExpandedKeys={defaultExpadedKeys}
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
      </div>
    </NextUIProvider>)
}

export default NextAccordian;