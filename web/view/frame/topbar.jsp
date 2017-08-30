<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class='page-topbar'  style="background-color: #f1f4f5;">
    <div class='logo-area'>
    </div>
    <div class='quick-area'>
        <div class='pull-left'>
            <ul class="info-menu left-links list-inline list-unstyled" style="padding-right: 0px;">
                <li class="">
                    <a href="#" data-toggle="sidebar" class="sidebar_toggle">
                        <i class="fa fa-bars"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class='pull-left'>
            <ul class="info-menu left-links list-inline list-unstyled" style="padding-left:0px;">
                <li class="">
                    <span style="text-align: center;font-size: 14px;color: #96969E;"><strong>欢迎使用后台管理系统</strong></span>
                </li>
            </ul>
        </div>
        <div class='pull-right'>
            <ul class="info-menu right-links list-inline list-unstyled">
                <li class="">
                    <a href="#" data-toggle="dropdown" class="toggle">
                        <i class="fa fa-bell"></i>
                        <span class="badge badge-orange" id="nfnRecordNum1">4</span>
                    </a>
                    <ul class="dropdown-menu notifications animated fadeIn">
                        <li class="total">
                            <span class="small">
                                	你有  <strong id="nfnRecordNum2">4</strong> 个业务消息, 请及时查看办理.
                                <!-- <a href="javascript:;" class="pull-right">Mark all as Read</a> -->
                            </span>
                        </li>

                        <li class="list ps-container">
                            <ul class="dropdown-menu-list list-unstyled ps-scrollbar" id="ntnList">
                                <li class="unread away"> <!-- available: success, warning, info, error -->
                                    <a href="javascript:;">
                                        <div class="notice-icon">
                                            <i class="fa fa-envelope"></i>
                                        </div>
                                        <div>
                                            <a href="javascript:;" bus_id="11" name="noticeBusUrl${s['index']+1}" url="#}">
                                        	<span class="name">
                                                <strong>1111111111111111</strong>
                                                <span class="time small">1 小时以前</span>
                                            </span>
                                            </a>
                                        </div>
                                    </a>
                                </li>
                                <li class="unread away"> <!-- available: success, warning, info, error -->
                                    <a href="javascript:;">
                                        <div class="notice-icon">
                                            <i class="fa fa-envelope"></i>
                                        </div>
                                        <div>
                                            <a href="javascript:;" bus_id="22" name="noticeBusUrl${s['index']+1}" url="#">
                                        	<span class="name">
                                                <strong>2222222222222222</strong>
                                                <span class="time small">22 小时以前</span>
                                            </span>
                                            </a>
                                        </div>
                                    </a>
                                </li>
                                <li class="unread away"> <!-- available: success, warning, info, error -->
                                    <a href="javascript:;">
                                        <div class="notice-icon">
                                            <i class="fa fa-envelope"></i>
                                        </div>
                                        <div>
                                            <a href="javascript:;" bus_id="22" name="noticeBusUrl${s['index']+1}" url="#">
                                        	<span class="name">
                                                <strong>2222222222222222</strong>
                                                <span class="time small">22 小时以前</span>
                                            </span>
                                            </a>
                                        </div>
                                    </a>
                                </li>
                                <li class="unread away"> <!-- available: success, warning, info, error -->
                                    <a href="javascript:;">
                                        <div class="notice-icon">
                                            <i class="fa fa-envelope"></i>
                                        </div>
                                        <div>
                                            <a href="javascript:;" bus_id="22" name="noticeBusUrl${s['index']+1}" url="#">
                                        	<span class="name">
                                                <strong>3333333333333333</strong>
                                                <span class="time small">22 小时以前</span>
                                            </span>
                                            </a>
                                        </div>
                                    </a>
                                </li>
                                <li class="unread away"> <!-- available: success, warning, info, error -->
                                    <a href="javascript:;">
                                        <div class="notice-icon">
                                            <i class="fa fa-envelope"></i>
                                        </div>
                                        <div>
                                            <a href="javascript:;" bus_id="22" name="noticeBusUrl${s['index']+1}" url="#">
                                        	<span class="name">
                                                <strong>444444444444444444</strong>
                                                <span class="time small">22 小时以前</span>
                                            </span>
                                            </a>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 3px;"><div class="ps-scrollbar-x" style="left: 0px; width: 0px;"></div></div><div class="ps-scrollbar-y-rail" style="top: 0px; right: 3px;"><div class="ps-scrollbar-y" style="top: 0px; height: 0px;">
                        </div>
                        </div>
                        </li>

                        <li class="external">
                            <a href="javascript:;">
                                <span>未读消息通知</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="profile">
                    <a href="javascript:;" data-toggle="dropdown" class="toggle">
                        <span>你好，王麻子<i class="fa fa-angle-down"></i></span>
                    </a>
                    <ul class="dropdown-menu profile animated fadeIn">
                        <li class="hidden">
                            <a href="#settings">
                                <i class="fa fa-cog"></i> 设置
                            </a>
                        </li>
                        <li>
                            <a href="/admin/goUpdatePwd">
                                <i class="fa fa-key"></i> 修改密码
                            </a>
                        </li>
                        <li class="hidden">
                            <a href="#help">
                                <i class="fa fa-info"></i> 帮助
                            </a>
                        </li>
                        <li class="last">
                            <a href="/logout">
                                <i class="fa fa-sign-out"></i> 注销
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="/logout">
                        <i class="fa fa-sign-out"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
