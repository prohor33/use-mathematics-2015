#ЕГЭ Математика 2017

![icon](https://cloud.githubusercontent.com/assets/5472900/11669155/3dd0cf68-9e0c-11e5-942f-cbe95fb8b192.png)

#Plugins
cc.fovea.cordova.purchase<br>
https://github.com/j3k0/cordova-plugin-purchase

cordova-plugin-network-information<br>
https://github.com/apache/cordova-plugin-network-information

## How to install plugins?

###Purchase plugin

```sh
cordova plugin add cc.fovea.cordova.purchase
```

Need android too?

```sh
cordova plugin add cc.fovea.cordova.purchase --variable BILLING_KEY="MIIB...AQAB"
```

###Network state plugin
```sh
cordova plugin add cordova-plugin-network-information
```

###Social Sharing plugin
```sh
cordova plugin add cordova-plugin-x-socialsharing
```

###Google Analytics plugin
```sh
cordova plugin add cordova-plugin-google-analytics
```

##Troubleshooting
If app is crashing on loading theme list, see this issue:<br>
https://github.com/j3k0/cordova-plugin-purchase/issues/123  <br>
basically, you need to set biiling key in billing_key_param.xml manually
