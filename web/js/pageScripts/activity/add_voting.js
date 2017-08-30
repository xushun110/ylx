jQuery(function(){
    'use strict';
    var $form_add = $('#form_add');
    var ajaxdata = {};
    $form_add.validate({
        rules: {
            voteTitle: {
                required: true
            },
            activityId: {
                required: true
            },
            needUserLevelId: {
                required: true
            },
            endTime: {
                required: true
            }
        }
    });

    _init();

    _bind();

    _render();

    function _render() {}

    function _init(){
        //日期控件
        $("#endTime").datepicker({
            autoclose: true,
            clearBtn: true,
            forceParse: true,
            format: 'yyyy-mm-dd',
            language: 'cn',
            startView: 0,
            todayBtn: true,
            todayHighlight: false,
            weekStart: 1
        });

        $("#activityId").select2({
            placeholder: "请选择所属活动",
            allowClear: true
        });
        $("#needUserLevelId").select2({
            placeholder: "请选择限制等级",
            allowClear: true
        });
    }

    function _bind() {
        //保存
        $('#btnSave').on('click', function () {
            var $this = $(this);
            _ajax($this, '保存','/voting/add');
        });

        //返回
        $('#btnBack').on('click', function () {
            window.history.back();
        });

        //返回
        $('.iradio_minimal-yellow').parent().on('click', function () {
            var $that = $(this);
            var currIndex = $('.iradio_minimal-yellow').parent().index($that);
            //var $radio = $that.find('.checked');
            var existCheck = $that.find('.checked').length;
            var $radioDiv = $that.find('.iradio_minimal-yellow');
            $radioDiv.addClass('checked');
            //奇数
            if((currIndex+1)%2 == 0){
                $radioDiv.parent().prev().find('.iradio_minimal-yellow').removeClass('checked');
            }else{
                $radioDiv.parent().next().find('.iradio_minimal-yellow').removeClass('checked');
            }
            //为道具模式的固定模式
            if(currIndex == 3){
                //除了第一个列表都删除，固定模式只能设置一个
                $(".p-list").filter(':not(:eq(0))').remove();
            }
        });

        /** 添加奖励道具明细 **/
        $('body').on('click', ".add-price", function() {
            var $that = $(this);
            var $currentRow = $('.p-list').last();

            var $firstSelect = $(".props-list").find("select").eq(0);
            var totalPropsRows = $firstSelect.find("option").length;
            var selectNum = $(".props-list").find('select').length;
            //道具模式
            var propsPtn = buildPropsPtn();
            //固定模式不能添加多个
            if(propsPtn != 2){
                //如果道具下拉列表数大于道具种类的数量，不能再添加
                if(selectNum < totalPropsRows){
                    //获取当前元素的DOM，包含当前元素
                    var currRowHtml = $currentRow.prop("outerHTML");
                    $currentRow.after(currRowHtml);
                    //获取新添加的行
                    var $newRow = $currentRow.next();
                    var $optBtn = $newRow.find('button');
                    $optBtn.replaceWith(_replaceMinusHtml());
                    var $lastRow = $('.p-list').last();
                    _renderSelectOpt($lastRow);
                }
            }
        });

        /** 删除道具明细 **/
        $('body').on('click', ".minus-price", function() {
            var $that = $(this);
            //获取当前的行
            var currentRow = $that.parents('.p-list');
            //移除当前包裹DOM
            currentRow.remove();
        });

        //选择经验卡发生变化，重新选择
        $('body').on('change', ".exp-slt", function() {
            var $that = $(this);
            var $nextAllRow = $that.parent().parent().nextAll('.p-list');
            //删除后面所有行,重新选择
            $nextAllRow.remove();
        });
    }

    //替换加号样式为减号
    function _replaceMinusHtml(){
        var minusHtml =
            '<button type="button" class="minus-price btn btn-primary">'
            +'<i class="glyphicon glyphicon-minus"></i>'
            +'</button>';
        return minusHtml;
    }

    //删除上一个下拉，已被选中的option，渲染select
    function _renderSelectOpt($ele){
        $ele.find('.p-tl').html('');
        var $prevSelect = $ele.prev().find('select');
        var prevVal = $prevSelect.val();
        $ele.find('select option[value='+prevVal+']').remove();
    }

    function buildPriceList(){
        var $priceList = $('.price-list').find('.list');
        var items = [];
        $priceList.each(function(){
            var $this = $(this);
            var item = {};
            item.pricing = $this.find("input[id=pricing]").val().trim();
            item.groupUnit = $this.find("input[id=groupUnit]").val().trim();
            if(null != item.pricing && item.pricing != ''
                && null != item.groupUnit && item.groupUnit != ''){
                items.push(item);
            }
        });
        if(items.length != 0){
            items = JSON.stringify(items);
        }else{
            items = '';
        }
        return items;
    }

    function _ajax($this, buttonText, reUrl) {
        var formValid = $form_add.validate().form();
        if (formValid) {
            _setAjaxData();
            if (_verifyAjaxData()) {
                jQuery.ajax({
                    dataType: "json",
                    url: reUrl,
                    data: ajaxdata,
                    type: "POST",
                    success: function (result) {
                        if (result.code == 1) {
                            FOXKEEPER_UTILS.alert('success',result.msg);
                            setTimeout(function(){
                                location.replace('/voting/goList');
                            }, 1000);
                        }
                        else
                        {
                            FOXKEEPER_UTILS.alert('warning',result.msg);
                            $this.html(buttonText).attr("disabled", false);
                        }
                    },
                    beforeSend: function () {// 设置表单提交前方法    
                        $this.html('<i class=\"fa fa-spinner\"></i>&nbsp;正在' + buttonText).attr("disabled", "disabled");
                    }
                });
            }  else {
                return false;
            }
        }
        return false;
    }

    /** 投票类型 **/
    function buildVoteType(){
        var $checkedSlt = $('.vote-type').find('.checked');
        var  sltedVal = $checkedSlt.find('input').val();
        return sltedVal;
    }

    /** 道具模式 **/
    function buildPropsPtn(){
        var $checkedSlt = $('.props-ptn').find('.checked');
        var  sltedVal = $checkedSlt.find('input').val();
        return sltedVal;
    }

    /** 道具奖励 **/
    function buildPropsAward(){
        var $awardList = $('.p-list');
        var len = $awardList.length;
        ajaxdata.totalPropAward = 0;
        if(0 != len){
            var items = [];
            $awardList.each(function(){
                var $this = $(this);
                var item = {};
                var $sltedProp = $this.find("select option:selected");
                //道具ID
                item.productId = $sltedProp.val().trim();
                item.productClzId = $sltedProp.attr('clz');
                //道具发放数量
                item.publishNum = $this.find("input[name=publishNum]").val().trim();
                item.activityId = $('#activityId').val().trim();
                items.push(item);
                ajaxdata.totalPropAward += parseInt(item.publishNum);
            });
            return JSON.stringify(items);
        }
        return '';
    }

    function _setAjaxData () {
        ajaxdata.activityId = $('#activityId').val().trim();
        ajaxdata.voteType = buildVoteType();
        ajaxdata.voteTitle = $('#voteTitle').val().trim();
        ajaxdata.keyword = $('#keyword').val().trim();
        ajaxdata.exp = $('#exp').val().trim();
        ajaxdata.goldCoin = $('#goldCoin').val().trim();
        ajaxdata.isExpRandom = $('#isExpRandom').val();
        ajaxdata.isCoinRandom = $('#isCoinRandom').val();
        ajaxdata.isPropsRandom = buildPropsPtn();
        ajaxdata.needUserLevel = $('#needUserLevelId').val();
        ajaxdata.prizeNum = parseInt($('#prizeNum').val().trim());
        ajaxdata.endTime = $('#endTime').val()+" 00:00:00";
        ajaxdata.propAwardJson = buildPropsAward();
    }

    /** 请求参数验证 */
    function _verifyAjaxData () {
        if (ajaxdata.totalPropAward > ajaxdata.prizeNum) {
            FOXKEEPER_UTILS.alert('warning', '道具奖励之和要小于等于福利总份数');
            return false;
        }
        return true;
    }
});
