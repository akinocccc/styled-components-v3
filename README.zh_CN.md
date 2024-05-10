<div align="center">
  <img alt="Owner avatar" src="https://vue-styled-components.com/logo.png" width="220px" />
  <h1>Vue Styled Components</h1>
  一个类似于 styled-components 的 CSS in JS 库，支持 Vue 3，并帮助您快速开发应用程序！

  <br>
  <br>

  [![CI status][github-action-image]][github-action-url]
  [![NPM version][npm-version]][npm-url]
  [![minzip size][npm-bundle-size]][npm-url]
  [![chat on discord][discord]][discord-url]

  [github-action-image]: https://github.com/v-vibe/vue-styled-components/workflows/Code%20Check/badge.svg
  [github-action-url]: https://github.com/v-vibe/vue-styled-components/actions/workflows/code-check.yml
  [npm-version]: https://img.shields.io/npm/v/%40vvibe%2Fvue-styled-components
  [npm-bundle-size]: https://img.shields.io/bundlephobia/minzip/%40vvibe%2Fvue-styled-components
  [npm-url]: http://npmjs.org/package/@vvibe/vue-styled-components
  [discord]: https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true
  [discord-url]: https://discord.gg/UbJxnvt2UH



  [Changelog](./CHANGELOG.md) · [English](./README.md) · 中文
</div>

## ✨特性

✅ 样式化 Vue 组件或原生组件

✅ 设置默认 Attributes

✅ 传递 Props

✅ 支持主题化

✅ 生成 keyframes

✅ 生成可复用 CSS 片段

✅ 创建全局样式

✅ 添加或覆盖 Attributes

✅ 支持 CSS 嵌套。（仅支持 web: https://drafts.csswg.org/css-nesting/#nesting）

## 📦安装

```sh
npm i @vvibe/vue-styled-components
```

```sh
yarn add @vvibe/vue-styled-components
```

```sh
pnpm i @vvibe/vue-styled-components
```

## 🔨使用

### 样式化组件

```vue
<script setup lang="ts">
import { styled } from '@vvibe/vue-styled-components';
import OtherComponent from './VueComponent.vue';

const StyledDiv = styled('div')`
  width: 100px;
  height: 100px;
  background-color: #ccc;
  color: #000;
`;
const StyledStyledDiv = styled(StyledDiv)`
  width: 100px;
  height: 100px;
  background-color: #000;
  color: #fff;
`;
const StyledOtherComponent = styled(OtherComponent)`
  width: 100px;
  height: 100px;
  background-color: red;
  color: #fff;
`;
</script>

<template>
  <StyledDiv>Styled Div</StyledDiv>
  <StyledStyledDiv>Styled Styled Div</StyledStyledDiv>
  <StyledOtherComponent>Styled Other Vue Component</StyledOtherComponent>
</template>
```

### Attributes 设置

```vue
<script setup lang="ts">
import { styled } from '@vvibe/vue-styled-components';

const StyledDiv = styled.div.attrs({
  class: 'styled-div'
})`
  width: 100px;
  height: 100px;
  background-color: #ccc;
  color: #000;
`;
</script>

<template>
  <StyledDiv>Styled Div</StyledDiv>
  <!-- <div class="styled-div">Styled Div</div> -->
</template>
```

### 通过 Props 动态控制样式

如果要在样式中传递 props，则必须在 styled 函数中定义这些属性。因为 Vue 组件需要显式声明 props，以便 Vue 知道应如何处理传递给组件的外部 props（请参阅 [Props Declaration](https://vuejs.org/guide/components/props.html#props-declaration)）

```vue
<script setup lang="ts">
import { styled } from '@vvibe/vue-styled-components';

const StyledDiv = styled('div', {
  color: String
})`
  width: 100px;
  height: 100px;
  background-color: #ccc;
  color: ${(props) => props.color};
`;
</script>

<template>
  <StyledDiv color="red">Styled Div</StyledDiv>
</template>
```

### 主题

```vue
<script setup lang="ts">
import { styled, ThemeProvider } from '@vvibe/vue-styled-components';

const StyledDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ccc;
  color: ${(props) => props.theme.color};
`;
</script>

<template>
  <ThemeProvider :theme="{ color: '#fff' }">
    <StyledDiv>Styled Div</StyledDiv>
  </ThemeProvider>
</template>
```

### 生成 keyframes

您可以使用 `keyframes` 函数来定义关键帧动画，然后使用 `keyframes` 的返回值将其应用于样式化组件。

```vue
<script setup lang="ts">
import { styled, keyframes } from '@vvibe/vue-styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const translate = keyframes`
  0 {
    transform: translateX(0);
  }
  50% {
    transform: translateX(250%);
  }
  60% {
    transform: rotate(360deg);
  }
`;

const StyledBaseDiv = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
`;

const StyledRotateDiv = styled(StyledBaseDiv)`
  background-color: skyblue;
  animation: ${rotate} 2s linear infinite;
`;

const StyledTranslateDiv = styled(StyledBaseDiv)`
  margin-left: 10px;
  background-color: darkred;
  animation: ${translate} 2s ease infinite alternate;
`;
</script>

<template>
  <StyledRotateDiv />
  <StyledTranslateDiv />
</template>
```

### 生成全局样式

一个用于创建全局样式的函数。

```vue
<script setup>
import { createGlobalStyle } from '@vvibe/vue-styled-components';

const GlobalStyle = createGlobalStyle`
    body {
      color: ${(props) => props.color};
    }
  `;
</script>
<template>
  <GlobalStyle color="white" />
</template>
```

### 生成css

一个用于从带有插值的模板字符串生成 CSS 的函数。

```vue
<script setup lang="ts">
import { styled, css } from '@vvibe/vue-styled-components';

const mixin = css`
  color: red;
  background-color: blue;
`;
const DivWithStyles = styled('div')`
  ${mixin}
`;
</script>

<template>
  <DivWithStyles>Div with mixin</DivWithStyles>
</template>
```

### 添加或覆盖 Attributes

一个向 `ComponentInstance` or `HTMLElements` 添加或覆盖 `Attributes` 的函数.

```vue
<script setup lang="ts">
import { withAttrs } from '@vvibe/vue-styled-components';

const DivWithAttrs = withAttrs('div', {
  class: 'div-with-attrs'
});

const DivWithAttrs2 = withAttrs(DivWithAttrs, {
  class: 'div-with-attrs-2'
});
</script>

<template>
  <DivWithAttrs>Div with attrs</DivWithAttrs>
  <DivWithAttrs2>Div with attrs 2</DivWithAttrs2>
</template>

<style scope>
.div-with-attrs {
  color: red;
}

.div-with-attrs-2 {
  color: blue;
}
</style>
```

**更多细节请查看 [官方文档](https://vue-styled-components.com)**

## 贡献者

<a href="https://github.com/v-vibe/vue-styled-components/graphs/contributors">
  <img alt="contributor list" src="https://contrib.rocks/image?repo=v-vibe/vue-styled-components" />
</a>


另外，感谢 [styled-components](https://github.com/styled-components).
