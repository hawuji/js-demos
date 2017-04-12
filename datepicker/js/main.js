(function(){
    var datepicker = window.datepicker;
    var monthData;
    var $wrapper;

    datepicker.buildUi = function(year,month){
        monthData = datepicker.getMonthData(year,month);
        var html = '<div class="ui-datepicker-header">'+
            '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'+
            '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'+
            '<span class="ui-datepicker-curr-month">'+monthData.year+'-'+monthData.month+'</span>'+
        '</div>'+
        '<div class="ui-datepicker-body">'+
            '<table>'+
                '<thead>'+
                    '<tr>'+
                        '<th>一</th>'+
                        '<th>二</th>'+
                        '<th>三</th>'+
                        '<th>四</th>'+
                        '<th>五</th>'+
                        '<th>六</th>'+
                        '<th>日</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>';

                for(var i=0;i<monthData.days.length;i++){
                    var date = monthData.days[i];
                    if(i%7 === 0){
                        html += '<tr>';
                    }

                    html += '<td data-date="'+date.date+'">' + date.showDate + '</td>';

                    if(i%7 === 6){
                        html += '</tr>';
                    }
                }

                html += '</tbody>'+
            '</table>'+
        '</div>';

        return html;
    };

    datepicker.render = function(direction){

        var year,month;
        if(monthData){
            var year = monthData.year;
            var month = monthData.month;
        }

        if(direction === 'prev') month--;
        if(direction === 'next') month++;

        //判断是否是上一年和下一年
        if(month == 0){
            year--;
            month = 12;
        }
        if(month ==13){
            year++;
            month =1;
        }

        var html = datepicker.buildUi(year,month);
        //$dom.innerHTML = html;
        $wrapper = document.querySelector('.ui-datepicker-wrapper');
        if(!$wrapper){
            $wrapper = document.createElement('div');
            $wrapper.className = 'ui-datepicker-wrapper';
            document.body.appendChild($wrapper);
        }

        $wrapper.innerHTML = html;
    };

    datepicker.init = function(input){
        datepicker.render();

        var $input = document.querySelector(input);
        var isOpen = false;

        $input.addEventListener('click',function(){
            if(isOpen){
                $wrapper.classList.remove('ui-datepicker-warpper-show');
                isOpen = false;
            }else{
                $wrapper.classList.add('ui-datepicker-warpper-show');
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';
                isOpen = true;

            }
        },false);

        //翻页
        $wrapper.addEventListener('click',function(e){
            var $target = e.target;
            if(!$target.classList.contains('ui-datepicker-btn'))
                return;

            //上一页

            if($target.classList.contains('ui-datepicker-prev-btn')){
                datepicker.render('prev');
            }

            //下一页
            if($target.classList.contains('ui-datepicker-next-btn')){
                datepicker.render('next');
            }
        },false);

        //选择日期
        $wrapper.addEventListener('click',function(e){
            var  $target = e.target;
            if($target.tagName.toLowerCase() !== 'td') return;

            var date = new Date(monthData.year,monthData.month-1,$target.dataset.date);

            $input.value = format(date);

            //隐藏日期
            $wrapper.classList.remove('ui-datepicker-warpper-show');
            isOpen = false;

        },false)
    };

    //对日期进行格式化
    function format(date){
        ret = '';

        var padding = function(num){
            if(num <=9){
                return '0' + num;
            }
            return num;
        }
        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());
        return ret;
    }

})();