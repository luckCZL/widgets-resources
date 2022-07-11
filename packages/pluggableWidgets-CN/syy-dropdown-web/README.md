Please see [Dropdown](https://ant.design/components/dropdown/) in the ant-design documentation for details.

Demo URL [Demo URL](https://mendix-ui.runjian.com/p/dropdown)

Github Code [Code URL](https://github.com/runjiangufen/widgets-resources)

本控件基于 Ant Design 进行封装, 皆在打造一套基于 antd 设计的 Mendix 控件

# dropdown

To trigger an operation.

## When To Use

A dropdown means an operation (or a series of operations). Clicking a dropdown will trigger corresponding business logic.

In Ant Design we provide 5 types of dropdown.

-   Primary dropdown: indicate the main action, one primary dropdown at most in one section.
-   Default dropdown: indicate a series of actions without priority.
-   Dashed dropdown: used for adding action commonly.
-   Text dropdown: used for the most secondary action.
-   Link dropdown: used for external links.

And 4 other properties additionally.

-   `danger`: used for actions of risk, like deletion or authorization.
-   `ghost`: used in situations with complex background, home pages usually.
-   `disabled`: when actions are not available.
-   `loading`: add loading spinner in dropdown, avoiding multiple submits too.

## 样式引入 Import style sheet

Please see [Configure Your Theme](https://docs.mendix.com/howto/front-end/configuring-your-theme) in the mendix documentation for how to import antd css.

antd css 通过外链 cdn 的方式 在 mendix 的 项目中引入

具体方式为

```
{
    "cssFiles": ["theme.compiled.css","https://cdn.bootcdn.net/ajax/libs/antd/4.15.6/antd.min.css"]
}

```
