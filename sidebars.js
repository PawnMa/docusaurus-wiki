/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    // home:
    // [

      
    // ],
    机器人开发: 
    [
      'Home',
      {
        type: 'category',
        label: '嵌入式开发基础',
        link: {
          type: 'generated-index',
          //description: 'describtion to be updated',
          keywords: ['x', 'x'],
          /* 添加界面 */
          slug: '/机器人开发',
        },
        items: [
          'TODO0',  
        ],
      },
      {
        type: 'category',
        label: '通用单片机开发',
        link: {
          type: 'generated-index',
          //description: 'describtion to be updated',
          keywords: ['x', 'x'],
        },
        /* 一级目录 */
        items: 
        [
          /* 二级目录 */
          {
            type: 'category',
            label: 'TouchGFX专栏',
            link: {
              type: 'generated-index',
            },
            items: [
              '中文打印与滚动文本框', 
            ],
          },
        ],
      },
    ],  

    软件编程: 
    [
      {
        type: 'category',
        label: 'QT开发',
        link: {
          type: 'generated-index',
          //description: 'describtion to be updated',
          keywords: ['x', 'x'],
          slug: '/软件编程',
        },
        items: [
          "TODO2"
        ],
      },
      {
        type: 'category',
        label: 'ROS开发',
        link: {
          type: 'generated-index',
          //description: 'describtion to be updated',
          keywords: ['x', 'x'],
        },
        items: [
          "TODO3"
        ],
      },
    ],
    高效办公: 
    [
      {
        type: 'category',
        label: '高效办公',
        link: {
          type: 'generated-index',
          //description: 'describtion to be updated',
          keywords: ['x', 'x'],
          slug: '/高效办公',
        },
        items: [
          "Docusaurus特性与模板"
        ],
      },
    ],
    项目介绍: 
    [
      {
        type: 'category',
        label: '项目介绍',
        link: {
          type: 'generated-index',
          //description: 'describtion to be updated',
          keywords: ['x', 'x'],
          slug: '/项目介绍',
        },
        items: [
          "TODO6"
        ],
      },
    ],
};

module.exports = sidebars;
