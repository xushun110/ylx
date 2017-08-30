<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="page-container row-fluid">
    <!-- SIDEBAR - START -->
    <div class="page-sidebar ">
        <!-- MAIN MENU - START -->
        <div class="page-sidebar-wrapper" id="main-menu-wrapper">
            <!-- USER INFO - START -->
            <!-- USER INFO - END -->
            <ul class='wraplist'>
                <li class="">
                    <a href="/main.jsp">
                        <i class="fa fa-dashboard"></i>
                        <span class="title">首页</span>
                    </a>
                </li>
                <li class="">
                    <a href="javascript:;">
                        <i class="fa fa-leaf"></i>
                        <span class="title">案件管理</span><span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <a href="javascript:;">案件分类</a>
                        </li>
                        <li>
                            <a href="javascript:;">委托管理</a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="/view/legalcase/entrust/caseEntrustList.jsp">案件委托</a>
                                </li>
                                <li>
                                    <a href="/view/legalcase/entrust/docEntrustList.jsp">文书委托</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;">平台发布</a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="/view/legalcase/publish/caseEntrustList.jsp">案件委托</a>
                                </li>
                                <li>
                                    <a href="/view/legalcase/publish/docEntrustList.jsp">文书委托</a>
                                </li>
                                <li>
                                    <a href="/view/legalcase/publish/addEntrust.jsp">添加委托</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="javascript:;">
                        <i class="fa fa-leaf"></i>
                        <span class="title">商务中心</span><span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <a class="" href="javascript:;">商品管理</a>
                        </li>
                        <li>
                            <a class="" href="javascript:;">订单管理</a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="javascript:;">服务订单</a>
                                </li>
                                <li>
                                    <a href="javascript:;">预约订单</a>
                                </li>
                                <li>
                                    <a href="javascript:;">委托订单</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a class="" href="javascript:;">提现管理</a>
                        </li>
                        <li>
                            <a class="" href="javascript:;">退款管理</a>
                        </li>
                        <li>
                            <a class="" href="javascript:;">抵用券管理</a>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="javascript:;">
                        <i class="fa fa-leaf"></i>
                        <span class="title">客户中心</span><span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <a href="javascript:;">会员管理</a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="javascript:;">会员管理</a>
                                </li>
                                <li>
                                    <a href="javascript:;">交易记录</a>
                                </li>
                                <li>
                                    <a href="javascript:;">留言管理</a>
                                </li>
                                <li>
                                    <a href="javascript:;">投诉建议</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="ujavascript:;">律师管理</a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="javascript:;">律师管理</a>
                                </li>
                                <li>
                                    <a href="javascript:;">专业领域</a>
                                </li>
                                <li>
                                    <a href="javascript:;">投诉建议</a>
                                </li>
                                <li>
                                    <a href="javascript:;">收入记录</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="javascript:;">
                        <i class="fa fa-leaf"></i>
                        <span class="title">内容管理</span><span class="arrow"></span>
                    </a>
                </li>
                <li class="">
                    <a href="javascript:;">
                        <i class="fa fa-leaf"></i>
                        <span class="title">移动管理</span><span class="arrow"></span>
                    </a>
                </li>
                <li class="">
                    <a href="javascript:;">
                        <i class="fa fa-leaf"></i>
                        <span class="title">系统管理</span><span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <a href="javascript:;">基础设置</a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="javascript:;">站点设置</a>
                                </li>
                                <li>
                                    <a href="javascript:;">密码修改</a>
                                </li>
                                <li>
                                    <a href="javascript:;">支付设置</a>
                                </li>
                                <li>
                                    <a href="javascript:;">区域设置</a>
                                </li>
                                <li>
                                    <a href="javascript:;">银行编码设置</a>
                                </li>
                                <li>
                                    <a href="javascript:;">抵用券规则设置</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="javascript:;">
                        <i class="fa fa-leaf"></i>
                        <span class="title">网站管理</span><span class="arrow"></span>
                    </a>
                </li>
        </div>
        <!-- MAIN MENU - END -->
    </div>
</div>