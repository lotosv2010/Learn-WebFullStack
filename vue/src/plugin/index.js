// 插件的入口文件
import message from './Message.vue'
import table from './Table.vue'
let plugin = {}
plugin.install = function(Vue, options) {
    Vue.component(message.name, message)
    Vue.component(table.name, table)
}
export default plugin