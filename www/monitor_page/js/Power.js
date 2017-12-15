
    window.onload = function () {
        ;(function(){
            var params = Oomi_command_function.create_new().resource_data();
            languageSwitcher(params['language']);
            var textsOBJ = null;
            function languageSwitcher(lang){
                var scriptOBJ = selectLanguage2(lang);
                $.getScript(scriptOBJ.url, function () {
                    textsOBJ = setAllTextLanguage(scriptOBJ.which);
                    $('#powerCurrent').text(textsOBJ.powerCurrent);
                    $('#powerPastDay').text(textsOBJ.powerPastDay);
                    $('.Unit').text(textsOBJ.powerUnit);
                });
            }
            var GdataContent1 = 0;
            var currentTime = 0;
            var is24 = false;
            cordova.exec(function (data) {
                is24 = JSON.parse(data)['is24'];
            }, null, "FTP2PApi", "getSystemTime", ['']);
        var options2 = {
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
                offset: 30,
                position: 'start',
                labelOffset: {
                    x: 0,
                    y: 6
                },
                showLabel: true,
                showGrid: true,
                labelInterpolationFnc: Chartist.noop,
                type: undefined,
//                scaleMinSpace: 5,
//                divisor:1,
                ticks: [1, 20, 40, 60,80,100],
                onlyInteger: true,
                low:0
                //high: 100
            },
            width: '100%',
            height: '95%',
            showLine: true,
            showPoint: true,
            showArea: true,
            areaBase: 0,
            lineSmooth: true,
            showGridBackground: false,
            chartPadding: {
                top: 10,
                right: 10,
                bottom: 0,
                left: 10
            },
            fullWidth: false,
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

        var d1 = [' '];
        var timeAxisX = [' '];
        var data1 = {
            labels: timeAxisX,
            series: [
                {name:'series-a', data:d1}
            ]
        };

        var a = new Chartist.Line('.ct-chart', data1, options2);
        var loadChart = setTimeout(function(){
            if(a){
                var vertical = document.getElementsByClassName('ct-vertical');
                var ctPointA1 = document.getElementsByClassName("ct-series-a");
                var ctPointA2 = ctPointA1[0].getElementsByClassName('ct-point');
                //ctPointA2[ctPointA2.length-1].style.stroke = '#8FC31F';
                if(ctPointA2.length>0){
                    ctPointA2[ctPointA2.length-1].style.stroke = '#8FC31F';
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
            var getPastPower = data['pastPower'];
            for(var i = 0; i < dataLength; i++){
                re[i] = Number(tempD[i]['value']);
            }
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
                        tempTime[l] = 24- (tempTime[l-1]+1)
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
                if (horizontal.length <= 0){
                    return 1;
                }
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
                var ctPointA1 = document.getElementsByClassName("ct-series-a");
                var ctPointA2 = ctPointA1[0].getElementsByClassName('ct-point');
                if(ctPointA2[ctPointA2.length-1]){
                    ctPointA2[ctPointA2.length-1].style.stroke = '#8FC31F';
                }
                window.clearInterval(loadChart2);
            },10);
        }

        function getCurrentPower(data) {
            var totalAmount = 0;
            var dataLength = data['statisticsList'].length;
            var tempD = data['statisticsList'];
            for(var i = 0; i < dataLength; i++){
                totalAmount += Number(tempD[i]['value']);
            }
            return totalAmount;
        }

        function renderDatas(dataContent) {
            var pos1 = findRoom(dataContent,params['positionId']);
            var pastDay = dataContent[pos1]['pastPower'];
            var t1 = new Date(dataContent[pos1]['statisticsList'][dataContent[pos1]['statisticsList'].length -1]['currentPointTime']);
            currentTime = t1.getHours();
            var totalAmount = getCurrentPower(dataContent[pos1]);
            if(totalAmount === 0 || totalAmount){
                $('#currentValue').text(Number(totalAmount).toFixed(2));
            }
            if(pastDay){
                $('#pastDayValue').text(Number(pastDay).toFixed(2));
            }
            d1 = makeData(dataContent[pos1]);
            setTimeout(function () {
                timeAxisX = makeTime();
            },10);
            setTimeout(function () {
                if (!is24){
                    for(var j = 0 ; j < timeAxisX.length ; j++){
                        if(typeof timeAxisX[j] === 'number'){
                            if(timeAxisX[j] === 0){
                                timeAxisX[j] = '12pm';
                            }else if(timeAxisX[j] === 12){
                                timeAxisX[j] = timeAxisX[j]+textsOBJ.am;
                            }else{
                                timeAxisX[j] = timeAxisX[j]>12?(timeAxisX[j]-12)+textsOBJ.pm:timeAxisX[j]+textsOBJ.am
                            }
                        }
                    }
                }
                var data2 = {
                    labels: timeAxisX,
                    series: [
                        {name:'series-a', data:d1}
                    ]
                };
                a.update(data2);
                reDrawGrid();
            },10);
        }
        var canC = true;
        $('#re').click(function () {
            if (canC){
                canC = false;
                renderDatas(GdataContent1);
                setTimeout(function () {
                    canC = true;
                },1100);
            }
        });
        window.onfocus = function () {
            renderDatas(GdataContent1);
        };
        document.addEventListener('deviceready', function () {
            getDate();
            function getDate(){
                cordova.exec(function (data) {}, null, "FTP2PApi","getMonitorInfo",['energy']);
            }
            window.addEventListener('ftdevicestatusupdate', function (data) {
                if (data.title === "monitorPower") {
                    GdataContent1 = JSON.parse(data.content);
                    renderDatas(GdataContent1);
                }
                if(data.title === 'currentPower'){
                    var dataContent3 = JSON.parse(data.content);
                    if(dataContent3['roomId'] === params['positionId']){
                        $('#currentValue').text(dataContent3['content']+'');
                    }
                }
                if(data.title === "Language"){
                    languageSwitcher(data.content);
                }
                if(data.title === "Time24Hour"){
                    console.log(JSON.stringify(data));
                    if(data.content === "true"){
                        is24 = true;
                    }else{
                        is24 = false;
                    }
                    setTimeout(function () {
                        renderDatas(GdataContent1);
                    },10);
                }
            }, false);
        }, false);
        })();
    };
