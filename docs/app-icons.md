# App Icons

Every app icon is generated from an emoji defined in the app's `config.ts`.

## How it works

The `@minimalistic-apps/icon-generator` package renders an emoji onto a canvas using `@napi-rs/canvas` and exports PNGs at all required sizes. The background color is always the Minimalistic Apps brand color (`#087d89`).

### Generated files

| Target | Files | Sizes |
|---|---|---|
| Web favicon | `public/favicon.png` | 48×48 |
| PWA icons | `public/icon-192x192.png`, `public/icon-512x512.png` | 192×192, 512×512 |
| Android launcher | `android/…/mipmap-*/ic_launcher.png` | 48–192 (per density) |
| Android round | `android/…/mipmap-*/ic_launcher_round.png` | 48–192 (per density) |
| Android foreground | `android/…/mipmap-*/ic_launcher_foreground.png` | 108–432 (per density) |
| Android background | `android/…/values/ic_launcher_background.xml` | brand color |

## Adding icons to a new app

1. Add `@minimalistic-apps/icon-generator` as a devDependency:
   ```json
   "@minimalistic-apps/icon-generator": "workspace:*"
   ```

2. Set the emoji in the app's `config.ts`:
   ```ts
   export const config = {
       appIconEmoji: '🎯',
   } as const;
   ```

3. Add the `generate:icons` script to `package.json`:
   ```json
   "generate:icons": "generate-icons"
   ```

4. Run:
   ```sh
   pnpm generate:icons
   ```

## Regenerating icons

Run from any app directory, or for all apps at once:

```sh
# Single app
pnpm --filter @minimalistic-apps/price-converter generate:icons

# All apps
pnpm -r generate:icons
```

## Emoji rendering

Emoji appearance depends on the system font. Install Noto Color Emoji for consistent results:

```sh
# Debian / Ubuntu
sudo apt install fonts-noto-color-emoji
```
