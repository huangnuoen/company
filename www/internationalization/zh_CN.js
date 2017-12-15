/**
 * Created by qkchung on 16/5/20.
 */
function setAllTextLanguage(which){
    /*以下变量名根据index.html的父文件夹名命名*/
    var irWidget = {
        SelectTitle:'请选择一个按钮进行设置',
        assignedTitle:'此按钮已经被设置过...',
        test:'测试',
        reassign:'重新设置',
        cancel:'取消',
        teachTitle:'Oomi Cube学习遥控器指令',
        teachTur:'将遥控器置于距Cube的上方然后点击您想要Oomi学习的遥控键',
        successTitle:'成功!',
        failTitle:'失败!',
        done:'完成',
        back:'返回',
        tryAgain:'重试',
        test2:'测试此按钮',
        ScanningText:'扫描中',
        reOff:'您已完成关机模式的设置，是否重新设置？',
        reprogram:'重新设置',
        reSet:'该模式已设置完毕，是否重新设置？',
        turnAcOn:'第一步，开启空调。',
        next:'下一步',
        teachPlugOff:'设置插座关机。将遥控器指向红外转发器，然后关闭空调。',
        setAcConfig:'将空调设置成您想要的配置状态（风速、温度、模式），然后关闭空调。',
        teachPlugSetting:'设置插座。将遥控器指向红外转发器，打开空调。',
        successOff:'测试时，请使用遥控器打开空调，选择“测试”按键。操作过程中请确保插座的红外中继器正对着空调。',
        successSetting:"测试时请确保插座红外中继器正对着空调。",
        fail:'此操作失败，请重试',
        turnOff:'关闭'
    };

    var date_picker = {
        HOUR_TOPIC : '时',
        MINUTE_TOPIC : '分',
        AM_PM_TOPIC : '上午/下午',
        MONTH_TOPIC : '月',
        DAY_TOPIC : '日',
        YEAR_TOPIC : '年',
        AM:'上午',
        PM:'下午',
        DONE:'确定',
        EDIT_WIDGET_NAME:'插件名:'
    };
    var Delay = {
        EDIT_WIDGET_NAME:'插件名:',
        SEC_TOPIC : ' 秒',
        MINUTE_TOPIC : '分'
    };
    var deviceRoomWidget = {
        EDIT_WIDGET_NAME:'插件名:',
        MULTI_CUBE_BRIGHTNESS: '亮度:',
        MULTI_CUBE_BRIGHTNESS_VALUE: '明亮',
        MULTI_CUBE_BRIGHTNESS_VALUE_DARK: '昏暗',
        MULTI_CUBE_MOTION:'红外感应:',
        MULTI_CUBE_MOTION_VALUE:'有',
        MULTI_CUBE_MOTION_VALUE_NO:'无',
        MULTI_CUBE_TEMPERATURE:'温度:',
        DW_Motion:'状态:',
        DW_MotionYES:'开启',
        DW_MotionNO:'关闭',
        DW_BATTERY:'电量:',
        AQ_NO_DEVICE:'无设备',
        AQ_GREAT:'优',
        AQ_GOOD:'优',
        AQ_OK:'良',
        AQ_Bad:'差',
        AQ_VeryBad:'极差',
        AQ_pm25:'空气质量',
        AQ_Light_POLLUTE:'轻度污染',
        AQ_MODERATE_POLLUTE:'中度污染',
        AQ_HEAVY_POLLUTE:'重度污染',
        AQ_SEVERE_POLLUTE:'严重污染',
        NewMotionTitle:'红外感应',
        NewMotionTrue:'有',
        NewMotionFalse:'无',
        OnOffOn: '开',
        OnOffOff: '关',
        WS_MotionYES: '检测到',
        WS_MotionNO: '未检测到',
        AC_off:'关闭',
        AC_energySave:'节能',
        AC_StrongCool:'强冷',
        AC_cool:'制冷',
        AC_warm:'制热',
        AC_mode:'模式',
        sirenVolume:'音量',
        sirenSound:'声音',
        sirenLength:'时长',
        sirenLow:'低',
        sirenMedium:'中',
        sirenHigh:'高',
        sirenSec:'秒',
        sirenMin:'分',
        sirenS1:'救护车',
        sirenS2:'火车',
        sirenS3:'汽笛',
        sirenS4:'报警',
        sirenS5:'货车',
        sirenS6:'报时',
        test:'测试',
        stop:'停止'
        // sirenS7:'设防',
        // sirenS8:'安防触发'
    };
    var LearnMore = {
        EDIT_WIDGET_NAME:'插件名:',
        LEARN1: '设备界面+添加插件',
        LEARN2:'添加新Oomi设备',
        LEARN3:'成为插件专家',
        LEARN4:'隐藏Oomi Touch控制'
    };
    var Air_Quality = {
        EDIT_WIDGET_NAME:'插件名:',
        AQ_GREAT:'优',
        AQ_GOOD:'良',
        AQ_Light_POLLUTE:'轻度污染',
        AQ_MODERATE_POLLUTE:'中度污染',
        AQ_HEAVY_POLLUTE:'重度污染',
        AQ_SEVERE_POLLUTE:'严重污染',
        AQ_NO_DEVICE:'无设备'
    };
    var bulb = {
        EDIT_WIDGET_NAME:'插件名:',
        popSolid:'单色模式',
        popRainbow:'彩虹模式',
        popPattern:'定制色卡',
        popRandom:'随机模式',
        chooseTitle:'标准色',
        chooseRGBTitle: '选择灯光颜色',
        saveTitle:'个人收藏',
        speed:'变色频率',
        slowest:'最慢',
        slow:'稍慢',
        normal:'常速',
        fast:'稍快',
        fastest:'最快',
        continuous:'渐变',
        smooth:'连贯',
        instant:'直接切换',
        transition:' 过渡方式:',
        RandomTur:'已启动灯光随机模式',
        changeNow:'更换颜色',
        patternTitle:'定制自己的色卡',
        patternTur:'选择以下一种颜色，并点击原有色卡中的一种颜色即可将其替换。若选择以下一种颜色，并点击加号即可直接将其添加进色卡中',
        changeNameTitle:'更改名称',
        changeDeviceTitle:'更换设备',
        deleteGroupTitle:'删除组',
        selectedNameTitle: '个选中设备',
        saveText: '保存'
    };

    var PhilipsHue = {
        EDIT_WIDGET_NAME:'插件名:',
        popSolid:'单色模式',
        popRainbow:'彩虹模式',
        popPattern:'定制色卡',
        popRandom:'随机模式',
        chooseTitle:'标准色',
        chooseRGBTitle: '选择灯光颜色',
        saveTitle:'个人收藏',
        speed:'变色频率',
        slowest:'最慢',
        slow:'稍慢',
        normal:'常速',
        fast:'稍快',
        fastest:'最快',
        continuous:'渐变',
        smooth:'连贯',
        instant:'直接切换',
        transition:' 过渡方式',
        RandomTur:'已启动灯光随机模式',
        changeNow:'更换颜色',
        patternTitle:'定制自己的色卡',
        patternTur:'选择以下一种颜色，并点击原有色卡中的一种颜色即可将其替换。若选择以下一种颜色，并点击加号即可直接将其添加进色卡中',
        changeNameTitle:'更改名称',
        changeDeviceTitle:'更换设备',
        deleteGroupTitle:'删除组',
        saveText: '保存'
    };
    var D_W_Sensor = {
        EDIT_WIDGET_NAME:'插件名:',
        DW_MotionYES:'开启',
        DW_MotionNO:'关闭'
    };
    var MultiSensor = {
        EDIT_WIDGET_NAME:'插件名:',
        MULTI_CUBE_BRIGHTNESS: '亮度',
        MULTI_CUBE_BRIGHTNESS_VALUE: '明亮',
        MULTI_CUBE_BRIGHTNESS_VALUE_DARK: '昏暗',
        MULTI_CUBE_MOTION:'红外感应',
        MULTI_CUBE_MOTION_VALUE:'有',
        MULTI_CUBE_MOTION_VALUE_NO:'无',
        MULTI_CUBE_TEMPERATURE:'温度'
    };
    var MultiSensor2 = {
        EDIT_WIDGET_NAME:'插件名:',
        MULTI_CUBE_BRIGHTNESS: '亮度',
        MULTI_CUBE_BRIGHTNESS_VALUE: '明亮',
        MULTI_CUBE_BRIGHTNESS_VALUE_DARK: '昏暗',
        MULTI_CUBE_MOTION:'红外感应',
        MULTI_CUBE_MOTION_VALUE:'有',
        MULTI_CUBE_MOTION_VALUE_NO:'无',
        MULTI_CUBE_TEMPERATURE:'温度',
        MULTI_CUBE_HUMIDITY:'湿度',
        MULTI_CUBE_HUMIDITY_VALUE:'有',
        MULTI_CUBE_HUMIDITY_VALUE_NO:'无'
    };

    var IQAutomations = {
        EDIT_WIDGET_NAME:'插件名:',
        IQ_D_W_OPEN:'开启',
        IQ_D_W_CLOSE:'关闭',
        IQ_D_W_CLOSED:'Closed',
        IQ_STATE_ON:'开',
        IQ_STATE_OFF:'关',
        IQ_MOTION_YES:'有',
        IQ_MOTION_NO:'无',
        IQ_Light:'Light',
        IQ_DIM:'Dim',
        IQ_NORMAl:'Normal',
        IQ_HUMIDITY:'Humidity',
        IQ_motion:'Motion',
        IQ_UV:'UV',
        IQ_Temperature:'Temperature',
        IQ_ABOVE:'Above',
        IQ_BELOW:'Below',
        IQ_ACTION:'Action',
        IQ_DOCK:'Dock',
        IQ_UNDOCK:'UnDock',
        IQ_DOCKED:'Docked',
        IQ_UNDOCKED:'UnDocked',
        IQ_STATUS:'Status',
        IQ_SUNRISE:'Sunrise',
        IQ_SUNSET:'Sunset',
        IQ_PLUS:'Plus',
        IQ_MINUS:'Minus',
        IQ_BECOMES:'Becomes',
        IQ_DISARM:'Disarmed',
        IQ_ARMSTAY:'Armed Stay',
        IQ_ARMAWAY:'Armed Away',
        IQ_BEFORE:'Before',
        IQ_BETWEEN:'Between',
        IQ_OUTSIDE:'之外',
        IQ_AFTER:'After',
        IQ_LEAKD:'Leak Detected',
        IQ_LEAK:'检测到',
        IQ_NOLEAK:'未检测到',
        IQ_DARK:'昏暗',
        IQ_BRIGHT:'明亮',
        IQ_ALERT_TITLE: '提示方式',
        IQ_ALERT_POP: '弹窗',
        IQ_ALERT_Notification: '通知列表',
        IQ_ALERT_TIPS_Popup: '当触发警报时，Oomi Touch将弹出警示信息，同时已连接到Oomi系统的手机也将收到系统通知。',
        IQ_ALERT_TIPS_Notification: '当触发警报时，Oomi Touch和手机应用程序将同时收到OOMI警报信息，并在通知窗口中显示。'
    };
    var TVOC = {
        EDIT_WIDGET_NAME:'插件名:',
        TVOC_GREAT:'优',
        TVOC_GOOD:'良',
        TVOC_Light_POLLUTE:'轻度污染',
        TVOC_MODERATE_POLLUTE:'重度污染',
        AQ_NO_DEVICE:'无设备'
    };
    var editTemplate = {
        GREET:'你好',
        PROCESSING1:'命名你的插件',
        PROCESSING2:'点击一个按钮',
        DONE:'确定',
        ASSIGNTitle:'此按钮已经被学习过了...',
        ASSIGNTest:'测试',
        ASSIGNReassign:'重新学习',
        ASSIGNCanel:'取消',
        TEACHTitle:'设置Oomi',
        TEACHTutorial:'将遥控器置于Cube上方，点击您想要Oomi学习的功能键',
        TEACHScan:'扫描中...',
        RESULTTitleSuccess:'成功!',
        RESULTTitleFail:'失败!',
        RESULTTest:'测试此按钮',
        RESULTRetry:'重试',
        RESULTDone:'完成',
        RESETPIN:'重设密码'
    };
    var IQTriggersTime = {
        DONE:'确定',
        Sun:'周日',
        Mon:'周一',
        Tue:'周二',
        Wed:'周三',
        Thu:'周四',
        Fri:'周五',
        Sat:'周六',
        am:'上午',
        pm:'下午',
        SunTransform:'matrix(1 0 0 1 15 42)',
        MonTransform:'matrix(1 0 0 1 84.5 42)',
        TueTransform:'matrix(1 0 0 1 155 42)',
        WedTransform:'matrix(1 0 0 1 225 42)',
        ThuTransform:'matrix(1 0 0 1 15 112)',
        FriTransform:'matrix(1 0 0 1 85 112)',
        SatTransform:'matrix(1 0 0 1 155 112)',
        font_size:'20',
        hourTopic:'时',
        minTopic:'分',
        AM_PM_TOPIC:'上午/下午'
    };
    var IQConditionsTime = {
        DONE:'确定',
        Sun:'周日',
        Mon:'周一',
        Tue:'周二',
        Wed:'周三',
        Thu:'周四',
        Fri:'周五',
        Sat:'周六',
        am:'上午',
        pm:'下午',
        SunTransform:'matrix(1 0 0 1 15 42)',
        MonTransform:'matrix(1 0 0 1 84.5 42)',
        TueTransform:'matrix(1 0 0 1 155 42)',
        WedTransform:'matrix(1 0 0 1 225 42)',
        ThuTransform:'matrix(1 0 0 1 15 112)',
        FriTransform:'matrix(1 0 0 1 85 112)',
        SatTransform:'matrix(1 0 0 1 155 112)',
        font_size:'20',
        hourStartTopic:'时',
        minStartTopic:'分',
        hourEndTopic:'时',
        minEndTopic:'分',
        AM_PM_TOPIC:'上午/下午'
    };
    var IQ_Scene_IR = {
        SET:'设置',
        TEST:'测试'
    };
    var monitor_page = {
        TemperatureTopic:'温度',
        HumidityTopic:'湿度',
        powerCurrent:'当前',
        powerPastDay:'过去',
        motionStatusON:'感应',
        motionStatusOFF:'没感应',
        powerUnit:'千瓦时',
        pm:'下午',
        am:'上午'
    };
    var AC = {
        AC_off:'关闭',
        AC_energySave:'节能',
        AC_StrongCool:'强冷',
        AC_cool:'制冷',
        AC_warm:'制热',
        AC_mode:'模式'
    };
    var tutorial = {
        common: {
            started: '下一步',
            skip: '跳过',
            got: '知道了！',
            allDone:'完成！',
            findScenesTutorial:'可以在菜单/使用指南，再次打开当前演示。',
            findScenesTutorial:'可以在菜单/使用指南，再次打开场景功能演示。',
            findIQTutorial:'可以在菜单/使用指南，再次打开智能场景功能演示。',
            findMonitorTutorial:'可以在菜单/使用指南，再次打开控制与监测功能演示。',
            restart:'重新演示',
            endDone:'完成'
        },
        scene: {
            page0:{
                mainTitle: '场景',
                subtitle1: '场景功能演示',
                subtitle2: '创建支持同时控制多个设备的快捷按钮。'
            },
            page1:{
                msg1:'请输入场景名称',
                msg2: '请为您的场景命名',
                msg3: '请为您的场景设置图标',
                topTitle: '场景'
            },
            page2:{
                msg1:'请选择图标',
                msg2: '请为您的场景命名',
                msg3: '请为您的场景设置图标',
                topTitle: '场景'
            },
            page3:{
                msg1:'添加智能设备',
                topTitle: 'Reading Time'
            },
            page4:{
                msg1:'设置智能设备进入此场景期望的状态',
                topTitle: 'Reading Time'
            },
            page5:{
                msg1:'添加第二个智能设备',
                topTitle: 'Reading Time'
            },
            page6:{
                msg1:'添加更多智能设备',
                topTitle: 'Reading Time'
            },
            page7:{
                msg1:'完成设置，保存后退出。',
                topTitle: 'Reading Time'
            },
            page8:{
                msg1:'场景管理',
                topTitle: '场景'
            },
            page9:{
                msg1:'选择是否创建桌面快捷方式',
                topTitle: '场景'
            },
            page10:{
                msg1:'修改场景名称或删除场景',
                topTitle: '场景'
            },
            test:'测试',
            revert:'重新设置',
            desktop: '桌面快捷方式',
        }

    };
    switch(which){
        case 'date_picker':     return date_picker ;     break;
        case 'Delay':           return Delay ;           break;
        case 'deviceRoomWidget':return deviceRoomWidget ;break;
        case 'LearnMore':       return LearnMore ;       break;
        case 'bulb':            return bulb ;            break;
        case 'AC':              return AC ;              break;
        case 'MultiSensor':     return MultiSensor ;     break;
        case 'MultiSensor2':    return MultiSensor2 ;    break;
        case 'D_W_Sensor':      return D_W_Sensor ;      break;
        case 'Air_Quality':     return Air_Quality ;     break;
        case 'IQAutomations':   return IQAutomations ;   break;
        case 'TVOC':            return TVOC ;            break;
        case 'editTemplate':    return editTemplate ;    break;
        case 'IQTriggersTime':  return IQTriggersTime ;  break;
        case 'IQConditionsTime':return IQConditionsTime ;break;
        case 'IQ_Scene_IR':     return IQ_Scene_IR ;     break;
        case 'monitor_page':    return monitor_page ;    break;
        case 'PhilipsHue':      return PhilipsHue ;      break;
        case 'irWidget':        return irWidget;         break;
        case 'tutorial':        return tutorial;         break;
    }
}