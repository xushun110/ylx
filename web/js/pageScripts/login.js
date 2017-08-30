jQuery(function(){
'use strict';
  var $form_users_signin = $('#form_users_signin');

  $form_users_signin.validate({
    rules: {
    	loginName: {
        required: true,
        maxlength: 12,
        minlength:4
      },
      password: {
        required: true,
          maxlength: 24,
          minlength:6
      }
    }
  });

    $form_users_signin.submit(function () {
        var _this = $(this);
        var formValid = _this.validate().form();
        if (formValid) {

            window.location.href="/main.jsp";
        	return;
            /*jQuery.ajax({
                dataType: "json",
                url: _this.attr("action"),
                data: _this.serialize(),
                type: "POST",
                success: function (data) {
                    if (data.code == 1) {
                    	FOXKEEPER_UTILS.alert('success',data.msg);
                    	setTimeout(function(){
                            location.replace('/main');
                        }, 1000);
                    }
                    else
                    {
                    	FOXKEEPER_UTILS.alert('warning',data.msg);
                    }
                },
                beforeSend: function () {// 设置表单提交前方法    
                    _this.find(".form_submit_handle").html('<i class=\"fa fa-spinner\"></i>&nbsp;正在登录').attr("disabled", "disabled");
                },
                complete: function () { // 设置表单提交后方法   
                    _this.find(".form_submit_handle").html('登录').removeAttr("disabled");
                }
            });
            return false;*/
        }
        return false;
    });

});
