/**
 * Dynamic image loader — never hardcodes paths.
 * Resolves all uploaded extracted image assets across all subfolders.
 */

// Master Glob — captures EVERY uploaded PNG, WebP, JPG, SVG, and GIF in assets/images/
const allAssetModules = import.meta.glob('../assets/images/**/*.{png,webp,jpg,jpeg,svg,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

// Subfolder Globs
const paintFrameModules = import.meta.glob('../assets/images/backgrounds/*.gif', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const heroModules = import.meta.glob('../assets/images/hero/**/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const paintModules = import.meta.glob('../assets/images/paint/**/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const backgroundModules = import.meta.glob('../assets/images/backgrounds/**/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const productModules = import.meta.glob('../assets/images/products/**/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const galleryModules = import.meta.glob('../assets/images/gallery/**/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const logoModules = import.meta.glob('../assets/images/logos/**/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const textureModules = import.meta.glob('../assets/images/textures/**/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const decorationModules = import.meta.glob('../assets/images/decorations/**/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const hardwareModules = import.meta.glob('../assets/images/hardware/**/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

/**
 * Returns sorted array of ALL uploaded visual assets in the repository
 */
export function getAllUploadedAssets(): string[] {
  return Object.values(allAssetModules);
}

export function getPaintFrames(): string[] {
  return Object.entries(paintFrameModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url as string);
}

export function getHeroImage(): string {
  const key = Object.keys(heroModules).find((k) => k.endsWith('hero.png'));
  return key ? (heroModules[key] as string) : getPaintFrames()[0] || '';
}

export function getShopLogo(): string {
  const key = Object.keys(logoModules).find((k) => k.endsWith('favicon.png'));
  if (key) return logoModules[key] as string;
  return '/favicon.png';
}

export function getPaintBucketImage(): string {
  const key = Object.keys(paintModules).find((k) => k.endsWith('paint-bucket.png'));
  if (key) return paintModules[key] as string;
  return getHeroImage();
}

export function getPaintSplashGif(): string {
  const key = Object.keys(paintModules).find((k) => k.endsWith('paint-splash-full.gif'));
  if (key) return paintModules[key] as string;
  return getPaintFrames()[0] || '';
}

export function getHardwareAssets(): string[] {
  return Object.values(hardwareModules) as string[];
}

export function getDecorationAssets(): string[] {
  return Object.values(decorationModules) as string[];
}

export function getTextureAssets(): string[] {
  return Object.values(textureModules) as string[];
}

export function getBackground(filename: string): string | undefined {
  const key = Object.keys(backgroundModules).find((k) => k.endsWith(filename));
  return key ? (backgroundModules[key] as string) : undefined;
}

export function getGalleryImages(): string[] {
  return Object.values(galleryModules) as string[];
}

export function getPaintAssets(): string[] {
  return Object.values(paintModules) as string[];
}

export function getProductImage(filename: string): string | undefined {
  const key = Object.keys(productModules).find((k) => k.endsWith(filename));
  return key ? (productModules[key] as string) : undefined;
}

export function getLogoImage(slug: string): string | undefined {
  const key = Object.keys(logoModules).find((k) => k.includes(slug));
  return key ? (logoModules[key] as string) : undefined;
}

export function getTexture(filename: string): string | undefined {
  const key = Object.keys(textureModules).find((k) => k.endsWith(filename));
  return key ? (textureModules[key] as string) : undefined;
}
