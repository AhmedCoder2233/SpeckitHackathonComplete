import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import 'dotenv/config';  // ✅ Yeh pehle hi hai
console.log('🔑 OPEN_AI_API_KEY:', process.env.OPENAI_API_KEY ? 'Loaded ✅' : 'Missing ❌');

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'The Ultimate Guide to Embodied Intelligence',
  favicon: 'img/favicon.ico',

  
  customFields: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,  // .env se read karega
  },
  
  future: {
    v4: true,
  },
  
  scripts: [
    {
      src: "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js",
      async: true,
    },
  ],

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'panaverse',
  projectName: 'physical-ai-textbook',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
  },

  clientModules: [
    require.resolve('./src/components/Root.tsx'),
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'), 
            require.resolve('./src/css/sidebar-custom.css')
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: true
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Physical AI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Chapters',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/panaverse/physical-ai-textbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Panaverse. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;