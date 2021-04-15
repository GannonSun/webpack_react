#!/bin/bash

echo "build 生成生产环境代码"

rm -rf dist && npm run build

echo "上传代码到云主机"

cd dist && scp -i ~/.ssh/gannonsunTx.pem -r *  root@118.25.4.192:/opt/project/webpack-react
