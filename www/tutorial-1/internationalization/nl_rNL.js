/**
 * Created by qkchung on 2017/10/17.
 * Dutch
 */

function setAllTextLanguage(which){
    /*以下变量名根据index.html的父文件夹名命名*/

    var irWidget = {
        SelectTitle:'Select a button to program',
        assignedTitle:'This button is already assigned...',
        test:'Test',
        reassign:'Reassign',
        cancel:'Cancel',
        teachTitle:'Teach Oomi Cube',
        teachTur:'Aim your remote at the top of Oomi Cube and press the button you want to teach',
        successTitle:'Success!',
        failTitle:'Fail!',
        done:'Done',
        back:'Back',
        tryAgain:'Try Again',
        test2:'Test Button',
        ScanningText:'scanning',
        reOff:'You’ve alreay programmed OFF. Would you like to reprogram it?',
        reprogram:'Reprogram',
        reSet:'This mode is already set. Would you like to reprogram it?',
        turnAcOn:'First, turn on your AC.',
        next:'Next',
        teachPlugOff:'Teach your plug OFF.  Point your remote at the IR repeater, then turn your AC OFF.',
        setAcConfig:'Set your AC to the configuration you want to save (wind speed, temperature, mode) Then turn your AC off.',
        teachPlugSetting:'Teach your Plug this setting. Point your remote at the IR repeater, then turn your AC ON.',
        successOff:'To test, use your remote to turn on your AC, then click Test.Make sure Plug’s IR repeater is facing your AC.',
        successSetting:"When testing, make sure Plug's IR repeater is facing your AC.",
        fail:'That didn’t work. Please try again.',
        turnOff:'turn Off'
    };

    var date_picker = {
        HOUR_TOPIC : 'hour',
        MINUTE_TOPIC : 'min',
        AM_PM_TOPIC : 'Am/Pm',
        MONTH_TOPIC : 'month',
        DAY_TOPIC : 'day',
        YEAR_TOPIC : 'year',
        AM:'am',
        PM:'pm',
        DONE:'done',
        EDIT_WIDGET_NAME:'Name:'
    };
    var Delay = {
        EDIT_WIDGET_NAME:'Name:',
        SEC_TOPIC : ' sec',
        MINUTE_TOPIC : 'min'
    };
    var deviceRoomWidget = {
        EDIT_WIDGET_NAME:'Name:',
        MULTI_CUBE_BRIGHTNESS: 'Brightness:',
        MULTI_CUBE_BRIGHTNESS_VALUE: 'Bright',
        MULTI_CUBE_BRIGHTNESS_VALUE_DARK: 'Dark',
        MULTI_CUBE_MOTION:'Motion:',
        MULTI_CUBE_MOTION_VALUE:'Yes',
        MULTI_CUBE_MOTION_VALUE_NO:'NO',
        MULTI_CUBE_TEMPERATURE:'Temperature:',
        DW_Motion:'Status:',
        DW_MotionYES:'Open',
        DW_MotionNO:'Close',
        DW_BATTERY:'Battery:',
        AQ_NO_DEVICE:'No device',
        AQ_GREAT:'Great',
        AQ_GOOD:'Good',
        AQ_OK:'OK',
        AQ_Bad:'Bad',
        AQ_VeryBad:'Very Bad',
        AQ_Light_POLLUTE:'Light pollution',
        AQ_MODERATE_POLLUTE:'Moderate pollution',
        AQ_HEAVY_POLLUTE:'heavy pollution',
        AQ_SEVERE_POLLUTE:'Severe pollution',
        NewMotionTitle:'Motion',
        NewMotionTrue:'Yes',
        NewMotionFalse:'No',
        OnOffOn: 'On',
        OnOffOff: 'Off',
        WS_MotionYES: 'Detected',
        WS_MotionNO: 'Not Detected',
        AC_off:'Off',
        AC_energySave:'Energy Saver',
        AC_StrongCool:'Strong cool',
        AC_cool:'Cool',
        AC_warm:'Warm',
        AC_mode:'Mode',
        sirenVolume:'Volume',
        sirenSound:'Sound',
        sirenLength:'Length',
        sirenLow:'Low',
        sirenMedium:'Medium',
        sirenHigh:'High',
        sirenSec:'sec',
        sirenMin:'min',
        sirenS1:'Ambulance',
        sirenS2:'Train',
        sirenS3:'Buzzer',
        sirenS4:'Alarm',
        sirenS5:'Truck',
        sirenS6:'Chime',
        test:'Test',
        stop:'Stop'
        // sirenS7:'Arming Security',
        // sirenS8:'Security Triggered'

    };
    var LearnMore = {
        EDIT_WIDGET_NAME:'Name:',
        LEARN1: 'Device Pages + Adding Widgets',
        LEARN2:'Adding New Oomi Devices',
        LEARN3:'Become a Widget Pro',
        LEARN4:'Hidden Oomi Touch Controls'
    };
    var Air_Quality = {
        EDIT_WIDGET_NAME:'Name:',
        AQ_NO_DEVICE:'No device',
        AQ_GREAT:'GREAT',
        AQ_GOOD:'GOOD',
        AQ_Light_POLLUTE:'Light pollution',
        AQ_MODERATE_POLLUTE:'Moderate pollution',
        AQ_HEAVY_POLLUTE:'heavy pollution',
        AQ_SEVERE_POLLUTE:'Severe pollution'
    };
    var bulb = {
        EDIT_WIDGET_NAME:'Name:',
        popSolid:'Solid',
        popRainbow:'Rainbow',
        popPattern:'Pattern',
        popRandom:'Random',
        chooseTitle:'Presets',
        chooseRGBTitle: 'Choose RGB Colors',
        saveTitle:'My Saved Colors',
        speed:'Speed',
        slowest:'Slowest',
        slow:'Slow',
        normal:'Normal',
        fast:'Fast',
        fastest:'Fastest',
        continuous:'Continuous',
        smooth:'Smooth',
        instant:'Instant',
        transition:'Transition:',
        RandomTur:'Your light will turn on to a random color.',
        changeNow:'Change Now',
        patternTitle:'Make Your Pattern',
        patternTur:'Pick a color,then click a pattern spot to add it.Click the + to add pattern spots.',
        changeNameTitle:'Change Name',
        changeDeviceTitle:'Change Devices',
        deleteGroupTitle:'Delete Group',
        selectedNameTitle: 'Selected',
        saveText: 'Save'
    };
    var PhilipsHue = {
        EDIT_WIDGET_NAME:'Name:',
        popSolid:'Solid',
        popRainbow:'Rainbow',
        popPattern:'Pattern',
        popRandom:'Random',
        chooseTitle:'Presets',
        chooseRGBTitle: 'Choose RGB Colors',
        saveTitle:'My Saved Colors',
        speed:'Speed',
        slowest:'Slowest',
        slow:'Slow',
        normal:'Normal',
        fast:'Fast',
        fastest:'Fastest',
        continuous:'Continuous',
        smooth:'Smooth',
        instant:'Instant',
        transition:'Transition',
        RandomTur:'Your light will turn on to a random color.',
        changeNow:'Change Now',
        patternTitle:'Make Your Pattern',
        patternTur:'Pick a color,then click a pattern spot to add it.Click the + to add pattern spots.',
        saveText: 'Save'
    };
    var D_W_Sensor = {
        EDIT_WIDGET_NAME:'Name:',
        DW_MotionYES:'Open',
        DW_MotionNO:'Close'
    };
    var MultiSensor = {
        EDIT_WIDGET_NAME:'Name:',
        MULTI_CUBE_BRIGHTNESS: 'Brightness',
        MULTI_CUBE_BRIGHTNESS_VALUE: 'Bright',
        MULTI_CUBE_BRIGHTNESS_VALUE_DARK: 'Dark',
        MULTI_CUBE_MOTION:'Motion',
        MULTI_CUBE_MOTION_VALUE:'Yes',
        MULTI_CUBE_MOTION_VALUE_NO:'No',
        MULTI_CUBE_TEMPERATURE:'Temperature'

    };
    var MultiSensor2 = {
        EDIT_WIDGET_NAME:'Name:',
        MULTI_CUBE_BRIGHTNESS: 'Brightness',
        MULTI_CUBE_BRIGHTNESS_VALUE: 'Bright',
        MULTI_CUBE_BRIGHTNESS_VALUE_DARK: 'Dark',
        MULTI_CUBE_MOTION:'Motion',
        MULTI_CUBE_MOTION_VALUE:'Yes',
        MULTI_CUBE_MOTION_VALUE_NO:'No',
        MULTI_CUBE_TEMPERATURE:'Temperature',
        MULTI_CUBE_HUMIDITY:'Humidity',
        MULTI_CUBE_HUMIDITY_VALUE:'wet',
        MULTI_CUBE_HUMIDITY_VALUE_NO:'dry'
    };
    var IQAutomations = {
        EDIT_WIDGET_NAME:'Name:',
        IQ_D_W_OPEN:'Open',
        IQ_D_W_CLOSE:'Close',
        IQ_D_W_CLOSED:'Closed',
        IQ_STATE_ON:'ON',
        IQ_STATE_OFF:'OFF',
        IQ_MOTION_YES:'Yes',
        IQ_MOTION_NO:'No',
        IQ_DARK:'Dark',
        IQ_BRIGHT:'Bright',
        IQ_ALERT_TITLE: 'Alert Type',
        IQ_ALERT_POP: 'Pop-up',
        IQ_ALERT_Notification: 'Notification',
        IQ_ALERT_TIPS_Popup: 'When triggered, Oomi Touch will display a pop-up message, and connected phones will receive a phone notification.',
        IQ_ALERT_TIPS_Notification: "When triggered, a message will be added to Oomi's notification window, both on Touch and in phone apps.",
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
        IQ_OUTSIDE:'outside',
        IQ_AFTER:'After',
        IQ_LEAKD:'Leak Detected',
        IQ_LEAK:'Detected',
        IQ_NOLEAK:'Not Detected'
    };
    var TVOC = {
        EDIT_WIDGET_NAME:'Name:',
        TVOC_GREAT:'Great',
        TVOC_GOOD:'Good',
        TVOC_Light_POLLUTE:'Light pollution',
        TVOC_MODERATE_POLLUTE:'Moderate pollution',
        AQ_NO_DEVICE:'No device'
    };
    var editTemplate = {
        GREET:'hello',
        PROCESSING1:'Name your widget',
        PROCESSING2:'Pick a button',
        DONE:'Done',
        ASSIGNTitle:'This button is already assigned...',
        ASSIGNTest:'Test',
        ASSIGNReassign:'Reassign',
        ASSIGNCanel:'Cancel',
        TEACHTitle:'Teach Oomi Cube',
        TEACHTutorial:'Aim your remote at the top of Oomi Cube and press the button you want to teach',
        TEACHScan:'Scanning...',
        RESULTTitleSuccess:'Success!',
        RESULTTitleFail:'Fail!',
        RESULTTest:'Test Button',
        RESULTRetry:'Retry',
        RESULTDone:'Done',
        RESETPIN:'reset pin'
    };
    var IQTriggersTime = {
        DONE:'done',
        Sun:'S',
        Mon:'M',
        Tue:'T',
        Wed:'W',
        Thu:'T',
        Fri:'F',
        Sat:'S',
        am:'am',
        pm:'pm',
        SunTransform:'matrix(1 0 0 1 25 48)',
        MonTransform:'matrix(1 0 0 1 89 48)',
        TueTransform:'matrix(1 0 0 1 165 48)',
        WedTransform:'matrix(1 0 0 1 229 48)',
        ThuTransform:'matrix(1 0 0 1 25 118)',
        FriTransform:'matrix(1 0 0 1 96 118)',
        SatTransform:'matrix(1 0 0 1 165 118)',
        font_size:'35',
        hourTopic:'hour',
        minTopic:'min',
        AM_PM_TOPIC:'Am/Pm'
    };
    var IQConditionsTime = {
        DONE:'done',
        Sun:'S',
        Mon:'M',
        Tue:'T',
        Wed:'W',
        Thu:'T',
        Fri:'F',
        Sat:'S',
        am:'am',
        pm:'pm',
        SunTransform:'matrix(1 0 0 1 25 48)',
        MonTransform:'matrix(1 0 0 1 89 48)',
        TueTransform:'matrix(1 0 0 1 165 48)',
        WedTransform:'matrix(1 0 0 1 229 48)',
        ThuTransform:'matrix(1 0 0 1 25 118)',
        FriTransform:'matrix(1 0 0 1 96 118)',
        SatTransform:'matrix(1 0 0 1 165 118)',
        font_size:'35',
        hourStartTopic:'hour',
        minStartTopic:'min',
        hourEndTopic:'hour',
        minEndTopic:'min',
        AM_PM_TOPIC:'Am/Pm'
    };
    var IQ_Scene_IR = {
        SET:'set',
        TEST:'test'
    };
    var monitor_page = {
        TemperatureTopic:'Temperature',
        HumidityTopic:'Humidity',
        powerCurrent:'Current',
        powerPastDay:'Past Day',
        motionStatusON:'Motion',
        motionStatusOFF:'No Motion',
        powerUnit:'KWH'
    };
    var AC = {
        AC_off:'Off',
        AC_energySave:'Energy Saver',
        AC_StrongCool:'Strong Cool',
        AC_cool:'Cool',
        AC_warm:'Warm',
        AC_mode:'Mode'
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