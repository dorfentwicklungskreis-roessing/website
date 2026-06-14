//@ts-check

import process from 'node:process'
import { fileURLToPath } from 'node:url'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import shipyard from '@levino/shipyard-base'
import shipyardDocs from '@levino/shipyard-docs'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const branch = process.env.WORKERS_CI_BRANCH

// localhost nur bei `astro dev`, sonst auf Produktion defaulten
const isDevServer = process.argv.includes('dev')

const site = isDevServer
  ? 'http://localhost:4321'
  : branch && branch !== 'main'
    ? `https://${branch.replace(/\//g, '-').toLowerCase()}-dorfentwicklung.post-505.workers.dev`
    : 'https://dorfentwicklung.xn--rssing-wxa.de/'

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap(),
    shipyard({
      navigation: {
        vision: {
          label: 'Vision',
          href: '/docs/vision/digitaler-dorfschluessel',
        },
        neuigkeiten: {
          label: 'Neuigkeiten',
          href: '/neuigkeiten',
        },
        faq: {
          label: 'Häufige Fragen',
          href: '/faq',
        },
        changelog: {
          label: 'Verlauf',
          href: '/changelog',
        },
      },
      title: 'Dorfentwicklungsgesellschaft Rössing',
      tagline: 'Unser Dorf hat Zukunft',
      brand: 'DEG Rössing',
      css: fileURLToPath(new URL('./src/styles/app.css', import.meta.url)),
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Die DEG',
            items: [
              { label: 'Startseite', to: '/' },
              { label: 'Vision', to: '/docs/vision/digitaler-dorfschluessel' },
              { label: 'Neuigkeiten', to: '/neuigkeiten' },
              { label: 'Häufige Fragen', to: '/faq' },
            ],
          },
          {
            title: 'Mitwirken',
            items: [
              {
                label: 'Diskussionen',
                href: 'https://github.com/roessing/dorfentwicklung/discussions',
              },
              {
                label: 'Quellcode (GitHub)',
                href: 'https://github.com/roessing/dorfentwicklung',
              },
              { label: 'roessing.de', href: 'https://xn--rssing-wxa.de' },
            ],
          },
          {
            title: 'Rechtliches',
            items: [
              { label: 'Impressum', to: '/impressum' },
              { label: 'Verlauf', to: '/changelog' },
            ],
          },
        ],
        copyright:
          '&copy; ' +
          new Date().getFullYear() +
          ' Dorfentwicklungsgesellschaft Rössing (in Gründung) – Arbeitsentwurf',
      },
    }),
    shipyardDocs(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
