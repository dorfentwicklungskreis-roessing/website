# Dorfentwicklungsgesellschaft Rössing

Website der Dorfentwicklungsgesellschaft Rössing (DEG) – „Unser Dorf hat
Zukunft".

Gebaut mit [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/),
[DaisyUI](https://daisyui.com/) und dem hauseigenen Framework
[shipyard](https://shipyard.levinkeller.de) (`@levino/shipyard-base` +
`@levino/shipyard-docs`) – konsistent mit der Schwesterseite
[roessing.de](https://xn--rssing-wxa.de).

## Entwicklung

```bash
npm install
npm run dev      # Dev-Server unter http://127.0.0.1:4321
```

## Build

```bash
npm run build    # erzeugt statische Ausgabe in ./dist
npm run preview  # baut nicht, dient zur Vorschau von ./dist
```

Die Ausgabe in `./dist` ist vollständig statisch und kann von jedem statischen
Hoster ausgeliefert werden.

## Seitenstruktur

| Route                                    | Inhalt                                            |
| ---------------------------------------- | ------------------------------------------------- |
| `/`                                      | Landing-Page (Hero, Mission, 25-Jahre-DEG, Vision, News, CTA) |
| `/docs/vision/...`                       | Vision (Digitaler Dorfschlüssel, Rede 25 Jahre DEG) |
| `/neuigkeiten` & `/neuigkeiten/[id]`     | Neuigkeiten / Ideenwerkstatt                      |
| `/faq`                                   | Häufige Fragen                                    |
| `/changelog`                             | Verlauf                                           |
| `/impressum`                             | Impressum                                         |

Inhalte:

- **Vision**: `src/content/docs/vision/` (shipyard-docs Collection)
- **Neuigkeiten**: `src/content/news/` (Astro Content Collection)
- **Prosa-Seiten**: `src/pages/*.mdx` (FAQ als interaktive `.astro`-Seite)
- **Theme/Farben**: `src/styles/app.css` (DaisyUI Light/Dark, warme Grün-/Erdtöne)

## Deployment

Die Seite wird – analog zur Schwesterseite **roessing.de** – als **Cloudflare
Worker mit Static Assets** über die **Cloudflare Workers Git-Integration**
ausgeliefert (siehe `wrangler.toml`). Cloudflare baut bei jedem Push auf `main`
automatisch und veröffentlicht die statische Ausgabe.

**Build-Einstellungen in Cloudflare (Workers Builds):**

- Build-Befehl: `npm run build`
- Deploy-Befehl / Assets-Verzeichnis: `./dist` (aus `wrangler.toml`)
- Umgebungsvariable `WORKERS_CI_BRANCH` wird von Cloudflare gesetzt und in
  `astro.config.mjs` für die korrekte Canonical-/Sitemap-URL verwendet:
  - Branch `main` → `https://dorfentwicklung.xn--rssing-wxa.de/`
  - andere Branches → Preview-URL `*-dorfentwicklung.post-505.workers.dev`

> Hinweis: Die ursprüngliche Docusaurus-Konfiguration nannte als Produktions-URL
> `https://dorfentwicklung.xn--rssing-wxa.de` (= dorfentwicklung.rössing.de).
> Diese URL bleibt erhalten. Es existierten im Repo keine GitHub-Workflows,
> kein `CNAME` und keine `vercel.json`; das Deployment erfolgt über die
> Cloudflare-Git-Integration (kein Schritt im Repo nötig). Sollte stattdessen
> GitHub Pages gewünscht sein, genügt ein Workflow, der `npm run build` ausführt
> und `./dist` veröffentlicht – plus ein `public/CNAME` mit der Domain.

## Lizenz

Inhalte © Dorfentwicklungsgesellschaft Rössing (in Gründung).
