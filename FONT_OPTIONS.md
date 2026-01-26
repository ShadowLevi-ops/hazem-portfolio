# Font Options for Portfolio

## Current Font: **Cormorant Garamond**

- **Style**: Editorial, luxury, sophisticated
- **Best for**: High-end portfolios, editorial layouts
- **Feel**: Classic elegance with modern refinement

---

## Alternative Font Options

### 1. **Crimson Pro** (Classic & Readable)

```typescript
import { Crimson_Pro, Inter } from 'next/font/google';

const crimsonPro = Crimson_Pro({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
```

- **Style**: Classic serif, highly readable
- **Best for**: Professional, traditional portfolios
- **Feel**: Timeless and trustworthy

---

### 2. **Lora** (Elegant & Balanced)

```typescript
import { Lora, Inter } from 'next/font/google';

const lora = Lora({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
```

- **Style**: Well-balanced, elegant serif
- **Best for**: Creative portfolios, storytelling
- **Feel**: Warm and approachable elegance

---

### 3. **EB Garamond** (Timeless Sophistication)

```typescript
import { EB_Garamond, Inter } from 'next/font/google';

const ebGaramond = EB_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
```

- **Style**: Traditional, sophisticated
- **Best for**: Luxury brands, high-end portfolios
- **Feel**: Classic refinement

---

### 4. **Cinzel** (Decorative Luxury)

```typescript
import { Cinzel, Inter } from 'next/font/google';

const cinzel = Cinzel({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
```

- **Style**: Decorative, inspired by classical Roman inscriptions
- **Best for**: Dramatic, luxury portfolios
- **Feel**: Bold and prestigious

---

### 5. **Bodoni Moda** (High Contrast Elegance)

```typescript
import { Bodoni_Moda, Inter } from 'next/font/google';

const bodoniModa = Bodoni_Moda({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
```

- **Style**: High contrast, modern serif
- **Best for**: Fashion, art, contemporary luxury
- **Feel**: Bold elegance

---

### 6. **Playfair Display** (Original - Modern Classic)

```typescript
import { Playfair_Display, Inter } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
```

- **Style**: Modern classic, elegant
- **Best for**: Creative portfolios, editorial
- **Feel**: Contemporary sophistication

---

## How to Switch Fonts

1. Open `src/app/layout.tsx`
2. Replace the font import and variable name
3. Update the variable in the body className
4. Save and the changes will hot-reload

## Body Font Options

Currently using **Inter** (clean, modern sans-serif). Alternatives:

- **Montserrat** - Geometric, modern
- **Open Sans** - Humanist, friendly
- **Lato** - Warm, professional
- **Work Sans** - Clean, versatile

---

## Recommendation

For a luxury/Amouge-inspired portfolio:

1. **Cormorant Garamond** (current) - Most editorial/luxury
2. **EB Garamond** - Most classic/timeless
3. **Cinzel** - Most dramatic/luxury
4. **Playfair Display** - Most modern/versatile
