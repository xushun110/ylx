<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<head>
    <%@ include file="/view/frame/head.jsp"%>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->

<body class="">
    <div class="row">
        <div class="col-xs-12">
            <div id="page_alert_container">
                <c:if test="${not empty SPRING_SECURITY_LAST_EXCEPTION.message }">
                    <div class="alert alert-warning alert-dismissible fade in">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <strong>警告:</strong>${SPRING_SECURITY_LAST_EXCEPTION.message}</div>
                </c:if>
            </div>

            <div class="row">
                <div class="col-xs-4 col-xs-offset-4">
                    <section class="box sign-box" style="margin-top: 80px;">
                        <header class="panel_header" style="background-color: #f1f2f7;border: 0px;border-bottom:0px;">
                            <div style="width: 100%;">
                                <img src="../images/logo/login-logo.png" style="max-width:100%;height:auto;">
                            </div>
                            <div style="width: 100%;text-align: center;margin-top: 50px;">
                                <h4 class="" style="">后台管理系统</h4>
                            </div>
                        </header>
                        <div class="content-body" style="background-color: #f1f2f7;padding: 10px;border: 0px;padding-top: 1px;">
                            <div class="row">
                                <div class="col-xs-12">
                                    <form action="../main.jsp" method="post" role="form" id="form_users_signin">
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="loginName" name="loginName" placeholder="请输入用户名">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" id="loginPassword" name="loginPassword" placeholder="请输入密码">
                                        </div>
                                        <div class="form-group ">
                                            <button type="submit" class="btn btn-success form_submit_handle" style="width: 100%">登录</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/js/__base.min.js"></script>
    <script type="text/javascript" src="/js/pageScripts/login.js"></script>
</body>

</html>
