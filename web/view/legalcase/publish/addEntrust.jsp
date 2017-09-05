<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<head>
    <%@ include file="/view/frame/head.jsp"%>
    <script type="text/javascript" charset="utf-8" src="${webBasePath}/js/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="${webBasePath}/js/ueditor/ueditor.all.js"></script>

    <style type="text/css">

        .move40{
            margin-right: -60px;
        }
        .dropdown-menu {
            min-width: 100px;
            width: 90px;
        }
        a:hover {
            text-decoration: none;
        }
        .divider-dotted{
            width: 100%;border:1px dashed #e8e8e8
        }

        .img-upload .img-upload-file{
            width: 135px;
            height: 35px;
            cursor: pointer;
            font-size: 23px;
            outline: medium none;
            position: absolute;
            filter:alpha(opacity=0);
            -moz-opacity:0;
            opacity:0;
            left:0px;
            top: 0px;
            padding: 7px 18px;
        }
    </style>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class=" boxed">
<!-- START TOPBAR -->
<%@ include file="/view/frame/topbar.jsp"%>
<!-- END TOPBAR -->
<!-- START SIDEBAR -->
<%@ include file="/view/frame/sidebar.jsp"%>
<!--  SIDEBAR - END -->
<script type='text/javascript'>
    ___system_navigation_config.currentNav = ___system_navigation_config.nav.p_entrust_add;
</script>
<!-- START CONTENT -->
<section id="main-content" class=" " style="">
    <section class="wrapper" style='margin-top:0px;display:inline-block;width:100%;padding:15px 0 0 0;'>
        <header class="panel_header" style="background-color: #fff;margin-top:45px;">
            <h4 class="title pull-left" style="font-size: 15px;">案件管理 / 平台发布 / 添加委托</h4>
        </header>

        <div class="col-xs-12">
            <section class="box ">
                <header class="panel_header">
                    <h2 class="title pull-left">添加委托</h2>
                    <div class="actions panel_actions pull-right">
                    </div>
                </header>
                <div class="content-body">
                    <div class="dataTables_wrapper no-footer">
                        <form class="form-horizontal" id="form_query" action="#" method="post" novalidate="novalidate">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">委托名称</label>
                                        <div class="col-xs-5">
                                            <input type="text" class="form-control" placeholder="请输入委托名称" value="" name=""
                                                   maxlength="20" id="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">委托类型</label>
                                        <div class="col-xs-5">
                                            <select class="form-control" id="entrustType" name="entrustType" style="border-color: #e1e1e1;">
                                                <option value="1" selected>平台案件委托</option>
                                                <option value="2">平台文书委托</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">委托人</label>
                                        <div class="col-xs-5">
                                            <input type="text" class="form-control" placeholder="请输入委托人" value="" name=""
                                                   maxlength="20">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">联系方式</label>
                                        <div class="col-xs-5">
                                            <input type="text" class="form-control" placeholder="请输入联系方式" value="" name=""
                                                   maxlength="20">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">委托时间</label>
                                        <div class="col-xs-5">
                                            <input type="text" class="form-control" placeholder="请输入委托时间" value="" name=""
                                                   maxlength="20">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">案件标的(元)</label>
                                        <div class="col-xs-5">
                                            <input type="text" class="form-control" placeholder="请输入案件标的" value="" name=""
                                                   maxlength="20">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">代理费用(元)</label>
                                        <div class="col-xs-5">
                                            <input type="text" class="form-control" placeholder="请输入代理费用" value="" name=""
                                                   maxlength="20">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">图片</label>
                                        <div class="col-xs-5" style="margin-left: -15px;">
                                            <div class="col-xs-1">
                                                <div class="img-upload">
                                                    <input type="hidden" id="coverUrl" value="" name="coverUrl"/>
                                                    <img src="/images/nopica.png" class="img-thumbnail" id="coverImage" width="200px" style="display: none;"/>
                                                    <button id="btnSearch" type="button" class="btn btn-primary">点击添加或修改</button>
                                                    <input type="file" class="img-upload-file" id="lcimage_upload" name="lcimage_upload" mid="coverImage" uid="coverUrl">
                                                </div>
                                                <div>
                                                    <%--<img src="/images/nopica.png" class="" width="200px"/>--%>
                                                    <%--<div class="progress hide" id="lcimage_upload_progress">
                                                        <div class="progress-bar progre4ss-bar-striped active" role="progressbar" aria-valuenow="80"
                                                             aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                                                            <span class="sr-only">80% ...</span>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="form-label" for="lcimage_upload">封面大图</label>
                                                        <span class="desc">格式仅支持. ".jpg,.png, 大小不能超过100k"&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;">*必填</span></span>

                                                        <div class="controls">
                                                            <input type="hidden" id="coverUrl" value="" name="coverUrl"/>
                                                            <img src="/images/nopica.png" class="img-thumbnail" id="coverImage" width="200px"/>
                                                            <input type="file" value="" id="lcimage_upload" name="lcimage_upload" mid="coverImage" uid="coverUrl" />
                                                        </div>
                                                    </div>--%>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">需求详情</label>
                                        <div class="col-xs-9">
                                            <script id="editor" type="text/plain"></script>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="divider-dotted"></div>
                            <br>

                            <div class="clearfix"></div>
                            <div class="row">
                                <div class="col-xs-3">
                                </div>
                                <div class="col-xs-5">
                                    <div class="form-group">
                                        <div class="controls">
                                            <button type="button" class="btn btn-info" id="btnSave">保存</button>&nbsp;&nbsp;
                                            <button type="button" class="btn btn-info" id="btnSaveAndPub">保存且发布</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </section>

</section>
<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->

<script type="text/javascript" src="/js/__base.min.js"></script>
<script type="text/javascript" src="/js/pageScripts/legalcase/publish/add_entrust.js"></script>
<!-- START FOOTER -->
<%@ include file="/view/frame/footer.jsp"%>
<!--  FOOTER - END -->
</body>

</html>

