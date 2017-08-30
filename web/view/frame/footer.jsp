<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
    $(function () {

        var _target = $("#main-menu-wrapper .wraplist li ul>li a[href='" + ___system_navigation_config.currentNav + "']");

        _target.addClass("active");
        var $menuLi = _target.parent().parent().parent();
        $menuLi.addClass('open');
        _target.parent().parent().attr("style", "display:block;");

        var $menuLiParents = $menuLi.parentsUntil("#main-menu-wrapper .wraplist");
        if($menuLiParents.length !=0){
            $menuLiParents.find('ul').attr("style", "display:block;");
            $menuLiParents.find('ul').parent().addClass('open');

            $menuLiParents.find('ul').parent().children("a").find('span:last').addClass('open');
        }
        $('#main-menu-wrapper li a').trigger("click");
    });
    
    $(document).ajaxError( function(event, jqXHR, options, errorMsg){
    	 if (jqXHR.status == 518) {
             FOXKEEPER_UTILS.alert('warning', "登录超时，稍后将跳转到登录页面");
             setTimeout(function(){
                 location.replace('/');
             }, 1000);
         } else if (jqXHR.status == 403) {
        	 location.replace('/common/forbidden');
         } else if (jqXHR.status == 404) {
             location.replace('/common/404');
         } else {
             FOXKEEPER_UTILS.alert('warning', "系统错误，请稍后再试");
             $("#btnSave").html("保存").attr("disabled", false);
         }
    });
</script>

<!-- 设置后台通知消息 -->
<%--<script type="text/javascript" src="${webBasePath}/js/plugins/timer/jquery.timers-1.1.2.js"></script>
<script type="text/javascript">
	function test(){
		jQuery.ajax({
    		dataType: "json",
    		url: '/common/findNotification',
    		data: null,
    		type: "POST",
    		success: function (result) {
    			if (result.code == 1) {
    				if (result.data != null) {
    					var data = result.data;
                    	$('#nfnRecordNum1').text(data.recordNum);
                    	$('#nfnRecordNum2').text(data.recordNum);
                    	var _html = new Array();
	                    var notificationList = data.notificationList;
	                    for (var i = 0; i < notificationList.length; i++) {
	                    	var nt = notificationList[i];
	                    	_html.push('<li class="unread away">');
	                    	_html.push('<a href="javascript:;">');
	                    	_html.push('<div class="notice-icon"><i class="fa fa-envelope"></i></div>');
	                    	_html.push('<div><a href="javascript:;" name="noticeBusUrl'+(i+1)+'" bus_id="'+nt.sysNotificationId+'" url="'+nt.noticeBusUrl+'">');
	                    	_html.push('<span class="name">');
	                    	_html.push('<strong>'+nt.noticeTitle+'</strong>');
	                    	_html.push('<span class="time small">'+nt.fromHours +' 小时以前</span></span></a></div></a></li>');
	                    	_html.push('<span class="name">');
	                    } 
	                    $('#ntnList').html(_html.join(''));
	                    bindGotoBusPage();
                  }
    			}
    		}
    	});
	}
	
	function bindGotoBusPage(){
		$('#ntnList').find('a[name^="noticeBusUrl"]').each(function(){
			var $that = $(this);
			$that.bind('click', function () {
				jQuery.ajax({
		    		dataType: "json",
		    		url: '/common/markRead',
		    		data: {'notificationId': $that.attr('bus_id')},
		    		type: "POST",
		    		success: function (result) {
		    			var reqBusUrl = $that.attr('url');
		    			if(reqBusUrl){
		    				window.location.href = reqBusUrl;
		    			}
		    			test();
		    		}
		    	});
		    });
		});  
	}
	bindGotoBusPage();
	test();
	$('body').everyTime('300s',test);--%>
</script>
