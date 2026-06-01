import { Montserrat, Inter, Permanent_Marker } from 'next/font/google';

export const montserrat = Montserrat({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const permanentMarker = Permanent_Marker({
  variable: '--font-marker',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const fontVariables = [
  montserrat.variable,
  inter.variable,
  permanentMarker.variable,
].join(' ');
