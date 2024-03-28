'use client'
import { ReactNode, useRef, useState } from "react"

import { category, gender, grade, individualOrGroup, major, musicOrPose } from "@/template/inputTypes";
import Selection from "./Selection";

const ReceptionForm = ():ReactNode => {
    //useState
    const [individualOrGroup, setIndividualOrGroup] = useState<individualOrGroup>('개인');
    const [gender, setGender] = useState<gender>('남자');
    const [major, setMajor] = useState<major>('현대무용');
    const [grade,setGrade] = useState<grade>('초등부 저학년(3,4학년)');
    const [category,setCategory] = useState<category>('');
    const [musicOrPose,setMusicOrPose] = useState<musicOrPose>('음악 먼저');

    //useRef
    const name = useRef<HTMLInputElement>(null);
    const birth = useRef<HTMLInputElement>(null);
    const contact = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const school = useRef<HTMLInputElement>(null);
    const academy = useRef<HTMLInputElement>(null);
    const instructorName = useRef<HTMLInputElement>(null);
    const instructorContact = useRef<HTMLInputElement>(null);
    const artTitle = useRef<HTMLInputElement>(null);

    

    return <form className="p-10">
        <Selection
          value={individualOrGroup}
          onChange={setIndividualOrGroup}
          label={'개인/단체'}
          options={['개인','단체']}
        />
        
    </form>
}


export default ReceptionForm;