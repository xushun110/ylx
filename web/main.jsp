<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<head>
    <%@ include file="/view/frame/head.jsp"%>

	<style type="text/css">
		.bus-md-fa{
			padding: 25px 0 0 0;
		}
		.bus-md-title{
			padding: 10px 0 0 0;
		}
		.bus-md{
			background-color: #fff;
			height: 150px;
			width: 15%;
			text-align: center;
			margin: 8px;
			float: left;
		}
		.bus-tab{
			width: 100%;
		}
		.menu-lb{
			width: 100%;
		}
		.menu-lb div{
			border: 1px solid #e8e8e8;
			background-color: #fff;
			padding-left: 15px;
			margin: 15px 13px 0px 6px;
		}
		.menu-lb div h4{
			font-size: 15px;
			line-height: 30px;
			color: #676767;
		}
		.m-chart{
			height: 220px;
			background-color: #fff;
			margin-left: 7px;
			margin-right: 14px;
			text-align: center;
		}
		.m-chart .left{
			height: 100%;
			float: left;
			width: 37%;
			border-right: 2px dashed #e1e1e8;
			padding: 15px;
		}
		.m-chart .right{
			height: 100%;
			float: left;
			width: 63%;
			padding: 15px;
		}
		.m-chart .left .clz{
			margin-bottom: 25px;
		}
		.m-chart .right .clz{
			margin-bottom: 25px;
		}

		.m-chart .lb{
			padding: 0;margin: 0;height: 30px;
		}
		.m-chart .lb h5{
			display: inline-block;
		}
		/*.page-topbar .dropdown-menu:after, .page-topbar .dropdown-menu:before{
			right: 22px;
		}
*/

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
<!-- START CONTENT -->
<section id="main-content" class=" " style="">
    <section class="wrapper" style='margin-top:0px;display:inline-block;width:100%;padding:15px 0 0 0;'>
		<header class="panel_header" style="background-color: #fff;margin-top:45px;">
			<h4 class="title pull-left" style="font-size: 15px;">首页</h4>
		</header>

		<%--<div class="col-xs-12">--%>
			<%--<section class="box">--%>
				<div class="" style="padding-left: 15px;">
					<div class="">
						<div class="bus-tab">
							<div class="bus-md">
								<div class="bus-md-fa">
									<i class="fa fa-users icon-xlg icon-info"></i>
								</div>
								<div class="bus-md-title">
									<span>会员管理</span>
								</div>
							</div>
							<div class="bus-md">
								<div class="bus-md-fa">
									<i class="fa fa-users icon-xlg icon-info"></i>
								</div>
								<div class="bus-md-title">
									<span>律师管理</span>
								</div>
							</div>
							<div class="bus-md">
								<div class="bus-md-fa">
									<i class="fa fa-database icon-xlg icon-info"></i>
								</div>
								<div class="bus-md-title">
									<span>服务订单</span>
								</div>
							</div>
							<div class="bus-md">
								<div class="bus-md-fa">
									<i class="fa fa-database icon-xlg icon-info"></i>
								</div>
								<div class="bus-md-title">
									<span>预约订单</span>
								</div>
							</div>
							<div class="bus-md">
								<div class="bus-md-fa">
									<i class="fa fa-database icon-xlg icon-info"></i>
								</div>
								<div class="bus-md-title">
									<span>委托订单</span>
								</div>
							</div>
							<div class="bus-md">
								<div class="bus-md-fa">
									<i class="fa fa-gear icon-xlg icon-info"></i>
								</div>
								<div class="bus-md-title">
									<span>站点设置</span>
								</div>
							</div>
						</div>
					</div>

					<div class="clearfix"></div>

					<div class="menu-lb">
						<div>
							<h4><strong>会员信息</strong></h4>
						</div>
					</div>

					<div class="m-chart">
						<div class="left">
							<div class="clz">
								新增会员
							</div>
							<div class="clz">
								昨日<span style="color:#ff8500;font-size: 30px;padding: 0 5px;">0</span>人
							</div>
							<div>
								<div class="col-xs-6 invoice-infoblock pull-left" style="text-align: right">
									<div class="lb"><h5 class="">上周:</h5>&nbsp;<h5 class="text-primary">10000</h5>人</div>
									<div class="lb"><h5 class="">上月:</h5>&nbsp;<h5 class="text-primary">10000</h5>人</div>
								</div>
								<div class="col-xs-6 invoice-infoblock text-right" style="text-align: right">
									<div class="lb"><h5 class="">前3个月:</h5>&nbsp;<h5 class="text-primary">10000</h5>人</div>
									<div class="lb"><h5 class="">前12个月:</h5>&nbsp;<h5 class="text-primary">10000</h5>人</div>
								</div>
							</div>
						</div>

						<div class="right">
								<div style="width: 60%;float: left;">
									<div class="clz">
										消费金额
									</div>
									<div class="clz">
										昨日<span style="color:#ff8500;font-size: 30px;padding: 0 5px;">0</span>元
									</div>
									<div>
										<div class="col-xs-6 invoice-infoblock pull-left" style="text-align: right;">
											<div class="lb"><h5>上周:</h5>&nbsp;<h5 class="text-primary">10000</h5>元</div>
											<div class="lb"><h5>上月:</h5>&nbsp;<h5 class="text-primary">10000</h5>元</div>
										</div>
										<div class="col-xs-6 invoice-infoblock text-right" style="text-align: right;">
											<div class="lb"><h5>前3个月:</h5>&nbsp;<h5 class="text-primary">10000</h5>元</div>
											<div class="lb"><h5>前12个月:</h5>&nbsp;<h5 class="text-primary">10000</h5>元</div>
										</div>
									</div>
								</div>
								<div style="width: 40%;float: left;"></div>
						</div>
					</div>
					<%--<div class="clearfix"></div>--%>
				</div>
			<%--</section>--%>
		<%--</div>--%>
    </section>

</section>
<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->

<script type="text/javascript" src="/js/__base.min.js"></script>
<!-- START FOOTER -->
<%@ include file="/view/frame/footer.jsp"%>
<!--  FOOTER - END -->
</body>

</html>
