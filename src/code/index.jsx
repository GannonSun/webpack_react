import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Timeline, Image, message } from "antd";
import {
  SafetyCertificateOutlined,
  AimOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import codeApi from "../api/code";
import bgImg from "../../public/img/bg.gif";
import "./index.css";

const numToChinese = [
  "首站",
  "第二站",
  "第三站",
  "第四站",
  "第五站",
  "第六站",
  "第七站",
  "第八站",
  "第九站",
  "第十站",
];

const Index = () => {
  const [productInfo, setProductInfo] = useState([]);
  const [siteInfo, setSiteInfo] = useState([]);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (window && window.location && window.location.href) {
      setSpinning(true);
      getGloabl((globalVal) => {
        if (globalVal && globalVal.codeUrl) {
          const result = window.location.href;

          // 正式环境start
          const codeUrls = globalVal.codeUrl.split(";"); //array
          for (let i = 0; i < codeUrls.length; i++) {
            const index = result.indexOf(codeUrls[i]);
            if (index !== 0) {
              if (i === codeUrls.length - 1) {
                setSpinning(false);
                message.info("当前码格式非法\n" + result);
              }
              continue;
            }
            const newCode = result.split(codeUrls[i])[1];
            const stuCardReg = /^[0-9]{18}$/;
            if (stuCardReg.test(newCode)) {
              getCodeInfo(newCode);
            } else {
              setSpinning(false);
              message.info("溯源码格式非法，请重试");
            }
            break;
          }

          // const index = result.indexOf(globalVal.codeUrl);
          // const newCode =
          //   result.split(globalVal.codeUrl)[1] &&
          //   result.split(globalVal.codeUrl)[1].trim();
          // if (index !== 0) {
          //   setSpinning(false);
          //   message.info("当前码格式非法\n" + result);
          //   return false;
          // }
          // const stuCardReg = /^[0-9]{18}$/;
          // if (stuCardReg.test(newCode)) {
          //   getCodeInfo(newCode);
          // } else {
          //   setSpinning(false);
          //   message.info("溯源码格式非法，请重试");
          // }
          // 正式环境end

          // 本地测试start
          // const index = result.lastIndexOf('/');
          // const newCode = result.slice(index + 1).trim();
          // getCodeInfo(newCode);
          // 本地测试end
        } else {
          setSpinning(false);
          message.error("出现未知错误，请联系管理员(GLOBAL_NOFOUND)");
        }
      });
    }
  }, []);

  const getGloabl = (cb) => {
    axios.get(codeApi.getGlobalVal).then((res) => {
      if (res.data.code === "0") {
        cb && cb(res.data.data);
      } else {
        message.error(res.data.message);
      }
    });
    // codeApi.getGlobalVal("global").then((res) => {
    //   console.log(res);
    // });
  };

  const getCodeInfo = (code) => {
    axios
      .get(codeApi.getCodeInfo, {
        params: {
          code,
        },
      })
      .then((res) => {
        setSpinning(false);
        if (res.data.code === "0") {
          setProductInfo(res.data.data && res.data.data.productInfo);
          setSiteInfo(res.data.data && res.data.data.siteInfo);
        } else {
          message.error(res.data.message);
        }
      });
  };

  return (
    <div className="content">
      <div className="codeHeader">
        <span className="title">冷链溯源码信息</span>
        <img src={bgImg} alt="" />
        <p className="desc">
          <span className="descContent">
            <SafetyCertificateOutlined /> 防篡改
          </span>
          <span className="descContent">
            <AimOutlined /> 可追溯
          </span>
          <span className="descContent">
            <EyeOutlined /> 透明
          </span>
        </p>
      </div>
      <Spin tip="查询中" spinning={spinning}>
        <div className="codeContent">
          <div className="codeCard">
            <div className="cardTitle">产品信息</div>
            <div className="cardContent">
              <div>
                <Timeline>
                  {productInfo &&
                    productInfo.map((item, i) => {
                      if (item.type === "TEXT") {
                        return (
                          <Timeline.Item key={i}>
                            <div style={{ display: "flex" }}>
                              <span style={{ width: "50%" }}>{item.title}</span>
                              <span style={{ width: "50%" }}>{item.value}</span>
                            </div>
                          </Timeline.Item>
                        );
                      } else {
                        return (
                          <Timeline.Item key={i}>
                            <div style={{ display: "flex" }}>
                              <span style={{ width: "50%" }}>{item.title}</span>
                              <div style={{ width: "50%" }}>
                                <Image.PreviewGroup>
                                  {item.value &&
                                    JSON.parse(item.value).map((val, index) => {
                                      return (
                                        <Image
                                          width="100%"
                                          src={val}
                                          key={index}
                                        />
                                      );
                                    })}
                                </Image.PreviewGroup>
                                {/* {item.value &&
                                  JSON.parse(item.value).map((val, index) => {
                                    return (
                                      <img
                                        src={val}
                                        alt=""
                                        key={index}
                                        onClick={() => handleClickImg(val)}
                                        style={{
                                          width: "100%",
                                          marginBottom: 10,
                                        }}
                                      />
                                    );
                                  })} */}
                              </div>
                            </div>
                          </Timeline.Item>
                        );
                      }
                    })}
                </Timeline>
              </div>
            </div>
          </div>
          {siteInfo &&
            siteInfo.map((site, i) => {
              return (
                <div className="codeCard" key={i}>
                  <div className="cardTitle">{numToChinese[i]}</div>
                  <div className="cardContent">
                    <div>
                      <Timeline>
                        {site &&
                          site.map((item, index) => {
                            return (
                              <Timeline.Item key={index}>
                                <div style={{ display: "flex" }}>
                                  <span style={{ width: "50%" }}>
                                    {item.title}
                                  </span>
                                  <span style={{ width: "50%" }}>
                                    {item.value}
                                  </span>
                                </div>
                              </Timeline.Item>
                            );
                          })}
                      </Timeline>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Spin>
    </div>
  );
};

export default Index;
