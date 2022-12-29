---
id: Docusaurus特性与模板
title: Docusaurus特性与模板
---
​	本文主要是对Docusaurus的基本特性及基本语法的演示。
***
**告示框模板**

:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::caution

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
***
**React 组件**

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<Highlight color="#25c2a0">Docusaurus green</Highlight> and <Highlight color="#1877F2">Facebook blue</Highlight> are my favorite colors.

I can write **Markdown** alongside my _JSX_!

***
**Tabs 组件**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple">
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>

***
**公式**
$$
I = \int_0^{2\pi} \sin(x)\,dx
$$

***

**插入图片并居中**

<div style={{textAlign: 'center'}}>
  <img src={require('/img/logo.png').default} width="150" />
</div>

***
**代码相关**
```cpp {5,13-19} showLineNumbers
void Screen1View::handleTickEvent()
{
    this->tickCounter++;
    static uint8_t change = 0;
    /* 高亮测试 */
    if (this->tickCounter % 50 == 0)
    {
        if (change)
        {
            change = 0;
            textArea1.setTypedText(TypedText(T_RESOURCEID2));
        }
        /* 高亮测试 */
        else
        {
			change = 1;
			textArea1.setTypedText(TypedText(T_RESOURCEID1));
        }
        /* 高亮测试 */
        textArea1.invalidate();
    }
}
```
****

**模型插入**

<div style={{height: "60vh"}}>
<iframe
  width="100%"
  height="100%"
  scrolling="no" 	  
  src="https://3dviewer.net/embed.html#model=https://raw.githubusercontent.com/PawnMa/3D_Model/main/STLink%20V2.1.pdf.mtl,https://raw.githubusercontent.com/PawnMa/3D_Model/main/STLink%20V2.1.pdf.obj$camera=1.50899,0.19617,6.12087,0.38280,0.00000,0.00577,0.00000,1.00000,0.00000,45.00000$cameramode=perspective$envsettings=fishermans_bastion,off$backgroundcolor=255,255,255,255$defaultcolor=200,200,200$edgesettings=off,0,0,0,1"
></iframe>
</div>

****

**PCB插入**
<div class="iframe_viewer">
    <iframe 
    scrolling="no"
    src="https://personal-viewer.365.altium.com/client/index.html?feature=embed&source=1A7F796E-20FF-4111-98CD-26486B1C1527&activeView=PCB"> 
    </iframe>
</div>

****

**BOM插入**
<div class="iframe_viewer">
    <iframe 
    scrolling="no"
    src="html/STLink_V2.1_TypeC.html"> 
    </iframe>
</div>

