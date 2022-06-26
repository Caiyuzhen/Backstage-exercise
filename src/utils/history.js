import { createBrowserHistory } from 'history';


const history = createBrowserHistory()


// export、import可以有多个，export default仅有一个；
// 通过export方式导出，在导入时要加{ }，export default则不需要
export { history }