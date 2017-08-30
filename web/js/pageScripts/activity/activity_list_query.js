jQuery(function(){
    'use strict';

    var $paginationContainer = $('#paginationContainer');
    //分页功能
    var options = {
        //bootstrapMajorVersion:3,
        containerClass:'dataTables_paginate paging_bootstrap',
        listContainerClass:'pagination pull-right',
        currentPage: 1,
        totalPages: 10,
        numberOfPages: 5,
        pageUrl: function (type, page, current) {
            return "javascript:;";
        },
        onPageClicked: function (e, originalEvent, type, page) {
            options.currentPage = page;
            _initData();
        }
    }

    var queryParams = {
        page : 1,
        pageSize : 10
    };


    //渲染
    _init();
    //绑定
    _bind();

    function _init(){
        //初始化列表
        _initData();

    }

    function _bind () {
        /**  检索 */
        $('#btnSearch').click(function () {
            _initData();
        });

        /** 撤销 */
        $('body').on('click', ".jq_rev", function() {
            var $this = $(this);
            var id = $this.attr('nid');
            _revoke(id);
        });

        /** 发布 */
        $('body').on('click', ".jq_pub", function() {
            var $this = $(this);
            var id = $this.attr('nid');
            _publish(id);
        });

        /** 推荐 */
        $('body').on('click', ".jq_recomm", function() {
            var $this = $(this);
            var id = $this.attr('nid');
            _recommend(id);
        });

        /** 取消推荐 */
        $('body').on('click', ".jq_unrecomm", function() {
            var $this = $(this);
            var id = $this.attr('nid');
            _unRecommend(id);
        });

        /** 批量删除 */
        $('#batchDelete').on('click', function () {
            var len = $('input:checkbox:checked').length;
            if (len > 0) {
                var ids = _getDataIds();
                if (ids) {
                    _batchDelete(ids);
                    return false;
                }
            } else {
                return false;
            }
        });

        /**  单个删除 */
        $('body').on('click', ".jq_del", function() {
            var $slted = $(this).parent().parent().find('input[type="checkbox"]');
            var id = $slted.val();
            _batchDelete(id);
        });

        /** 全选、全不选 */
        $('#allSelected').click(function () {
            var $this = $(this);
            var checkFlg = $this.prop('checked');
            if (checkFlg) {
                var upLen = $('input[name^="subcheck_1_"]').length;
                var allLen = $('input:checkbox').length;
                if (upLen == allLen -1) {
                    _reset();
                    return;
                } else {
                    $('#batchDelete').removeClass('btn-default').addClass('btn-primary');
                    $('input[name^="subcheck_0_"]').prop('checked', checkFlg);
                }
            } else {
                _reset();
            }

        });

        /** 单选 */
        $('body').on('click', 'input[name^="subcheck_"]', function () {
            var $this = $(this);
            var status = $this.attr('s');
            if (status == 0) {
                var chkFlg = $this.prop("checked");
                var downLen = $('input[name^="subcheck_0_"]').length;

                if (chkFlg) {
                    var selectLen = $('input[name^="subcheck_0_"]:checked').length;
                    if (downLen == selectLen) {
                        $('#allSelected').prop('checked', chkFlg);
                    }
                    $('#batchDelete').removeClass('btn-default').addClass('btn-primary');
                } else {
                    var notSelectLen = $('input[name^="subcheck_0_"]').not("input:checked").length;
                    if (downLen == notSelectLen) {
                        _reset();
                    } else {
                        $('#allSelected').prop('checked', chkFlg);
                    }
                }
            } else {
                $this.prop("checked", false);
                return false;
            }
        });


    }

    function _getDataIds() {
        var selects = $("input:checkbox:checked");
        var ids = [];
        selects.each(function(){
            var $this = $(this);
            var id = $this.val();
            if (id) {
                var status = $this.attr("s");
                if (status == 0) {
                    ids.push(id);
                }
            }
        });
        return ids.join(',');
    }

    function _batchDelete(ids) {
        bootbox.dialog({
            title: "",
            message: '<div class="row">  ' +
            '<div class="col-xs-12"> ' +
            '请确认是否删除活动？' +
            '</div></div>',
            buttons: {
                cancel: {
                    label: "取消操作",
                    className: "btn-cancel",
                    callback: $.noop
                },
                confirm: {
                    label: "确定删除",
                    className: "btn-success",
                    callback: function () {
                        jQuery.ajax({
                            dataType: "json",
                            url: '/activity/batchDelete',
                            data: {dataIds : ids},
                            type: "POST",
                            success: function (result) {
                                if (result.code == 1) {
                                    FOXKEEPER_UTILS.alert('success', result.msg);
                                    _initData();
                                }
                                else
                                {
                                    FOXKEEPER_UTILS.alert('warning', result.msg);
                                }
                            }
                        });
                        return true;
                    }
                }
            }
        })
    }

    function _revoke(id) {
        bootbox.dialog({
            title: "",
            message: '<div class="row">  ' +
            '<div class="col-xs-12"> ' +
            '请确认是否撤销该活动？' +
            '</div></div>',
            buttons: {
                cancel: {
                    label: "取消操作",
                    className: "btn-cancel",
                    callback: $.noop
                },
                confirm: {
                    label: "确定撤销",
                    className: "btn-success",
                    callback: function () {
                        jQuery.ajax({
                            dataType: "json",
                            url: '/activity/revoke',
                            data: {activityId : id,activityStatus : 0},
                            type: "POST",
                            success: function (result) {
                                if (result.code == 1) {
                                    FOXKEEPER_UTILS.alert('success', result.msg);
                                    _initData();
                                }
                                else
                                {
                                    FOXKEEPER_UTILS.alert('warning', result.msg);
                                }
                            }
                        });
                        return true;
                    }
                }
            }
        })
    }

    function _publish(id) {
        bootbox.dialog({
            title: "",
            message: '<div class="row">  ' +
            '<div class="col-xs-12"> ' +
            '请确认是否发布该活动？' +
            '</div></div>',
            buttons: {
                cancel: {
                    label: "取消操作",
                    className: "btn-cancel",
                    callback: $.noop
                },
                confirm: {
                    label: "确定发布",
                    className: "btn-success",
                    callback: function () {
                        jQuery.ajax({
                            dataType: "json",
                            url: '/activity/publish',
                            data: {activityId : id,activityStatus : 1},
                            type: "POST",
                            success: function (result) {
                                if (result.code == 1) {
                                    FOXKEEPER_UTILS.alert('success', result.msg);
                                    _initData();
                                }
                                else
                                {
                                    FOXKEEPER_UTILS.alert('warning', result.msg);
                                }
                            }
                        });
                        return true;
                    }
                }
            }
        })
    }

    function _recommend(id) {
        bootbox.dialog({
            title: "",
            message: '<div class="row">  ' +
            '<div class="col-xs-12"> ' +
            '请确认是否推荐该活动？' +
            '</div></div>',
            buttons: {
                cancel: {
                    label: "取消操作",
                    className: "btn-cancel",
                    callback: $.noop
                },
                confirm: {
                    label: "确定推荐",
                    className: "btn-success",
                    callback: function () {
                        jQuery.ajax({
                            dataType: "json",
                            url: '/activity/recommend',
                            data: {activityId : id,isRecomm : 1},
                            type: "POST",
                            success: function (result) {
                                if (result.code == 1) {
                                    FOXKEEPER_UTILS.alert('success', result.msg);
                                    _initData();
                                }
                                else
                                {
                                    FOXKEEPER_UTILS.alert('warning', result.msg);
                                }
                            }
                        });
                        return true;
                    }
                }
            }
        })
    }

    function _unRecommend(id) {
        bootbox.dialog({
            title: "",
            message: '<div class="row">  ' +
            '<div class="col-xs-12"> ' +
            '请确认是否取消推荐该活动？' +
            '</div></div>',
            buttons: {
                cancel: {
                    label: "取消操作",
                    className: "btn-cancel",
                    callback: $.noop
                },
                confirm: {
                    label: "确定取消推荐",
                    className: "btn-success",
                    callback: function () {
                        jQuery.ajax({
                            dataType: "json",
                            url: '/activity/unRecommend',
                            data: {activityId : id,isRecomm : 0},
                            type: "POST",
                            success: function (result) {
                                if (result.code == 1) {
                                    FOXKEEPER_UTILS.alert('success', result.msg);
                                    _initData();
                                }
                                else
                                {
                                    FOXKEEPER_UTILS.alert('warning', result.msg);
                                }
                            }
                        });
                        return true;
                    }
                }
            }
        })
    }

    function _reset() {
        $('#batchDelete').removeClass('btn-primary').addClass('btn-default');
        $("input:checkbox").prop('checked', false);
    }

    function _initData () {
        _reset();
        _setAjaxData();
        jQuery.ajax({
            dataType: "json",
            url: webBasePath + '/activity/findActivities',
            data: queryParams,
            type: "POST",
            success: function (result) {
                if (result.code == 1) {
                    var $dataList = $('#dataList');
                    var $pageTotalRecord = $('#pageTotalRecord');
                    if (result.data != null && result.data.data.length > 0) {
                        var data = result.data.data;
                        var totalPage = result.data.totalPages;
                        var _html = new Array();
                        var statusArray = ['未发布', '已发布'];
                        var recommendArray = ['否', '是'];
                        for (var i = 0; i < data.length; i++) {
                            var obj = data[i];
                            var dataId = obj.activityId;
                            var statusInt = parseInt(obj.activityStatus);
                            var recommendStatus = parseInt(obj.isRecomm);
                            _html.push('<tr>');
                            _html.push('<td>' + '<input type="checkbox" name="subcheck_' + statusInt + '_' + (i+1) +'" class="" value="' + dataId + '"  s="' + statusInt + '" />' + '</td>');
                            var _imageHtml = [];
                            _imageHtml.push('<div class="profile-image">');
                            _imageHtml.push('<img src="' + obj.coverUrl + '" class="" style="width: 80%;" />');
                            _imageHtml.push('</div>');
                            _html.push('<td width="120px;">' + _imageHtml.join('') + '</td>');

                            _html.push('<td>' + obj.activityTitle + '</td>');
                            _html.push('<td>' + (null == obj.likes ? '0' : obj.likes) + '</td>');
                            _html.push('<td>' + (null == obj.commentNum ? '0' : obj.commentNum) + '</td>');
                            _html.push('<td>' + statusArray[statusInt] + '</td>');
                            _html.push('<td>' + recommendArray[obj.isRecomm] + '</td>');
                            _html.push('<td>' + obj.createTime + '</td>');
                            _html.push('<td>' + (null == obj.publishTime ? '-' : obj.publishTime) + '</td>');

                            var _operHtml = [];
                            //未发布-可修改，可发布，可删除
                            //已发布-不能修改，不能删除，可撤销，可推荐
                            if(statusInt == 0){
                                _operHtml.push('<a href="/activity/goEdit/' + dataId + '" class="btn btn-primary btn-xs">修改</a>');
                                _operHtml.push('<a href="javascript:void(0);" class="btn btn-primary btn-xs jq_pub" nid="' + dataId + '"> 发布 </a>');
                                _operHtml.push('<a href="javascript:void(0);" class="btn btn-primary btn-xs jq_del" nid="' + dataId + '">删除</a>');
                            }else if(statusInt == 1){
                                if(recommendStatus == 0){
                                    _operHtml.push('<a href="javascript:void(0);" class="btn btn-primary btn-xs jq_recomm" nid="' + dataId + '"> 推荐 </a>');
                                }else{
                                    _operHtml.push('<a href="javascript:void(0);" class="btn btn-primary btn-xs jq_unrecomm" nid="' + dataId + '"> 取消推荐 </a>');
                                }
                                _operHtml.push('<a href="javascript:void(0);" class="btn btn-primary btn-xs jq_rev" nid="' + dataId + '"> 撤销 </a>');

                            }
                            _html.push('<td>' + _operHtml.join('&nbsp;') + '</td>');
                            _html.push('</tr>');
                        }

                        $dataList.find('tbody').html(_html.join(''));

                        options.totalPages = totalPage;
                        $paginationContainer.bootstrapPaginator(options);

                        $('#batchDeleteDiv').show();

                        $pageTotalRecord.html('<div class="dataTables_info" role="status" aria-live="polite">共 '
                            + totalPage + ' 页 ' + result.data.totalItem + '条记录，当前为第 ' + result.data.currentPage + ' 页');
                    } else {
                        $('#batchDeleteDiv').hide();
                        $dataList.find('tbody').html('');
                        $pageTotalRecord.html('<div class="dataTables_info" role="status" aria-live="polite">无查询记录</div>');
                        $paginationContainer.html('');
                    }

                }else{
                    FOXKEEPER_UTILS.alert('warning', result.message);
                }
            }
        });
    }

    //封装ajax提交数据
    function _setAjaxData () {
        queryParams.page = options.currentPage;
        queryParams.activityTitle = $('#activityTitle').val();
    }

});
