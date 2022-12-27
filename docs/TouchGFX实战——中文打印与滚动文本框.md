---
id: 中文打印与滚动文本框
title: 中文打印与滚动文本框
---

# TouchGFX实战——中文打印与滚动文本框

​	本文涉及到的TouchGFX版本基于TouchGFX Designer 4.19.1，已成功应用到实际项目，如有疑问请向作者留言咨询。

***

​	效果演示：

​	整体效果如下，文本自动换行，滚动刷新。可以用来显示log、作串口上位机等应用。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/gif3.gif').default} />
</div>

## 常用文本方案

​	在设计程序过程中，涉及到文本，我们通常会使用TouchGFX Designer的文本资源管理器功能，具体使用方法如下。

- 在Typographies栏目中添加字体类型。
- 在Texts中创建需要用到的文本，过程中可以选择上一步的字体类型。
- 在程序中通过`text.setTypedText(TypedText(RESOURCEID))`来设置或切换显示文本。

实际操作如下：

​	如图创建了一个名为chinese的文本字体，字体属性如右侧显示。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/image-20220624150256293.png').default} />
</div>

​	再通过Texts创建一个文本，如下图为`你好！`与`欢迎使用TouchGFX`，选用刚才创建的文本字体。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/image-20220624151337514.png').default} />
</div>

​	创建控件并选择`TextID`显示。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/image-20220624152705650.png').default}/>
</div>

​	编写代码如下，实现定时文本切换。

```cpp
void Screen1View::handleTickEvent()
{
    this->tickCounter++;
    static uint8_t change = 0;
    if (this->tickCounter % 50 == 0)
    {
        if (change)
        {
            change = 0;
            textArea1.setTypedText(TypedText(T_RESOURCEID2));
        }
        else
        {
			change = 1;
			textArea1.setTypedText(TypedText(T_RESOURCEID1));
        }
        textArea1.invalidate();
    }
}
```

​	效果如下：

<div style={{textAlign: 'center'}}>
  <img src={require('./images/gif1.gif').default} />
</div>



## 全文本显示

​	以上我们尝试了通用的文本显示，那么我们如何不通过提前设置文本ID，像用`printf`一样打印和显示任何的中文文本呢？其实实现起来非常的方便，原理一样，可能存在的问题就是全文本显示比较占用嵌入式设备上的Flash大小。具体方法如下：

- 更改Typographies栏目字体类型的包含范围
- 调用显示

实际操作如下：

​	首先我们需要知道TouchGFX使用的为Unicode编码，其使用两个字节代表一个中文字符，其具体的编码范围如下：

- 汉字：[0x4e00,0x9fa5]（或十进制[19968,40869]）
- 数字：[0x30,0x39]（或十进制[48, 57]）
- 小写字母：[0x61,0x7a]（或十进制[97, 122]）
- 大写字母：[0x41,0x5a]（或十进制[65, 90]）

​	按照如上编码范围修改TouchGFX Designer的配置

<div style={{textAlign: 'center'}}>
  <img src={require('./images/image-20220624154427947.png').default} />
</div>

```
Wildcard Characters：!”"#*%&()'$+-@_, .:;?/~±×÷•º`´{}©£€^®¥_=[]¡¢|\¿><【】；‘’，。、｛｝：“”《》？|·~！@#￥%……&*（）——+
Wildcard Ranges：0x20-0x1BF,0X4e00-0X9f5a
```

​	之后创建一个文本框，开启Wildcard1，合理设置Buffer大小。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/image-20220624154832310.png').default} />
</div>

​	通过代码打印即可显示中文文本，**注意**需要将打印所在文本格式调成**UTF8**文本，可使用VS Code来重新编码保存，否则不能使用`Unicode::fromUTF8`来正常显示。

```cpp
void Screen1View::handleTickEvent()
{
    tickCounter++;
    uint8_t str[128];
    if (tickCounter % 50 == 0)
    {
		static uint16_t textCount = 0;
		sprintf((char*)str, "你好TouchGFX:count %d\n", textCount++);
        this->TextAreaAddStr(str, sizeof(str));
    }
}

