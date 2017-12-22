/**
 * Created by qkchung on 16/5/20.
 */
function setAllTextLanguage(which){
    /*以下變數名根據index.html的父資料夾名命名*/
    var irWidget = {
        SelectTitle:'請選擇一個按鈕進行設定',
        assignedTitle:'此按鈕已經被設定過…',
        test:'測試',
        reassign:'重新設定',
        cancel:'取消',
        teachTitle:'Oomi Cube學習遙控器指令',
        teachTur:'將遙控器置於距Cube的上方然後點擊您想要Oomi學習的遙控鍵',
        successTitle:'成功！',
        failTitle:'失敗！',
        done:'完成',
        back:'返回',
        tryAgain:'重試',
        test2:'測試此按鈕',
        ScanningText:'掃描中',
        reOff:'您已完成關機模式的設定,是否重新設定？',
        reprogram:'重新設定',
        reSet:'該模式已設定完畢,是否重新設定？',
        turnAcOn:'第一步,開啟空調。',
        next:'下一步',
        teachPlugOff:'設定插座關機。將遙控器指向紅外轉發器,然後關閉空調。',
        setAcConfig:'將空調設定成您想要的配寘狀態（風速、溫度、模式）,然後關閉空調。',
        teachPlugSetting:'設定插座。將遙控器指向紅外轉發器,打開空調。',
        successOff:'測試時,請使用遙控器打開空調,選擇"測試"按鍵。操作過程中請確保插座的紅外中繼器正對著空調。',
        successSetting:'測試時請確保插座紅外中繼器正對著空調。',
        fail:'此操作失敗,請重試',
        turnOff:'關閉'
    };
    var date_picker = {
        HOUR_TOPIC:'時',
        MINUTE_TOPIC:'分',
        AM_PM_TOPIC:'上午/下午',
        MONTH_TOPIC:'月',
        DAY_TOPIC:'日',
        YEAR_TOPIC:'年',
        AM:'上午',
        PM:'下午',
        DONE:'確定',
        EDIT_WIDGET_NAME:'挿件名'
    };
    var Delay = {
        EDIT_WIDGET_NAME:'挿件名:',
        SEC_TOPIC:'秒',
        MINUTE_TOPIC:'分'
    };
    var deviceRoomWidget = {
        EDIT_WIDGET_NAME:'挿件名:',
        MULTI_CUBE_BRIGHTNESS: '亮度:',
        MULTI_CUBE_BRIGHTNESS_VALUE: '明亮',
        MULTI_CUBE_BRIGHTNESS_VALUE_DARK: '昏暗',
        MULTI_CUBE_MOTION:'紅外感應:',
        MULTI_CUBE_MOTION_VALUE:'有',
        MULTI_CUBE_MOTION_VALUE_NO:'無',
        MULTI_CUBE_TEMPERATURE:'溫度:',
        DW_Motion:'狀態:',
        DW_MotionYES:'開啟',
        DW_MotionNO:'關閉',
        DW_BATTERY:'電量:',
        AQ_NO_DEVICE:'無設備',
        AQ_GREAT:'優',
        AQ_GOOD:'優',
        AQ_OK:'良',
        AQ_Bad:'差',
        AQ_VeryBad:'極差',
        AQ_pm25:'空氣品質',
        AQ_Light_POLLUTE:'輕度污染',
        AQ_MODERATE_POLLUTE:'中度污染',
        AQ_HEAVY_POLLUTE:'重度污染',
        AQ_SEVERE_POLLUTE:'嚴重污染',
        NewMotionTitle:'紅外感應',
        NewMotionTrue:'有',
        NewMotionFalse:'無',
        OnOffOn: '開',
        OnOffOff: '關',
        WS_MotionYES: '檢測到',
        WS_MotionNO: '未檢測到',
        AC_off:'關閉',
        AC_energySave:'節能',
        AC_StrongCool:'强冷',
        AC_cool:'製冷',
        AC_warm:'制熱',
        AC_mode:'模式',
        sirenVolume:'音量',
        sirenSound:'聲音',
        sirenLength:'時長',
        sirenLow:'低',
        sirenMedium:'中',
        sirenHigh:'高',
        sirenSec:'秒',
        sirenMin:'分',
        sirenS1:'救護車',
        sirenS2:'火車',
        sirenS3:'汽笛',
        sirenS4:'報警',
        sirenS5:'貨車',
        sirenS6:'報時',
        test:'測試',
        stop:'停止'
        // sirenS7:'設防',
        // sirenS8:'安防觸發'
    };
    var LearnMore = {
        EDIT_WIDGET_NAME:'挿件名:',
        LEARN1: '設備介面+添加挿件',
        LEARN2:'添加新Oomi設備',
        LEARN3:'成為挿件專家',
        LEARN4:'隱藏Oomi Touch控制'
    };
    var Air_Quality = {
        EDIT_WIDGET_NAME:'挿件名:',
        AQ_GREAT:'優',
        AQ_GOOD:'良',
        AQ_Light_POLLUTE:'輕度污染',
        AQ_MODERATE_POLLUTE:'中度污染',
        AQ_HEAVY_POLLUTE:'重度污染',
        AQ_SEVERE_POLLUTE:'嚴重污染',
        AQ_NO_DEVICE:'無設備'
    };
    var bulb = {
        EDIT_WIDGET_NAME:'挿件名:',
        popSolid:'單色模式',
        popRainbow:'彩虹模式',
        popPattern:'定制色卡',
        popRandom:'隨機模式',
        chooseTitle:'標準色',
        chooseRGBTitle: '選擇燈光顏色',
        saveTitle:'個人收藏',
        speed:'變色頻率',
        slowest:'最慢',
        slow:'稍慢',
        normal:'常速',
        fast:'稍快',
        fastest:'最快',
        continuous:'漸變',
        smooth:'連貫',
        instant:'直接切換',
        transition:'過渡管道:',
        RandomTur:'已啟動燈光隨機模式',
        changeNow:'更換顏色',
        patternTitle:'定制自己的色卡',
        patternTur:'選擇以下一種顏色,並點擊原有色卡中的一種顏色即可將其替換。若選擇以下一種顏色,並點擊加號即可直接將其添加進色卡中',
        changeNameTitle:'更改名稱',
        changeDeviceTitle:'更換設備',
        deleteGroupTitle:'删除組',
        selectedNameTitle: '個選中設備',
        saveText: '保存'
    };
    var PhilipsHue = {
        EDIT_WIDGET_NAME:'挿件名:',
        popSolid:'單色模式',
        popRainbow:'彩虹模式',
        popPattern:'定制色卡',
        popRandom:'隨機模式',
        chooseTitle:'標準色',
        chooseRGBTitle: '選擇燈光顏色',
        saveTitle:'個人收藏',
        speed:'變色頻率',
        slowest:'最慢',
        slow:'稍慢',
        normal:'常速',
        fast:'稍快',
        fastest:'最快',
        continuous:'漸變',
        smooth:'連貫',
        instant:'直接切換',
        transition:'過渡管道',
        RandomTur:'已啟動燈光隨機模式',
        changeNow:'更換顏色',
        patternTitle:'定制自己的色卡',
        patternTur:'選擇以下一種顏色,並點擊原有色卡中的一種顏色即可將其替換。若選擇以下一種顏色,並點擊加號即可直接將其添加進色卡中',
        changeNameTitle:'更改名稱',
        changeDeviceTitle:'更換設備',
        deleteGroupTitle:'删除組',
        saveText: '保存'
    };
    var D_W_Sensor = {
        EDIT_WIDGET_NAME:'挿件名:',
        DW_MotionYES:'開啟',
        DW_MotionNO:'關閉'
    };
    var MultiSensor = {
        EDIT_WIDGET_NAME:'挿件名:',
        MULTI_CUBE_BRIGHTNESS: '亮度',
        MULTI_CUBE_BRIGHTNESS_VALUE: '明亮',
        MULTI_CUBE_BRIGHTNESS_VALUE_DARK: '昏暗',
        MULTI_CUBE_MOTION:'紅外感應',
        MULTI_CUBE_MOTION_VALUE:'有',
        MULTI_CUBE_MOTION_VALUE_NO:'無',
        MULTI_CUBE_TEMPERATURE:'溫度'
    };
    var MultiSensor2 = {
        EDIT_WIDGET_NAME:'挿件名:',
        MULTI_CUBE_BRIGHTNESS: '亮度',
        MULTI_CUBE_BRIGHTNESS_VALUE: '明亮',
        MULTI_CUBE_BRIGHTNESS_VALUE_DARK: '昏暗',
        MULTI_CUBE_MOTION:'紅外感應',
        MULTI_CUBE_MOTION_VALUE:'有',
        MULTI_CUBE_MOTION_VALUE_NO:'無',
        MULTI_CUBE_TEMPERATURE:'溫度',
        MULTI_CUBE_HUMIDITY:'濕度',
        MULTI_CUBE_HUMIDITY_VALUE:'有',
        MULTI_CUBE_HUMIDITY_VALUE_NO:'無'
    };

    var IQAutomations = {
        EDIT_WIDGET_NAME:'挿件名:',
        IQ_D_W_OPEN:'開啟',
        IQ_D_W_CLOSE:'關閉',
        IQ_D_W_CLOSED:'Closed',
        IQ_STATE_ON:'開',
        IQ_STATE_OFF:'關',
        IQ_MOTION_YES:'有',
        IQ_MOTION_NO:'無',
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
        IQ_LEAK:'檢測到',
        IQ_NOLEAK:'未檢測到',
        IQ_DARK:'昏暗',
        IQ_BRIGHT:'明亮',
        IQ_ALERT_TITLE: '提示管道',
        IQ_ALERT_POP: '彈窗',
        IQ_ALERT_Notification: '通知清單',
        IQ_ALERT_TIPS_Popup: '當觸發警報時,Oomi Touch將彈出警示資訊,同時已連接到Oomi系統的手機也將收到系統通知。',
        IQ_ALERT_TIPS_Notification: '當觸發警報時,Oomi Touch和手機應用程序將同時收到OOMI警報資訊,並在通知視窗中顯示。'
    };
    var TVOC = {
        EDIT_WIDGET_NAME:'挿件名:',
        TVOC_GREAT:'優',
        TVOC_GOOD:'良',
        TVOC_Light_POLLUTE:'輕度污染',
        TVOC_MODERATE_POLLUTE:'重度污染',
        AQ_NO_DEVICE:'無設備'
    };
    var editTemplate = {
        GREET:'你好',
        PROCESSING1:'命名你的挿件',
        PROCESSING2:'點擊一個按鈕',
        DONE:'確定',
        ASSIGNTitle:'此按鈕已經被學習過了…',
        ASSIGNTest:'測試',
        ASSIGNReassign:'重新學習',
        ASSIGNCanel:'取消',
        TEACHTitle:'設定Oomi',
        TEACHTutorial:'將遙控器置於Cube上方,點擊您想要Oomi學習的功能鍵',
        TEACHScan:'掃描中…',
        RESULTTitleSuccess:'成功！',
        RESULTTitleFail:'失敗！',
        RESULTTest:'測試此按鈕',
        RESULTRetry:'重試',
        RESULTDone:'完成',
        RESETPIN:'重設密碼'
    };
    var IQTriggersTime = {
        DONE:'確定',
        Sun:'周日',
        Mon:'週一',
        Tue:'週二',
        Wed:'週三',
        Thu:'週四',
        Fri:'週五',
        Sat:'週六',
        am:'上午',
        pm:'下午',
        SunTransform:'matrix（1 0 0 1 15 42）',
        MonTransform:'matrix（1 0 0 1 84.5 42）',
        TueTransform:'matrix（1 0 0 1 155 42）',
        WedTransform:'matrix（1 0 0 1 225 42）',
        ThuTransform:'matrix（1 0 0 1 15 112）',
        FriTransform:'matrix（1 0 0 1 85 112）',
        SatTransform:'matrix（1 0 0 1 155 112）',
        font_size:'20',
        hourTopic:'時',
        minTopic:'分',
        AM_PM_TOPIC:'上午/下午'
    };
    var IQConditionsTime = {
        DONE:'確定',
        Sun:'周日',
        Mon:'週一',
        Tue:'週二',
        Wed:'週三',
        Thu:'週四',
        Fri:'週五',
        Sat:'週六',
        am:'上午',
        pm:'下午',
        SunTransform:'matrix（1 0 0 1 15 42）',
        MonTransform:'matrix（1 0 0 1 84.5 42）',
        TueTransform:'matrix（1 0 0 1 155 42）',
        WedTransform:'matrix（1 0 0 1 225 42）',
        ThuTransform:'matrix（1 0 0 1 15 112）',
        FriTransform:'matrix（1 0 0 1 85 112）',
        SatTransform:'matrix（1 0 0 1 155 112）',
        font_size:'20',
        hourStartTopic:'時',
        minStartTopic:'分',
        hourEndTopic:'時',
        minEndTopic:'分',
        AM_PM_TOPIC:'上午/下午'
    };
    var IQ_Scene_IR = {
        SET:'設定',
        TEST:'測試'
    };
    var monitor_page = {
        TemperatureTopic:'溫度',
        HumidityTopic:'濕度',
        powerCurrent:'當前',
        powerPastDay:'過去',
        motionStatusON:'感應',
        motionStatusOFF:'沒感應',
        powerUnit:'千瓦時',
        pm:'下午',
        am:'上午'
    };
    var AC = {
        AC_off:'關閉',
        AC_energySave:'節能',
        AC_StrongCool:'强冷',
        AC_cool:'製冷',
        AC_warm:'制熱',
        AC_mode:'模式'
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
    }
}