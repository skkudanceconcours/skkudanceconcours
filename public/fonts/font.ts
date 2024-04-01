import { Anton, Quicksand, Raleway, Roboto } from "next/font/google";
import localFont from '@next/font/local'

export const anton = Anton({weight:'400', subsets:['latin']});
export const roboto = Roboto({weight:["300","400","500","700","900"], subsets:["cyrillic"]});
export const raleway = Raleway({weight:['300','400','500','600'], subsets:["cyrillic"]});
export const quicksand = Quicksand({weight:['300'], subsets:['latin']});

export const HSBombaram = localFont({
    src:[
        {
            path: './HSBombaram.ttf',
        }
    ],
    variable: '--font-HSBombaram'
})