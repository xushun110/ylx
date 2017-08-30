jQuery(function(){
    'use strict';
    var $form_add = $('#form_add');
    var ajaxdata = {};
    $form_add.validate({
        rules: {
            optContent: {
                required: true,
            },
            voteNum: {
            	required: true,
                digits:true,
                min:0
            },
            sortIndex: {
                required: true,
                digits:true,
                min:1
            }
        }
    });
    
    /** 初始化 */
    _init();
    
    _bind();
    
    function _init() {}

    function _bind() {
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
            if (fileName != "") {
                return ajaxFileUpload(_this, _this.attr("id"), $processBar);
            }
        });
    	
    	//保存
    	$('#btnSave').on('click', function () {
    		var $this = $(this);
    		_ajax($this, '保存');
    	});
    }

    function _ajax($this, buttonText) {
        var formValid = $form_add.validate().form();
        if (formValid) {
        	_setAjaxData();
        	if (_verifyAjaxData()) {
        		jQuery.ajax({
        			dataType: "json",
        			url: "/voteItem/add",
        			data: ajaxdata,
        			type: "POST",
        			success: function (result) {
        				if (result.code == 1) {
        					FOXKEEPER_UTILS.alert('success',result.msg);
        					var voteId = $('#voteId').val();
        					setTimeout(function(){
        						location.replace('/voteItem/goList/'+voteId);
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
        		$('html, body').animate({scrollTop: 0}, 800);
        		return false;
        	}
        } else {
        	$('html, body').animate({scrollTop: 0}, 800);
        }
        return false;
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
    	ajaxdata.voteId = $('#voteId').val();
    	ajaxdata.optImgUrl = $('#optImgUrl').val();
    	ajaxdata.optContent = $('#optContent').val().trim();
        ajaxdata.voteNum = $('#voteNum').val().trim();
        ajaxdata.sortIndex = $('#sortIndex').val().trim();
    }

    /** 请求参数验证 */
    function _verifyAjaxData () {
    	return true;
    }
});
