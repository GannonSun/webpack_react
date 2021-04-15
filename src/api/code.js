import service from "@/utils/service";

const codeApi = {
  getGlobalVal: () => {
    return service.get(`/source/dictionary/value/map/global`);
  },
};

export default codeApi;
