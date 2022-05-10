# Minecraft Language File Editor

## 简介

一个使用 Vue 开发的用于编辑 Minecraft 语言文件的工具。  
目前支持 JSON 和 LANG 格式的语言文件：

```json
{
    "key_1": "文本 1",
    "key_2": "文本 2",
    ...
}
```

```text
key_1=文本 1
key_2=文本 2
...
```

## 特性 / 功能

- JSON 语言文件导入、导出
- LANG 语言文件导入、导出
- 内容分页（翻页、设置每页显示的数量）
- Unicode 编码转换

## 注意

- 目前暂未对 JSON 文件中的重复 key 进行处理（例如作为注释的 `_comment`）。
- 若导入的文件中包含注释（例如 `// 注释内容`），导出时会被移除。

## 项目主要依赖项

- [Vue 2](https://vuejs.org/)
  - [Vuex](https://vuex.vuejs.org/)
- [Buefy](https://buefy.org/)
- [FileSaver.js](https://www.npmjs.com/package/file-saver)
- [JSON5](https://json5.org/)
- [Less.js](https://lesscss.org/)
- [Material Design Icons](https://materialdesignicons.com/)
- [ress](https://www.npmjs.com/package/ress)

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm run serve
```

### Compiles and minifies for production

```
pnpm run build
```

### Lints and fixes files

```
pnpm run lint-fix
```
