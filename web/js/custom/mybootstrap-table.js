/**
 * Created by 1 on 2015/9/7.
 */

(function($){
    function MyBootstrapTable(){
        //注册一个Handlebars Helper,用来将索引+1，因为默认是从0开始的
        Handlebars.registerHelper("addOne",function(index,options){
            return parseInt(index)+1;
        });
    }
    MyBootstrapTable.prototype.initPaginator = function(opts,result,myBootstrapTable,$table){

        $('#'+opts.paginator).bootstrapPaginator({
            currentPage:result.currentPage,
            totalPages:result.totalPages,
            numberOfPages:5,
            bootstrapMajorVersion: 3,
            pageUrl: function (type, page, current) {
                return "javascript:;";
            },
            itemTexts: function(type, page, current) { //修改显示文字
                switch (type) {
                    case "first":
                        return "第一页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "最后一页";
                    case "page":
                        return page;
                }
            },
            onPageClicked: function (e, originalEvent, type, page) {
                opts.currentPage=page;
                myBootstrapTable.getData(opts,function(data){
                    var template = Handlebars.compile($("#"+opts.templateId).html());
                    var _html = template(data.data);
                    $table.find('tbody').html(_html);
                    if(data){
                        $('#'+opts.page_text).text('共 '+data.totalPages+' 页 '+data.totalItem+' 条记录，当前为第 '+data.currentPage+' 页');
                    }
                })

            }
        });

        $('#'+opts.page_text).text('共 '+result.totalPages+' 页 '+result.totalItem+' 条记录，当前为第 '+result.currentPage+' 页');

    }

    MyBootstrapTable.prototype.getData=function(opts,callback){
        opts.queryParams.currentPage=opts.currentPage,
            opts.queryParams.pageSize=opts.pageSize,
            jQuery.ajax({
                dataType: "json",
                url: opts.url,
                data: opts.queryParams,
                type: "POST",
                success: function (result) {
                    if (result.code == 1) {
                        callback(result.data);

                    }else{
                      console.log('后台系统异常');
                    }
                },
                beforeSend: function () {

                },
                complete: function () {

                }
            });

    }
    MyBootstrapTable.prototype.rendTable=function(opts,$table,data){
        var template = Handlebars.compile($("#"+opts.templateId).html());
        var _html = template(data.data);
        $table.find('tbody').html(_html);
    }

    $.fn.myBootstrapTable = function(options){
        $.fn.myBootstrapTable.defaults = {
            url:'',
            paginatorId:'paginator',// <ul id="paginator"></ul>
            templateId:'table-template',//模板id
            currentPage:1,
            pageSize:10,
            queryParams:{},
            btnId:'query',
            getParams:null,
            not_item:'not_item',
            page_text:'page_text'
        };
        var opts = $.extend({},$.fn.myBootstrapTable.defaults,options);
        return this.each(function(){
            var $this = $(this);
            var myBootstrapTable = new MyBootstrapTable();
            myBootstrapTable.getData(opts,function(result){
                if(result.data.length>0){
                    $('#'+opts.paginatorId).show();
                    $('#'+opts.page_text).show();
                    $('#'+opts.not_item).hide();
                    myBootstrapTable.initPaginator(opts,result,myBootstrapTable,$this);
                    myBootstrapTable.rendTable(opts,$this,result);
                }else{
                    $('#'+opts.paginatorId).hide();
                    $('#'+opts.page_text).hide();
                    //$this.find('tbody').html(opts.emptyHtml);
                    $('#'+opts.not_item).show();

                }


            });
            $('#'+opts.btnId).click(function(){
                opts.currentPage = 1;
                if(opts.getParams){
                    var p = opts.getParams();
                    for(var key in p){
                        opts.queryParams[key] = p[key];
                    }
                }
                myBootstrapTable.getData(opts,function(result){
                    if(result.data.length>0){
                        $('#'+opts.paginatorId).show();
                        $('#'+opts.page_text).show();
                        $('#'+opts.not_item).hide();
                        myBootstrapTable.initPaginator(opts,result,myBootstrapTable,$this);
                        myBootstrapTable.rendTable(opts,$this,result);
                    }else{
                        $('#'+opts.paginatorId).hide();
                        $('#'+opts.page_text).hide();
                        $this.find('tbody').html('');
                        $('#'+opts.not_item).show();
                    }
                });
            });

        });
    }
})(window.jQuery);
