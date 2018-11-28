window.onload = function(){
    var date = new Date();
    //获取当前年月
    var year = date.getFullYear();
    var month = date.getMonth();
    var curMonth = date.getMonth()+1;
    //显示当年当月
    document.getElementById('current_month').innerHTML = year+'年'+curMonth+'月';
    displayCalendar(year, month, curMonth);
    function displayCalendar(year, month, curMonth){
        //当月天数
        var max = getMaxDayNum(year, curMonth);
        function getMaxDayNum(year, month){
            return new Date(year,month,0).getDate();
        }
        //当月1号星期
        function getCurMonthWeek(year, month){
            return new Date(year, month, 1).getDay()+1;
        }
        var curWeek = getCurMonthWeek(year, month);
        //日期初始化
        var day = 1;
        //获取表格数
        var totaltd = parseInt(max+curWeek);
        if(totaltd%7!=0){
            totaltd = (parseInt(totaltd/7)+1)*7;
        }
        var trElement = document.createElement('tr');
        var tdElement = document.createElement('td');
        var textNode;
        for(var i=0; i<totaltd; i++){
            var j = parseInt(i+1);
            //遍历所有li元素
            var liElement = document.getElementsByTagName('li');
            for(var z=0; z<liElement.length; z++){
                if(liElement[z].innerHTML==year+'-'+parseInt(month+1)+'-'+day){
                    tdElement.classList.add('selected');
                }
            }
            if(j>=curWeek && j<parseInt(max+curWeek)){
                textNode = document.createTextNode(day);
                day++;
            }else{
                textNode = document.createTextNode('');
            }
            tdElement.appendChild(textNode);
            var currYear = date.getFullYear();
            var currMonth = date.getMonth();
            var currDay = date.getDate()+1;
            if(currYear==year && currMonth==month && currDay==day){
                tdElement.classList.add('o-current');
            }
            trElement.appendChild(tdElement);
            tdElement = document.createElement('td');
            //每7个td初始化一次tr
            if(parseInt(i+1)%7==0){
                document.getElementById('calendar').appendChild(trElement);
                trElement = document.createElement('tr');
            }
        }
    }
    document.getElementById('pre').onclick = function(){
        var selectedYM = document.getElementById('current_month').innerHTML;
        var year = selectedYM.split('年')[0];
        var month = selectedYM.split('年')[1].split('月')[0];
        if(month!=1){
            month -= 1;
        }else{
            year -= 1;
            month = 12;
        }
        document.getElementById('current_month').innerHTML = year+'年'+month+'月';
        var curMonth = month;
        month -= 1;
        document.getElementById('calendar').innerHTML='';
        displayCalendar(year, month, curMonth);
    }
    document.getElementById('next').onclick = function(){
        var selectedYM = document.getElementById('current_month').innerHTML;
        var year = selectedYM.split('年')[0];
        var month = selectedYM.split('年')[1].split('月')[0];
        if(month!=12){
            month = parseInt(month)+1;
        }else{
            year = parseInt(year)+1;
            month = 1;
        }
        document.getElementById('current_month').innerHTML = year+'年'+month+'月';
        var curMonth = month;
        month -= 1;
        document.getElementById('calendar').innerHTML='';
        displayCalendar(year, month, curMonth);
    }
}
