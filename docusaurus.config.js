// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');
// import math from 'remark-math'
// import math from 'remark-math'
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '小马哥',
  tagline: '^_^',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mazhao', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en'],
  // },

  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        // ```
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          sidebarCollapsible: true, //默认折叠
          routeBasePath: "/",
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          breadcrumbs: false,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          // showReadingTime: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          path:"./blog",
          editUrl:"/",
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [{
    href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
    type: 'text/css',
    integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
    crossorigin: 'anonymous',
  }, ],
  //此处添加一级菜单
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '码前小卒',
        logo: {
          alt: 'My Site Logo',
          src: 'img/favicon.ico',
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'right',
          //   label: 'Tutorial',
          // },
          {
            to: '机器人开发', 
            label: '机器人开发', 
            position: 'right'
          },
          {
            to: '软件编程', 
            label: '软件编程', 
            position: 'right'
          },
          {
            to: '高效办公', 
            label: '高效办公', 
            position: 'right'
          },
          {
            to: '项目介绍', 
            label: '项目介绍', 
            position: 'right'
          },
          // {
          //   href: 'https://github.com/maserzhao',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        //style: 'dark'
        style: 'light',
        links: [
          {
            href: "https://github.com/PawnMa",
            label: "GitHub",
          },
          {
            href: "https://gitee.com/PawnMa",
            label: "Gitee",
          },
          {
            href: "https://space.bilibili.com/11466079",
            label: "bilibili",
          },
          {
            href: "https://beian.miit.gov.cn",
            label: "浙 ICP 备 2022019979 号",
          },        
        ],
        //copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      giscus: {
        repo: 'PawnMa/docusaurus-wiki',
        repoId: 'R_kgDOHd8PfA',
        category: 'General',
        categoryId: 'DIC_kwDOHd8PfM4CTR8c',
      },
    }),
};

module.exports = config;

