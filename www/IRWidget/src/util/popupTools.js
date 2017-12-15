/**
 * Created by qkchung on 17/2/24.
 */
define([],function(){
    var popupTools = {};
    popupTools.ImportTemplates = function(fromTemplate){
        return 1;
        //var link = document.querySelector('link[rel="import"]');
        //var content = link['import'];
        //var el = content.querySelector(fromTemplate);
        //document.body.appendChild(el.cloneNode(true));
    };
    popupTools.updateUI = function updateUI(data,find,fun){
        var obj = stringToJson(data);
        var arry = obj.value;
        if (arry.length > 0 ) {
            for(var i in arry){
                if(typeof arry[i] == 'object' ) {
                    if(arry[i] == null){
                        if(fun){
                            if(find == 'null'){
                                fun();
                            }
                        }
                    }else{
                        for (var j in arry[i]) {
                            if (j == find) {
                                fun(arry[i][j]);
                                return 1;
                            }
                        }
                    }

                }
            }
        }
        function stringToJson(data){
            var result = '';
            if(data.indexOf('\"[')>0 || data.indexOf(']\"')>0){
                var str3 = data.replace('\"[','[');
                result = str3.replace(']\"',']');
            }else {
                result = data;
            }
            return JSON.parse(result);
        }
    };
    popupTools.ajaxHTML = function (){
            $.ajax({
                url : "../src/templates/componentsTemplate.html",
                async:false,            //this is the trick
                success : function(result){
                    document.body.innerHTML=document.body.innerHTML+result;

                }
            });
    };
    popupTools.ajaxEditHTML = function (){
        $.ajax({
            url : "../src/templates/editTemplate.html",
            async:false,            //this is the trick
            success : function(result){
                document.body.innerHTML=document.body.innerHTML+result;

            }
        });
    };
    popupTools.ajaxHTML_Index = function (){
        $.ajax({
            url : "../src/templates/widgetTemplates.html",
            async:false,            //this is the trick
            success : function(result){
                document.body.innerHTML=document.body.innerHTML+result;
            }
        });
    };
    popupTools.loadCordova = function (fun){
        if(fun){
            fun();
        }
    };
    return popupTools;
});

