import utils from "../utils";
import service from "../utils/service";

const codeApi = {
  getGlobalVal: utils.apiPrefix + "/source/dictionary/value/map/global",
  getCodeInfo: utils.apiPrefix + "/source/order/code/codeLink",
//   // 获取全局变量
//   getGlobalVal: (params) => {
//     return service.get(`/source/dictionary/value/map/${params}`);
//   },
//   // 获取码信息
//   getCodeInfo: (params) => {
//     return service.get(`/source/order/code/codeLink/${params}`);
//   },
};

export default codeApi;
