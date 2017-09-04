jQuery(function(){
    'use strict';
    var $form_add = $('#form_add');
    var ajaxdata = {};
    $form_add.validate({
        rules: {
        }
    });

    _init();

    _bind();

    _render();

    /** 渲染 **/
    function _render() {
        //富文本
        var ue = new baidu.editor.ui.Editor();
        ue.render("editor");
    }

    /** 初始化 **/
    function _init(){

    }

    /** 绑定事件 **/
    function _bind() {
        //保存
        $('#btnSave').on('click', function () {
            var $this = $(this);
            var reUrl ='http://120.76.101.46/ylx/api/entrusts.ajax';
            _ajax($this, '保存',reUrl);
        });

        //返回
        $('#btnBack').on('click', function () {
            window.history.back();
        });
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
                                    location.replace('/xxxxxxx/goList');

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

        //图片上传
        $('body').on('change', 'input[name$="_upload"]', function(e) {
            var _this = $(this);
            var fileName = $(this).val();
            var $processBar = _this.parent().parent().prev('div');
            $processBar.removeClass('hide');
            if (!fileName.match('\\.(gif|png|jpe?g)$')) {
                FOXKEEPER_UTILS.alert('warning', '只能上传图片格式，如：gif,png,jpg,jpeg!');
                _this.val("");
                $('#' + _this.attr("mid")).attr("src", "/images/nopica.png");
                $('#' + _this.attr("uid")).val("");

                $processBar.addClass('hide');
                return false;
            }

            //图片大小判断
            var imgSize = document.getElementById("lcimage_upload").files[0].size;
            if(imgSize>1024*100){
                FOXKEEPER_UTILS.alert('warning', '图片尺寸请小于100k');
                $("#lcimage_upload").val("");
                return false;
            }

            if (fileName != "") {
                return ajaxFileUpload(_this, _this.attr("id"), $processBar);
            }
        });
    }

    function ajaxFileUpload($file, fileId, $processBar) {
        $.ajaxFileUpload({
            url: '/common/image/upload',
            secureuri: false,
            fileElementId: fileId,
            dataType: 'json',
            type: "post",
            success: function(result) {
                $processBar.addClass('hide');
                var result = JSON.parse(result);
                if (result.code == 1) {
                    var url = result.data;
                    $('#' + $file.attr("mid")).attr("src", url);
                    $('#' + $file.attr("uid")).val(url);
                } else {
                    FOXKEEPER_UTILS.alert('warning', result.msg);
                }
            },
            error: function(e) {
                $processBar.addClass('hide');
                FOXKEEPER_UTILS.alert('warning', '上传出错，请重试');
            }
        });
        return false;
    }

    function _setAjaxData () {
        ajaxdata.xxContent = ue.getContent();
    }

    /** 请求参数验证 */
    function _verifyAjaxData () {
       /* if (!ajaxdata.XXXX) {
            FOXKEEPER_UTILS.alert('warning', '请上传图片');
            return false;
        }*/
        return true;
    }
});
