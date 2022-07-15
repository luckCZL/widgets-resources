Please see [Breadcrumb](https://ant.design/components/breadcrumb-cn/) in the antd documentation for details.

# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。
A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.

# 功能使用

当系统拥有超过两级以上的层级结构时；
当需要告知用户『你在哪里』时；
当需要向上导航的功能时。
When the system has more than two layers in a hierarchy.
When you need to inform the user of where they are.
When the user may need to navigate back to a higher level.

# 参数配置

itemRender: 自定义链接函数，和 react-router 配置使用
params: 路由的参数
routes: router 的路由栈信息
separator: 分隔符自定义
className: 自定义类名
dropdownProps: 弹出下拉菜单的自定义配置
href: 链接的目的地
overlay: 下拉菜单的内容
onClick: 点击事件
