import { category, gender, grade, individualOrGroup, major, musicOrPose } from "./inputTypes";

export const individualOrGroupOption:individualOrGroup[] = ['개인','단체'];
export const genderOption:gender[] = ['남자','여자']
export const majorOption:major[] = ['한국무용','발레','현대무용']
export const gradeOption1:grade[] =[ '초등부 저학년(3학년)','초등부 저학년(4학년)','초등부 고학년(5학년)','초등부 고학년(6학년)','중등부 저학년(1학년)','중등부 저학년(2학년)','중등부 고학년(3학년)','고등부 저학년(1학년)','고등부 저학년(2학년)','고등부 고학년(3학년)','일반부']
//without '일반부'
export const gradeOption2:grade[] =[ '초등부 저학년(3학년)','초등부 저학년(4학년)','초등부 고학년(5학년)','초등부 고학년(6학년)','중등부 저학년(1학년)','중등부 저학년(2학년)','중등부 고학년(3학년)','고등부 저학년(1학년)','고등부 저학년(2학년)','고등부 고학년(3학년)']
//한국무용
export const categoryOption1:category[] = ['전통(재구성)','즉흥']
//초등부 저학년
export const categoryOption2:category[] = ['창작']
//발레
export const categoryOption3:category[] = ['고전<기초실기 A,B & Variation>','즉흥<기초실기 A,B & 즉흥>']
//컨템포러리댄스
export const categoryOption4:category[] = ['규정<Movement Phrase 1,2>','즉흥<Movement Phrase 1 & 즉흥>']
//단체-한국무용, 현대무용
export const categoryOption5:category[] = [ '고등부','중등부','초등부(1,2학년 제외)']
//단체-발레
export const categoryOption6:category[] = [ '일반부','고등부','중등부','초등부(1,2학년 제외)']

export const musicOrPoseOption:musicOrPose[] = ['음악 먼저','포즈 먼저']