void Screen1View::TextAreaAddStr(uint8_t* str, uint32_t len)
{
	Unicode::fromUTF8(str, textArea1Buffer, len);
    textArea1.invalidate();
}
```

​	效果如下：

<div style={{textAlign: 'center'}}>
  <img src={require('./images/gif2.gif').default} />
</div>



## 自动换行与滚动显示

​	当所打印字符超出文本框宽度时可能会出现显示不全的问题，这时候在invalidate之前调用官方API`textArea1.setWideTextAction(WIDE_TEXT_CHARWRAP);`即可实现自动换行。官方注释说明`WIDE_TEXT_CHARWRAP`适合中文换行所用，效果如下。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/image-20220624165806616.png').default} />
</div>

​	当然，配合自动换行还有滚动显示可用，我们需要加入滚动窗口控件。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/image-20220624170333910.png').default} />
</div>

并且为了实现滚动效果，我们需要增大文本框的长度，如下图所示。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/image-20220624170407390.png').default} />
</div>

​	接下来我们需要定义一个textBuf，来负责搬运，合成与滚动刷新判断，全部代码如下

- 判断当窗口满时开始自动滚动窗口条
- 判断当滚动条滚动到最后时，清空显示并将滚动条复位。

```cpp
#include <gui/screen1_screen/Screen1View.hpp>
#include <texts/TextKeysAndLanguages.hpp>
#include <stdio.h>
#include <string.h>
Screen1View::Screen1View()
{

}

void Screen1View::setupScreen()
{
    Screen1ViewBase::setupScreen();
    this->bufSize = 4096;
	this->textBuf = (uint8_t*)malloc(this->bufSize);
	if (textBuf != NULL)
	{
		memset(textBuf, 0, this->bufSize);
	}
}

void Screen1View::tearDownScreen()
{
    Screen1ViewBase::tearDownScreen();
}
void Screen1View::handleTickEvent()
{
    tickCounter++;
    uint8_t str[128];
    if (tickCounter % 5 == 0)
    {
		static uint16_t textCount = 0;
		sprintf((char*)str, "TouchGFX: count %d 欢迎收藏我的博客www.pawn-ma.com \n", textCount++);
        this->TextAreaAddStr(str, sizeof(str));
    }
}

void Screen1View::TextAreaAddStr(uint8_t* str, uint32_t len)
{
	int16_t textHeight = 0, nowTextHeight = 0;
	static int16_t addHeigth = 0, addHeightsum = 0, scrollHeight = 0;
	nowTextHeight = textArea1.getTextHeight();
	textHeight = textArea1.getHeight();
	scrollHeight = scrollableContainer1.getHeight();
	/* buf is ready */
	if (textBuf == NULL || textArea1Buffer == NULL || len == 0)
		return;
	/* buf is full text is  on the bottom of scroll*/
	if (nowTextHeight > textHeight)
	{
		memset(textBuf, 0, this->bufSize);
		scrollableContainer1.doScroll(0, addHeightsum);
		addHeigth = 0;
		addHeightsum = 0;
		nowTextHeight = 0;
	}
	/* scroll the text */
	if (nowTextHeight > scrollHeight + addHeightsum)
	{
		addHeigth = scrollHeight + addHeightsum - nowTextHeight;
		addHeightsum = addHeightsum - addHeigth;
		scrollableContainer1.doScroll(0, addHeigth);
	}
	uint32_t lens = strlen((char*)textBuf);
	memcpy((char*)textBuf + lens, (char*)str, len);
	Unicode::fromUTF8(textBuf, textArea1Buffer, lens + len);
	textArea1.setWideTextAction(WIDE_TEXT_CHARWRAP);
	textArea1.invalidate();
}
```

​	以上代码由于仿真条件，并未做太多的内存优化，并且此方法只是滚动显示的比较快捷实现的方法的一种。

​	此方法存在效率低、内存占用大等缺点。不过用此方法实现滚动显示，在整屏清除前，支持历史回看，比较适合外带sdram的嵌入式设备。

## 实机效果

​	实机效果如下所示，显示串口发来的任意数据，也算是一种有趣的玩法，用嵌入式调试嵌入式（dog…）。但是要注意一般上位机发送都是GBK编码，需要做编码转换。Fatfs文件系统中有相关的转换代码。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/gif4.gif').default} />
</div>

​	稍加修饰就可以实现更多玩法。

<div style={{textAlign: 'center'}}>
  <img src={require('./images/gif5.gif').default} />
</div>
