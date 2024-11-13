IOS部署需要apple developer program，需要花费¥

目前在android端deploy
在frontend目录下输入命令
```sh
eas build --platform android
```

将打包好的aab文件转化为apk即可安装，在本机目录运行
```sh
java -jar bundletool-all-1.17.2.jar build-apks --bundle=app.aab --output=app.apks --mode=universal --ks=test.keystore --ks-pass=pass:Yrch031022 --ks-key-alias=testalias
```