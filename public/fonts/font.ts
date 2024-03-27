import { Anton, Quicksand, Raleway, Roboto } from "next/font/google";

export const anton = Anton({weight:'400', subsets:['latin']});
export const roboto = Roboto({weight:["300","400","500","700","900"], subsets:["cyrillic"]});
export const raleway = Raleway({weight:['300','400','500','600'], subsets:["cyrillic"]})
export const quicksand = Quicksand({weight:['300'], subsets:['latin']})