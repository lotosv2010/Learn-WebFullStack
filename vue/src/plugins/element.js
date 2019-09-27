import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Form,
  FormItem,
  Input,
  Radio,
  RadioGroup,
  Loading,
  MessageBox,
  Message,
  Notification,
  Link,
  Divider,
  Tabs,
  TabPane
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small' };

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Link)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
