window.onload = function () {
    ;(function(){
        var params = Oomi_command_function.create_new().resource_data();
        languageSwitcher(params['language']);
        var textsOBJ = null;
            function languageSwitcher(lang){
            var scriptOBJ = selectLanguage2(lang);
            $.getScript(scriptOBJ.url, function () {
                textsOBJ = setAllTextLanguage(scriptOBJ.which);
                $('#TemperatureTopic').text(textsOBJ.TemperatureTopic);
                $('#HumidityTopic').text(textsOBJ.HumidityTopic);
            });
        }
        var is24 = false;
        cordova.exec(function (data) {
            is24 = JSON.parse(data)['is24'];
        }, null, "FTP2PApi", "getSystemTime", ['']);
        var isC = true;
        var GdataContent1 = 0;
        var GdataContent2 = 0;
        var currentTime = 0;
        var options1 = {
            // Options for X-Axis
            axisX: {
                offset: 30,
                position: 'end',
                labelOffset: {
                    x: 12,
                    y: 0
                },
                showLabel: true,
                showGrid: true,
                labelInterpolationFnc: Chartist.noop,
                type: undefined
            },
            axisY: {
                offset: 40,
                position: 'start',
                labelOffset: {
                    x: 0,
                    y: 6
                },
                showLabel: true,
                showGrid: true,
                labelInterpolationFnc: Chartist.noop,
                type: undefined,

                ticks: [1, 20, 40, 60,80,100],
                onlyInteger: true
                //low:1,
                //high: 100
            },
            width: '95%',
            height: '95%',
            showLine: true,
            showPoint: true,
            showArea: false,
            areaBase: 0,
            lineSmooth: true,
            showGridBackground: false,
            chartPadding: {
                top: 10,
                right: 10,
                bottom: 0,
                left: 0
            },
            fullWidth: true,
            reverseData: false,
            classNames: {
                chart: 'ct-chart-line',
                label: 'ct-label',
                labelGroup: 'ct-labels',
                series: 'ct-series',
                line: 'ct-line',
                point: 'ct-point',
                area: 'ct-area',
                grid: 'ct-grid',
                gridGroup: 'ct-grids',
                gridBackground: 'ct-grid-background',
                vertical: 'ct-vertical',
                horizontal: 'ct-horizontal',
                start: 'ct-start',
                end: 'ct-end'
            }
        };
        var d1 = [];
        var d2 = [];
        var timeAxisX = [];
        var data1 = {
            labels: timeAxisX,
            series: [
                {name:'series-a', data:d1},
                {name:'series-b', data:d2}
            ]
        };

        var a = new Chartist.Line('.ct-chart', data1, options1);
        var loadChart = setTimeout(function(){
            if(a){
                var vertical = document.getElementsByClassName('ct-vertical');
                var ctPointA1 = document.getElementsByClassName("ct-series-a");
                var ctPointA2 = ctPointA1[0].getElementsByClassName('ct-point');
                if(ctPointA2.length>0){
                    ctPointA2[ctPointA2.length-1].style.stroke = '#E83828';
                }
                var ctPointB1 = document.getElementsByClassName("ct-series-b");
                var ctPointB2 = ctPointB1[0].getElementsByClassName('ct-point');
                if(ctPointA2.length>0){
                    ctPointB2[ctPointB2.length-1].style.stroke = '#59AFD2';
                }
                vertical[0].style.stroke = '#C8C9C9';
                window.clearTimeout(loadChart);
            }
        },10);

        function makeTime(){
            var XAxisDATA = ['',''];
            XAxisDATA[2] = currentTime-2;

            if(XAxisDATA[2] < 0){
                XAxisDATA[2] = XAxisDATA[2] + 24;
            }else{
                XAxisDATA[2] = XAxisDATA[2];
            }
            for(var l = 3; l <= 23 ; l++){
                if((l-2)%4 === 0){
                    var timer = XAxisDATA[l-4]-4;
                    if(timer < 0){
                        XAxisDATA[l] = timer + 24;
                    }else{
                        XAxisDATA[l] = timer;
                    }
                }else{
                    XAxisDATA[l] = '';
                }
            }
            XAxisDATA = XAxisDATA.reverse();
            return XAxisDATA;
        }
        function makeData(data){
            var re = [];
            var dataLength = data['statisticsList'].length;
            var tempD = data['statisticsList'];
            if(!isC){
                for(var i = 0; i < dataLength; i++){
                    re[i] = (Number(tempD[i]['value'])*9 / 5 + 32).toFixed(1);
                }
                if(re.length == 1){
                    re.unshift(re[0]);
                }
                $('#tempValue').text(re[re.length-1]+'°F');
            }else{
                for(var j = 0; j < dataLength; j++){
                    re[j] = Number(tempD[j]['value']).toFixed(1);
                }
                if(re.length == 1){
                    re.unshift(re[0]);
                }
                $('#tempValue').text(re[re.length-1]+'°C');
            }
            for(var k = 0 ; k < re.length ; k++){
                if(re.length>=24){
                    break;
                }else{
                    re.unshift(0);
                }
            }

            if(23-getCurrentTimePosi()-1>=0){
                re.splice(0,23-getCurrentTimePosi()-1);
            }

            function getCurrentTimePosi(){

                var timeEnd = Number(tempD[tempD.length- 1]['currentPointTime']);
                var t2 = new Date(timeEnd);
                var endTime = t2.getHours();
                var tempTime = makeTime();
                tempTime[0] = tempTime[1]-1 < 0?24- (tempTime[1]-1) :tempTime[1]-1;
                for(var l = 2; l <tempTime.length;l++){
                    var thisTime = tempTime[l-1] + 1;
                    if(thisTime < 0){
                        tempTime[l] = 24 - (tempTime[l-1]+1)
                    }else if(thisTime > 23){
                        tempTime[l] = thisTime - 24;
                    }else{
                        tempTime[l] = thisTime ;
                    }
                }
                return  tempTime.indexOf(endTime);
            }
            if(re[1]=== 0){
                re[1] = re[2];
            }
            if(re[0]=== 0){
                re[0] = re[1];
            }
            return re;
        }
        function makeData2(data){
            var re = [];
            var dataLength = data['statisticsList'].length;
            var tempD = data['statisticsList'];
            for(var i = 0; i < dataLength; i++){
                re[i] = Number(tempD[i]['value']).toFixed(1);
            }
            if(re.length == 1){
                re.unshift(re[0]);
            }
            $('#humValue').text(re[re.length-1]+'%');
            for(var j = 0 ; j < re.length ; j++){
                if(re.length>=24){
                    break;
                }else{
                    re.unshift(0);
                }
            }
            if(23-getCurrentTimePosi()-1>=0){
                re.splice(0,23-getCurrentTimePosi()-1);
            }

            function getCurrentTimePosi(){

                var timeEnd = Number(tempD[tempD.length- 1]['currentPointTime']);
                var t2 = new Date(timeEnd);
                var endTime = t2.getHours();
                var tempTime = makeTime();
                tempTime[0] = tempTime[1]-1 < 0?24- (tempTime[1]-1) :tempTime[1]-1;
                for(var l = 2; l <tempTime.length;l++){
                    var thisTime = tempTime[l-1] + 1;
                    if(thisTime < 0){
                        tempTime[l] = 24 - (tempTime[l-1]+1)
                    }else if(thisTime > 23){
                        tempTime[l] = thisTime - 24;
                    }else{
                        tempTime[l] = thisTime ;
                    }
                }
                return  tempTime.indexOf(endTime);
            }
            if(re[1]=== 0){
                re[1] = re[2];
            }
            if(re[0]=== 0){
                re[0] = re[1];
            }
            return re;
        }
        function findRoom(content,roomId){
            var length = content.length;
            var pos = 0;
            for(var k = 0 ; k < length ; k++){
                if(content[k]['roomId']+'' === roomId+''){
                    break;
                }else{
                    pos++;
                }
            }
            return pos;
        }
        function reDrawGrid(){
            var loadChart2 = setInterval(function(){
                var horizontal = document.getElementsByClassName('ct-horizontal');
                if (horizontal.length <= 0 && $('body').height() !== 0){
                    return 1;
                }
                var ctPointA1 = document.getElementsByClassName("ct-series-a");
                var ctPointB1 = document.getElementsByClassName("ct-series-b");
                if(horizontal.length!==0){
                    for(var m = 0; m < horizontal.length ; m++){
                        if(horizontal[0].nodeName === 'line'){
                            if(m === 2){
                                horizontal[m].style.stroke = '#C8C9C9';
                            }
                            if(m>=6){
                                if((m-2)%4 === 0){
                                    horizontal[m].style.stroke = '#C8C9C9';
                                }
                            }
                        }
                    }
                }
                horizontal[0].style.stroke = '#C8C9C9';
                var vertical = document.getElementsByClassName('ct-vertical');
                vertical[0].style.stroke = '#C8C9C9';
                var ctPointA2 = ctPointA1[0].getElementsByClassName('ct-point');
                ctPointA2[ctPointA2.length-1].style.stroke = '#E83828';
                var ctPointB2 = ctPointB1[0].getElementsByClassName('ct-point');
                ctPointB2[ctPointB2.length-1].style.stroke = '#59AFD2';

                $('.ct-series-a').click(function () {
                    setToTemperature();

                });
                $('.ct-series-b').click(function () {
                    setToHumidity();
                });
                setToTemperature();
                window.clearInterval(loadChart2);
            },10);

        }

        function setToTemperature(){
            $('.ct-series-a').find('.ct-line').css('opacity',1);
            $('.ct-series-b').find('.ct-line').css('opacity',0.3);
        }
        function setToHumidity(){
            $('.ct-series-a').find('.ct-line').css('opacity',0.3);
            $('.ct-series-b').find('.ct-line').css('opacity',1);
        }
        // test();
        function test(){
            var da = [{"statisticsList":[{"value":"58.586674","currentPointTime":1490887671238,"beforeTime":0},{"value":"59.90001","currentPointTime":1490891271238,"beforeTime":0},{"value":"59.90001","currentPointTime":1490894871238,"beforeTime":0},{"value":"59.90001","currentPointTime":1490898471238,"beforeTime":0},{"value":"60.020008","currentPointTime":1490902071237,"beforeTime":0},{"value":"61.69334","currentPointTime":1490905671247,"beforeTime":0},{"value":"61.70001","currentPointTime":1490909271238,"beforeTime":0},{"value":"61.70001","currentPointTime":1490912871238,"beforeTime":0},{"value":"61.69334","currentPointTime":1490916471238,"beforeTime":0},{"value":"62.266678","currentPointTime":1490920071239,"beforeTime":0},{"value":"63.106663","currentPointTime":1490923671241,"beforeTime":0},{"value":"61.021427","currentPointTime":1490928042233,"beforeTime":0},{"value":"61.63334","currentPointTime":1490931642233,"beforeTime":0},{"value":"59.81333","currentPointTime":1490935242233,"beforeTime":0},{"value":"60.013344","currentPointTime":1490938842233,"beforeTime":0},{"value":"60.046677","currentPointTime":1490942442233,"beforeTime":0},{"value":"57.440002","currentPointTime":1490946042244,"beforeTime":0},{"value":"54.62667","currentPointTime":1490949642233,"beforeTime":0},{"value":"54.24667","currentPointTime":1490953242233,"beforeTime":0},{"value":"51.20667","currentPointTime":1490956842240,"beforeTime":0}],"resTypeProName":"humidity","interval":0,"currentTime":0,"roomId":1,"count":0}]
            var da2 = [{"statisticsList":[{"value":"-48.084618","currentPointTime":1490873271238,"beforeTime":0},{"value":"30.240004","currentPointTime":1490876871238,"beforeTime":0},{"value":"30.013332","currentPointTime":1490880471238,"beforeTime":0},{"value":"29.760004","currentPointTime":1490884071238,"beforeTime":0},{"value":"29.56667","currentPointTime":1490887671238,"beforeTime":0},{"value":"29.39333","currentPointTime":1490891271238,"beforeTime":0},{"value":"29.26","currentPointTime":1490894871238,"beforeTime":0},{"value":"29.253334","currentPointTime":1490898471238,"beforeTime":0},{"value":"29.18667","currentPointTime":1490902071237,"beforeTime":0},{"value":"29.106668","currentPointTime":1490905671247,"beforeTime":0},{"value":"29.113337","currentPointTime":1490909271238,"beforeTime":0},{"value":"29.10667","currentPointTime":1490912871238,"beforeTime":0},{"value":"29.14667","currentPointTime":1490916471238,"beforeTime":0},{"value":"29.146671","currentPointTime":1490920071239,"beforeTime":0},{"value":"28.793335","currentPointTime":1490923671241,"beforeTime":0},{"value":"30.571428","currentPointTime":1490928042233,"beforeTime":0},{"value":"29.733334","currentPointTime":1490931642233,"beforeTime":0},{"value":"29.806667","currentPointTime":1490935242233,"beforeTime":0},{"value":"29.293339","currentPointTime":1490938842233,"beforeTime":0},{"value":"29.199999","currentPointTime":1490942442233,"beforeTime":0},{"value":"29.640003","currentPointTime":1490946042244,"beforeTime":0},{"value":"28.90667","currentPointTime":1490949642233,"beforeTime":0},{"value":"28.46","currentPointTime":1490953242233,"beforeTime":0},{"value":"27.699999","currentPointTime":1490956842240,"beforeTime":0}],"resTypeProName":"temperature","interval":0,"currentTime":0,"roomId":1,"count":0}];
            drawTemperature(da);
            drawHumidity(da2);
        }

        function drawTemperature(dataContent){
            var pos1 = findRoom(dataContent,params['positionId']);
            var t1 = new Date(dataContent[pos1]['statisticsList'][dataContent[pos1]['statisticsList'].length -1]['currentPointTime']);
            currentTime = t1.getHours();
            setTimeout(function () {
                timeAxisX = makeTime();
                d1 = makeData(dataContent[pos1]);
            },10);
        }

        function drawHumidity(dataContent2){
            var pos2 = findRoom(dataContent2,params['positionId']);
            var t1 = new Date(dataContent2[pos2]['statisticsList'][dataContent2[pos2]['statisticsList'].length -1]['currentPointTime']);
            currentTime = t1.getHours();
            setTimeout(function () {
                timeAxisX = makeTime();
                d2 = makeData2(dataContent2[pos2]);
                setTimeout(function () {
                    if (!is24){
                        for(var j = 0 ; j < timeAxisX.length ; j++){
                            if(typeof timeAxisX[j] === 'number'){
                                if(timeAxisX[j] === 0){
                                    timeAxisX[j] = '12pm';
                                }else if(timeAxisX[j] === 12){
                                    timeAxisX[j] = timeAxisX[j]+'am';
                                }else{
                                    timeAxisX[j] = timeAxisX[j]>12?(timeAxisX[j]-12)+textsOBJ.pm:timeAxisX[j]+textsOBJ.am
                                }
                            }
                        }
                    }
                    var data3 = {
                        labels: timeAxisX,
                        series: [
                            {name:'series-a', data:d1},
                            {name:'series-b', data:d2}
                        ]
                    };
                    a.update(data3);
                    setTimeout(function () {
                        reDrawGrid();
                    },10);
                },10);
            },10);
        }
        var canC = true;
        $('#re').click(function () {
            if (canC){
                canC = false;
                drawTemperature(GdataContent1);
                drawHumidity(GdataContent2);
                setTimeout(function () {
                    canC = true;
                },1100);
            }
        });
        window.onfocus = function () {
            drawTemperature(GdataContent1);
            drawHumidity(GdataContent2);
        };
        document.addEventListener('deviceready', function () {
            cordova.exec(function (data) {
                var obj=JSON.parse(data);
                var value=obj.value;
                if(value==="true"){
                    isC = false;
                }else if(value==="false"){
                    isC=true
                }else if(value===true){
                    isC = false;
                }else if(value===false){
                    isC=true
                }
            },null,"FTP2PApi","getUnit",[""]);
            getDate();
            function getDate(){
                cordova.exec(function (data) {}, null, "FTP2PApi","getMonitorInfo",['temperature']);
                setTimeout(function () {
                    cordova.exec(function (data) {}, null, "FTP2PApi","getMonitorInfo",['humidity']);
                },10);
            }
            window.addEventListener('ftdevicestatusupdate', function (data) {
                if (data.title === "monitorTemperature") {
                    GdataContent1 = JSON.parse(data.content);
                    drawTemperature(GdataContent1);
                }
                if (data.title === "monitorHumidity") {
                    GdataContent2 = JSON.parse(data.content);
                    drawHumidity(GdataContent2);
                }
                if(data.title === "Language"){
                    languageSwitcher(data.content);
                }
                if(data.title === "temperature01"){
                    if(data.content=="true"){
                        isC = false;
                    }else{
                        isC = true;
                    }
                    drawTemperature(GdataContent1);
                    drawHumidity(GdataContent2);
                }
                if(data.title === "Time24Hour"){
                    console.log(JSON.stringify(data));
                    if(data.content === "true"){
                        is24 = true;
                    }else{
                        is24 = false;
                    }
                    setTimeout(function () {
                        drawTemperature(GdataContent1);
                        drawHumidity(GdataContent2);
                    },10);
                }
            }, false);
        }, false);

    })();
};
