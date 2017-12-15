/**
 * Created by qkchung on 17/3/28.
 */
;(function(){
    window.onload = function () {
        var params = Oomi_command_function.create_new().resource_data();
        var svg = document.getElementById('HolderSVG');
        var MotionChartHolder = document.getElementById('MotionChartHolder');
        var svgWidth = MotionChartHolder.offsetWidth;
        var svgHeight = MotionChartHolder.offsetHeight;
        var numOfSpec = 7;
        var chartHeight = 0.76;
        var XAxisLabel = [' ','6',' ',' ','12pm',' ',' ','6',' ',' ','12am','2'];
        var textsOBJ = {};
        var motion = true;
        var currentTime = 0;
        var GdataContent1 = 0;
        languageSwitcher(params['language']);
        function languageSwitcher(lang){
            var scriptOBJ = selectLanguage2(lang);
            $.getScript(scriptOBJ.url, function () {
                textsOBJ = setAllTextLanguage(scriptOBJ.which);
                if(motion){
                    setToMotion();
                }else{
                    setNoMotion()
                }

            });
        }
        var is24 = false;
        cordova.exec(function (data) {
            is24 = JSON.parse(data)['is24'];
        }, null, "FTP2PApi", "getSystemTime", ['']);
        var datas = [
        ];

        setSVG();
        function setSVG(){
            svg.setAttribute('width',svgWidth+'');
            svg.setAttribute('height',svgHeight+'');

            svg.setAttribute('viewBox','0 0 '+svgWidth+' '+svgHeight);
            svg.setAttribute('enable-background','0 0 '+svgWidth+' '+svgHeight);
        }

        function drawBackground(){
            var lineGap = svgWidth/numOfSpec;
            var g =  document.createElementNS("http://www.w3.org/2000/svg",'g');
            for(var i = 1 ; i <numOfSpec ; i++){
                var n_line1 =  document.createElementNS("http://www.w3.org/2000/svg",'line');
                n_line1.setAttribute('class','backgroundLine');
                n_line1.setAttribute('stroke','#C8C9C9');
                n_line1.setAttribute('stroke-width','1');
                n_line1.setAttribute('x1',(lineGap*(i)+20) - lineGap/2 +'');
                n_line1.setAttribute('y1',svgHeight*0.1+'');
                n_line1.setAttribute('x2',(lineGap*(i)+20)- lineGap/2+'');
                n_line1.setAttribute('y2',svgHeight*chartHeight+'');
                g.appendChild(n_line1);
            }
            drawFirstLine();
            function drawFirstLine(){
                var n_line1 =  document.createElementNS("http://www.w3.org/2000/svg",'line');
                n_line1.setAttribute('class','backgroundLine');
                n_line1.setAttribute('stroke','#C8C9C9');
                n_line1.setAttribute('stroke-width','1');
                n_line1.setAttribute('x1',20+'');
                n_line1.setAttribute('y1',svgHeight*0.1+'');
                n_line1.setAttribute('x2',20+'');
                n_line1.setAttribute('y2',svgHeight*chartHeight+'');
                g.appendChild(n_line1);
            }
            drawUnderLine();
            function drawUnderLine(){
                var n_line2 =  document.createElementNS("http://www.w3.org/2000/svg",'line');
                n_line2.setAttribute('class','backgroundLine');
                n_line2.setAttribute('stroke','#C8C9C9');
                n_line2.setAttribute('stroke-width','1');
                n_line2.setAttribute('x1',20+'');
                n_line2.setAttribute('y1',svgHeight*chartHeight+5+'');
                n_line2.setAttribute('x2',(svgWidth-lineGap)+20+'');
                n_line2.setAttribute('y2',svgHeight*chartHeight+5+'');
                g.appendChild(n_line2);
            }
            svg.appendChild(g);
        }

        function drawXAxis(){
            drawBackground();
            dots();
            function dots(){
                var lineGap = svgWidth/numOfSpec;
                var XAxisDATA = [];
                for(var l = 0; l < 6 ; l++){
                    var timer = currentTime - (l)*4-2;
                    if(timer < 0){
                        XAxisDATA[l] = timer + 24;
                    }else{
                        XAxisDATA[l] = timer;
                    }
                }
                if (!is24){
                    for(var b = 0 ; b < XAxisDATA.length ; b++){
                        if(typeof XAxisDATA[b] === 'number'){
                            if(XAxisDATA[b] === 0){
                                XAxisDATA[b] = '12pm';
                            }else if(XAxisDATA[b] === 12){
                                XAxisDATA[b] = XAxisDATA[b]+textsOBJ.am;
                            }else{
                                XAxisDATA[b] = XAxisDATA[b]>12?(XAxisDATA[b]-12)+textsOBJ.pm:XAxisDATA[b]+textsOBJ.am
                            }
                        }
                    }
                }
                XAxisDATA = XAxisDATA.reverse();
                var g =  document.createElementNS("http://www.w3.org/2000/svg",'g');
                for(var j = 0 ; j <numOfSpec-1 ; j++){
                    var n_circle =  document.createElementNS("http://www.w3.org/2000/svg",'circle');
                    n_circle.setAttribute('class','backgroundLine');
                    n_circle.setAttribute('fill','#C8C9C9');
                    n_circle.setAttribute('stroke','none');
                    n_circle.setAttribute('cx',lineGap*j+lineGap/2+20+'');
                    n_circle.setAttribute('cy',svgHeight*0.84+'');
                    n_circle.setAttribute('r','2');
                    g.appendChild(n_circle);
                }
                for(var k = 0 ; k <XAxisDATA.length ; k++){
                    var n_text =  document.createElementNS("http://www.w3.org/2000/svg",'text');
                    n_text.setAttribute('class','backgroundLine');
                    n_text.setAttribute('fill','#C8C9C9');
                    n_text.setAttribute('stroke','none');
                    var x = lineGap*k+(lineGap/2) - (((XAxisDATA[k]+'').length*2)*2)+20;
                    n_text.setAttribute('x',x+'');
                    n_text.setAttribute('y',svgHeight*0.95+'');
                    n_text.innerHTML = XAxisDATA[k];
                    g.appendChild(n_text);
                }
                svg.appendChild(g);
                setTimeout(function () {
                    drawFromData();
                },10);
            }
        }

        function drawFromData(){
            var g =  document.createElementNS("http://www.w3.org/2000/svg",'g');
            var lineGap = svgWidth/numOfSpec;
            var chartWidth = svgWidth - lineGap;
            var startTime = 0;
            var endTime = 0;
            var x1 = 0;
            var x2 = 0;
            for(var a = 0; a <datas.length;a++){
                startTime = getStartTime(datas[a]);

                endTime = getEndTime(datas[a]);

                x1 = chartWidth*startTime/1440;
                x2 = chartWidth*endTime/1440;
                if((x2-x1)<0){
                    continue;
                }
                var n_line3 =  document.createElementNS("http://www.w3.org/2000/svg",'rect');
                n_line3.setAttribute('class','chartLine');
                n_line3.setAttribute('fill','#F26F21');
                n_line3.setAttribute('stroke','none');
                n_line3.setAttribute('x',x1+20+'');
                n_line3.setAttribute('y',(svgHeight*chartHeight)/2-2+'');
                n_line3.setAttribute('width',(x2)-(x1)+'');
                n_line3.setAttribute('height','10');
                n_line3.setAttribute('ry','5');
                g.appendChild(n_line3);
            }
            svg.appendChild(g);
            function getStartTime(time){
                var rawTime = time.split('-')[0];
                var hour = Number(rawTime.split(':')[0])-(currentTime);
                if(hour<0){
                    hour+=24;
                }
                var min =  Number(rawTime.split(':')[1]);
                return hour*60+min>1440?1440:hour*60+min;
            }
            function getEndTime(time){
                var rawTime = time.split('-')[1];
                var hour = Number(rawTime.split(':')[0])-(currentTime);
                if(hour<0){
                    hour+=24;
                }
                var min =  Number(rawTime.split(':')[1]);
                return hour*60+min>1440?1440:hour*60+min;
            }
        }
        function makeData(data){
            var timeData = [];
            var dataLength = data['statisticsList'].length;
            var tempD = data['statisticsList'];
            var newDate = new Date(data['currentTime']);
            currentTime = newDate.getHours();
            for(var i = 0; i < dataLength; i++){
                var timeStart = Number(tempD[i]['beforeTime']);
                var timeEnd = Number(tempD[i]['currentPointTime']);
                var t1 = new Date(timeStart);
                var t2 = new Date(timeEnd);
                var startTime = t1.getHours()+':'+t1.getMinutes()+'-';
                var endTime = t2.getHours()+':'+t2.getMinutes();
                timeData[i] = startTime+endTime;
            }
            var timeDataLenth = timeData.length;

            var newTimeData = [timeData[0]];
            for(var j = 1 ; j < timeDataLenth ; j++){
                if(newTimeData[newTimeData.length-1] !== timeData[j]){
                    var FrontendTime = newTimeData[newTimeData.length-1].split('-')[1];
                    var backStartTime = timeData[j].split('-')[0];
                    if(FrontendTime !== backStartTime){
                        newTimeData.push(timeData[j]);
                    }else if(FrontendTime === backStartTime){
                        newTimeData[newTimeData.length-1] = newTimeData[newTimeData.length-1].split('-')[0]+'-'+timeData[j].split('-')[1];
                    }

                }
            }
            return newTimeData;
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
        function setToMotion(){
            $('#motionStatus').text(textsOBJ.motionStatusON);
            $('#motionNo').attr('opacity','0');
            $('#motionYes').attr('opacity','1');
        }
        function setNoMotion(){
            $('#motionNo').attr('opacity','1');
            $('#motionYes').attr('opacity','0');
            $('#motionStatus').text(textsOBJ.motionStatusOFF);
        }


        function test(){
            var dataContent ={"statisticsList":[{"value":"true","currentPointTime":1494916126394,"beforeTime":1494916066394}],"roomId":1,"resTypeProName":"status","interval":0,"currentTime":0};
            datas = makeData(dataContent);
            drawXAxis();
        }
        // test();
        function removeOldChart(){
            $('#HolderSVG').find('g').remove();
        }
        var canC = true;
        $('#re').click(function () {
            if (canC){
                canC = false;
                removeOldChart();
                var pos1 = findRoom(GdataContent1,params['positionId']);
                datas = makeData(GdataContent1[pos1]);
                setTimeout(function () {
                    drawXAxis();
                },10);
                setTimeout(function () {
                    canC = true;
                },1100);
            }
        });
        window.onfocus = function () {
            removeOldChart();
            var pos1 = findRoom(GdataContent1,params['positionId']);
            datas = makeData(GdataContent1[pos1]);
            setTimeout(function () {
                drawXAxis();
            },10);
        };
        document.addEventListener('deviceready', function () {
            var params = Oomi_command_function.create_new().resource_data();
            getDate();
            function getDate(){
                cordova.exec(function (data) {}, null, "FTP2PApi","getMonitorInfo",['status']);
            }
            window.addEventListener('ftdevicestatusupdate', function (data) {
                if (data.title === "monitorMotion") {
                    var dataContent = JSON.parse(data.content);
                    removeOldChart();
                    GdataContent1  = dataContent;
                    var pos1 = findRoom(dataContent,params['positionId']);
                    datas = makeData(dataContent[pos1]);
                    setTimeout(function () {
                        drawXAxis();
                    },10);
                }
                if (data.title === "currentMotion") {
                    var dataContent2 = JSON.parse(data.content);
                    if(Number(params['positionId']) === Number(dataContent2['roomId'])){
                        var re = dataContent2.content;
                        if(re === true){
                            setToMotion();
                        }else if(re === false){
                            setNoMotion();
                        }else if(re === 'true'){
                            setToMotion();
                        }else if(re === 'false'){
                            setNoMotion();
                        }else{
                            setToMotion();
                        }
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
                        drawXAxis();
                    },10);
                }
            }, false);
        }, false);
    };
})();