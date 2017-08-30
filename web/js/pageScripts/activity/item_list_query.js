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
                var upLen = $('input[name^="subcheck_"]').length;
                var allLen = $('input:checkbox').length;
                /*if (upLen == allLen -1) {
                    _reset();
                    return;
                } else {
                    $('#batchDelete').removeClass('btn-default').addClass('btn-primary');
                    $('input[name^="subcheck_"]').prop('checked', checkFlg);
                }*/
                $('#batchDelete').removeClass('btn-default').addClass('btn-primary');
                $('input[name^="subcheck_"]').prop('checked', checkFlg);
            } else {
                _reset();
            }

        });

        /** 单选 */
        $('body').on('click', 'input[name^="subcheck_"]', function () {
            var $this = $(this);
            var status = $this.attr('s');
            /*if (status == 0) {*/
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
            /*} else {
                $this.prop("checked", false);
                return false;
            }*/
        });


    }

    function _getDataIds() {
        var selects = $("input:checkbox:checked");
        var ids = [];
        selects.each(function(){
            var $this = $(this);
            var id = $this.val();
            if (id) {
                /*var status = $this.attr("s");
                if (status == 0) {*/
                    ids.push(id);
                /*}*/
            }
        });
        return ids.join(',');
    }

    function _batchDelete(ids) {
        bootbox.dialog({
            title: "",
            message: '<div class="row">  ' +
            '<div class="col-xs-12"> ' +
            '请确认是否删除该活动投票信息？' +
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
                            url: '/voteItem/batchDelete',
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

    function _reset() {
        $('#batchDelete').removeClass('btn-primary').addClass('btn-default');
        $("input:checkbox").prop('checked', false);
    }

    function _initData () {
        _reset();
        _setAjaxData();
        jQuery.ajax({
            dataType: "json",
            url: webBasePath + '/voteItem/findVoteItemList',
            data: queryParams,
            type: "POST",
            success: function (result) {
                if (result.code == 1) {
                    var $dataList = $('#dataList');
                    var $pageTotalRecord = $('#pageTotalRecord');
                    var voteId = $('#voteId').val();
                    if (result.data != null && result.data.data.length > 0) {
                        var data = result.data.data;
                        var totalPage = result.data.totalPages;
                        var _html = new Array();
                        for (var i = 0; i < data.length; i++) {
                            var obj = data[i];
                            var dataId = obj.voteItemId;
                            _html.push('<tr>');
                            _html.push('<td>' + '<input type="checkbox" name="subcheck_' + '_' + (i+1) +'" class="" value="' + dataId + '"  s="0" />' + '</td>');
                            var _imageHtml = [];
                            _imageHtml.push('<div class="profile-image">');
                            _imageHtml.push('<img src="' + obj.optImgUrl + '" class="" style="width: 80%;" />');
                            _imageHtml.push('</div>');
                            _html.push('<td width="120px;">' + _imageHtml.join('') + '</td>');
                            _html.push('<td>' + obj.voteTitle + '</td>');
                            _html.push('<td>' + obj.optContent + '</td>');
                            _html.push('<td>' + obj.voteNum + '</td>');

                            var _operHtml = [];
                            _operHtml.push('<a href="/voteItem/goEdit/' + dataId + '_'+voteId+'" class="btn btn-primary btn-xs">修改</a>');
                            _operHtml.push('<a href="javascript:void(0);" class="btn btn-primary btn-xs jq_del" nid="' + dataId + '">删除</a>');
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
        queryParams.voteTitle = $('#voteTitle').val();
        queryParams.voteId = $('#voteId').val();
    }

});
