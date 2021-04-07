import {Loading} from "element-ui";
import _ from 'lodash';

let loading = null;
let needRequestCount = 0;


//开启loading状态
const startLoading = (headers = {}) => {
  loading = Loading.service({
    lock: true,
    text: headers.text || "拼命加载中......",
    background: "rgba(0, 0, 0, 0.7)",
    // background: "rgba(255,255, 255, 0.9)",
    target: headers.target || "body"
  });
};

//关闭loading状态
const endLoading = _.debounce(() => {
  if (loading){
    loading.close();
  }
  loading = null;
}, 360);


export const showScreenLoading = (headers) => {
  if (needRequestCount === 0 && !loading) {
    startLoading(headers);
  }
  needRequestCount++;
}

export const hideScreenLoading = () => {
  if (needRequestCount <= 0) return
  needRequestCount--;
  needRequestCount = Math.max(needRequestCount, 0);
  if (needRequestCount === 0) {
    endLoading()
  }
}
export default {};
