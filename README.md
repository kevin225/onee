onee
====

on need-当需要时，功能粒化、按需加载、管理组件

API

onee.use
onee.use(plugin-index).done(callback);

Demo:
onee.use(“onee.Powin”).done(functin() {
	console.log(“do it”)
})

<strong>onee.inc</strong>
onee.inc(file[, file[, file[, file]...]]).done(callback);

Demo1:
onee.inc(“script1.js”, “script2.js”, “script3.js”) // 1 2 3 均有依赖关系

Demo2:
onee.inc([“script1.js”, “script2.js”, “script3”]) // 1 2 3 均无依赖关系

Demo3:
onee.inc([“script1.js”, “script2.js”], “script3”) //  1 2 无依赖关系，3依赖于1 2

//How to use

1. onee 基于 underscodejs
2. workspace属性的配置
3. onee-plugins.js 内置组件

Demo:
<script src="/onee/Base/Underscode/underscodejs.min.js"></script>
<script src="/onee/Base/onee.js" workspace=""></script>
<script src="/onee/Base/onee-plugins.js"></script>

workspace 说明：

workspace 主要为onee加载内置组件提供路径，当onee是绝对地址加载进来（http://www.xxx.com/xxx/onee/），或者当onee存放在根目录（/onee），workspace属性不需要配置。
