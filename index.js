window.onload = function(){
    var date = new Date();
    //获取当前年月
    var year = date.getFullYear();
    var month = date.getMonth();
    var curMonth = date.getMonth()+1;
    //显示当年当月
    document.getElementById('current_month').innerHTML = year+'年'+curMonth+'月';
    //当月1号星期
    function getCurMonthWeek(year, month){
        return new Date(year, month, 1).getDay()+1;
    }
    function getMaxDayNum(year, month){
        return new Date(year,month,0).getDate();
    }
    displayCalendar(year, month, curMonth);
    function displayCalendar(year, month, curMonth){
        //当月天数
        var max = getMaxDayNum(year, curMonth);
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
        var currYear = date.getFullYear();
        var currMonth = date.getMonth();
        var currDay = date.getDate()+1;
        for(var i=0; i<totaltd; i++){
            var j = parseInt(i+1);
            //遍历所有li元素
            if(j>=curWeek && j<parseInt(max+curWeek)){
                var pElement = document.querySelectorAll('.date');
                for(var z=0; z<pElement.length; z++){
                    if(new Date(pElement[z].innerHTML).getFullYear() == year && new Date(pElement[z].innerHTML).getMonth() == month && new Date(pElement[z].innerHTML).getDate() == day){
                        tdElement.classList.add('selected');
                    }
                }
                textNode = document.createTextNode(day);
                day++;
                if(currYear==year && currMonth==month && currDay==day){
                    tdElement.classList.add('o-current');
                }
                tdElement.appendChild(textNode);
                tdElement.onclick = function(){
                    var currentYM = document.getElementById('current_month').innerHTML;
                    var currentYear = currentYM.split('年')[0];
                    var currentMonth = currentYM.split('年')[1].split('月')[0];
                    var currenDay = this.innerHTML;
                    console.log(currentYear+'-'+currentMonth+'-'+currenDay);
                }
            }else{
                textNode = document.createTextNode('');
                tdElement.appendChild(textNode);
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
    document.getElementById('preM').onclick = function(){
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
    document.getElementById('preY').onclick = function(){
        var selectedYM = document.getElementById('current_month').innerHTML;
        var year = selectedYM.split('年')[0];
        var month = selectedYM.split('年')[1].split('月')[0];
        if(year!=1){
            year -= 1;
        }
        document.getElementById('current_month').innerHTML = year+'年'+month+'月';
        var curMonth = month;
        month -= 1;
        document.getElementById('calendar').innerHTML='';
        displayCalendar(year, month, curMonth);
    }
    document.getElementById('nextM').onclick = function(){
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
    document.getElementById('nextY').onclick = function(){
        var selectedYM = document.getElementById('current_month').innerHTML;
        var year = selectedYM.split('年')[0];
        var month = selectedYM.split('年')[1].split('月')[0];
        year = parseInt(year)+1;
        document.getElementById('current_month').innerHTML = year+'年'+month+'月';
        var curMonth = month;
        month -= 1;
        document.getElementById('calendar').innerHTML='';
        displayCalendar(year, month, curMonth);
    }
    var list = document.getElementById('list');
    document.getElementById('add').onclick = function(){
        var date = document.getElementById('time').value;
        var text = document.getElementById('text').value;
        var pNewElement = document.createElement('p');
        var textElementDate = document.createTextNode(date);
        var textElementText = document.createTextNode(text);
        pNewElement.appendChild(textElementDate);
        pNewElement.classList.add('date');
        var liElement = document.createElement('li');
        liElement.appendChild(pNewElement);
        liElement.appendChild(textElementText);
        list.appendChild(liElement);
        var day = date.split('-');
        document.getElementById('calendar').innerHTML = '';
        displayCalendar(day[0], (day[1]-1), day[1]);
    }
}
