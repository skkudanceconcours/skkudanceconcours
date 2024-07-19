import { Anton, Nanum_Gothic, Quicksand, Raleway, Roboto, Noto_Sans_KR, Montserrat } from 'next/font/google';
import localFont from '@next/font/local';

export const anton = Anton({ weight: '400', subsets: ['latin'] });
export const roboto = Roboto({ weight: ['300', '400', '500', '700', '900'], subsets: ['cyrillic'] });
export const raleway = Raleway({ weight: ['300', '400', '500', '600'], subsets: ['cyrillic'] });
export const quicksand = Quicksand({ weight: ['300'], subsets: ['latin'] });
export const nanumgothic = Nanum_Gothic({ weight: ['400'], subsets: ['latin'] });
export const notosanskr = Noto_Sans_KR({ weight: ['400'], subsets: ['latin'] });
export const monstserrat = Montserrat({ weight: ['400'], subsets: ['latin'] });

export const HSBombaram = localFont({
  src: [
    {
      path: './HSBombaram.ttf',
    },
  ],
  variable: '--font-HSBombaram',
});

export const UniverseLTPro = localFont({
  src: [
    {
      path: './UniverseLTPro.ttf',
    },
  ],
  variable: '--font-UniverseLTPro',
});
