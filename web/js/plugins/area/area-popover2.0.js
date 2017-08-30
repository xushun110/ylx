


/*

create by Kenneth Yang    2014-7-27

区域选择
基于 boostrap-popover,jq,bootstrap3-typeahead-ex.js


 $("#StartAreaId").plugin_areaSelectModal({ id: "_Plugin_AreaSelectModal_Start" }, function (data) { 
        var _text = "";
        if (data.shi.id != null && data.shi.id != "") {
            if (data.xian.id != null && data.xian.id != "") {
                console.log($("#EndAreaXIAN").val());
                _text = data.sheng.text + "/" + data.shi.text + "/" + data.xian.text; 
            }
            else {
                _text = data.sheng.text + "/" + data.shi.text;
            }

            $("#StartAreaId").val(_text); 
        }

        $("#StartAreaSHENG").val(data.sheng.id);
        $("#StartAreaSHI").val(data.shi.id);
        $("#StartAreaXIAN").val(data.xian.id); 
    });
*/
(function ($) {
    $.fn.plugin_areaSelectModal = function (options, callback) {
        var _this = $(this);
        var _popContainer;
        var _rootContainer;
        var _shengContainer, _shiContainer, _xianContainer, _close;
        var defaults = {
            id: 'plugin_areaSelect',
            title: "选择区域",
            //层级，深度  1、表示只选择省，2，表示选择到市，3表示选择到县
            deep: 3,
            //必填  0、表示非必选。 1、表示省必填，2、表示省市必填，3、表示省市县必填       优先级低于deep
            required: 0,
            placement: "right",
            valueContainerId: null,
            url: "/Common/GetSubAreaSimple"
        };

        var opts = $.extend(defaults, options);
        $(this).each(function () {
            $(this).id = opts.id;
            $(this).title = opts.title;
            $(this).deep = opts.deep;
            $(this).valueContainerId = opts.valueContainerId;
            $(this).required = opts.required;
            $(this).placement = opts.placement;
        });

        var rel = {
            "sheng": {
                "id": null,
                "text": null
            },
            "shi": {
                "id": null,
                "text": null
            },
            "xian": {
                "id": null,
                "text": null
            },
            "select": {
                "id": null,
                "text": null
            }
        };


        var tab_sheng_id = 'area_select_tab_sheng' + opts.id;
        var tab_shi_id = 'area_select_tab_shi' + opts.id;
        var tab_xian_id = 'area_select_tab_xian' + opts.id;
        var tab_close_id = 'area_select_tab_close' + opts.id;

        var areas_source = window.area_popover_data;//[]
        var init_select_value;
        var render = function () {

          
            //var _html = ['<div id="', opts.id
            var _html = ['<div id="', opts.id
                , '" class="area-select-ctrl"><ul class="nav nav nav-tabs ">'
                                                      , '<li class="">'
                                                    , '    <a href="#' + tab_sheng_id + '" data-toggle="tab">'
                                                    , '         &nbsp;&nbsp;省&nbsp;&nbsp;'
                                                    , '    </a>'
                                                  , '  </li>'
                                                  , '  <li class="', (opts.deep > 1 ? "" : "hide"), '">'
                                                  , '      <a href="#' + tab_shi_id + '" data-toggle="tab"  >'
                                                  , '&nbsp;&nbsp;市&nbsp;&nbsp;'
                                                  , '      </a>'
                                                 , '   </li>'
                                                 , '   <li class="', (opts.deep > 2 ? "" : "hide"), '">'
                                                  , '      <a href="#' + tab_xian_id + '" data-toggle="tab" >'
                                                  , '&nbsp;&nbsp;县&nbsp;&nbsp;'
                                                  , '      </a>'
                                                 , '   </li>'
                                                   , '   <li class="pull-right">'
                                                  , '      <a id=' + tab_close_id + ' href="#"   style="background-color: #fff;padding: 5px 10px">'
                                                  , 'X'
                                                  , '</a>'
                                                 , '</li>'
                                               , ' </ul>'

                                               , ' <div class="tab-content ">'
                                                 , '    <div class="tab-pane fade" id="' + tab_sheng_id + '"> '
                                                 , '       <p>加载中</p>'
                                                , '     </div>'
                                                , '     <div class="tab-pane fade"  id="' + tab_shi_id + '">'
                                                  , '       <p></p>'
                                                   , '  </div>'
                                                    , ' <div class="tab-pane fade"  id="' + tab_xian_id + '">'
                                                     , '    <p></p>'
                                                     , '</div> '
                                                , ' </div></div>'

            ];



            var default_value = _this.val();


            _this.unbind('click');
            //_this.attr('autocomplete', 'off');
            //_this.on('keydown', function () {
            //    $(this).blur();
            //});


            _this.popover({
                'trigger': 'click', 'placement': opts.placement,
                /*title: opts.title,*/ container: 'body',
                //template: '<div class="popover awesome-popover-class"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
                'html': true, 'content': _html.join('')
            }).popover('show');

        };
        _this.bind("click", function (e) {

            stopDefault(e);

            render();

            stopBubble(e);
        });

        var area_typehead_data = [];//typehead数据源


        var _typehead_source = [];
        var _typehead_source2 = [];//用于匹配

        $.each(areas_source, function (index, entry) {
            //10  2  23 3  排除掉4个 直辖市
            //if ($.inArray(entry.id, [10, 2, 23, 3]) < 0) {
           // if (entry.id!=10&&entry.id!=23&&entry.id!=3&&entry.id!=2) {

                var tmpc = (entry.c.substring(0, entry.c.length - 1)).replace(',1,', '');
                area_typehead_data[entry.id] = { 'c': tmpc, 'n': entry.n, 'y': entry.y, 't': entry.t, 'fn': '' };
           // }
        });

        //console.log(JSON.stringify(area_typehead_data));

        _this.typeahead(
            {
                items: 15, minLength: 1, container: 'body', delay: 100,
                source: function (query, process) {
                    var names = [];
                    $.each(areas_source, function (index, entry) {
                        //["", "1", "6", "69", "823", ""] 
                        //if ($.inArray(entry.id, [10, 2, 23, 3])<0) {
                       // if (entry.id != 10 && entry.id != 23 && entry.id != 3 && entry.id != 2) {
                            var arr_c = area_typehead_data[entry.id].c.split(',');
                            var key = ''; 
                            $.each(arr_c, function (i, e) {
                                key += (area_typehead_data[e].n + '/');
                            });
                            key = key.substring(0, key.length - 1);

                            _typehead_source[key] = entry.id;

                            //_typehead_source2[entry.id] = key.replace(/\//g,',') +','+ entry.y;
                            _typehead_source2[entry.id] = entry.n + ',' + entry.y;

                            area_typehead_data[entry.id].fn = key;
                            names.push(key);
                       // }
                    });

                    //console.log(JSON.stringify(area_typehead_data[1]));
                    //console.log(area_typehead_data[1].c);
                    process(names);//调用处理函数，格式化

                },
                afterShown: function () {

                    rel = {
                        "sheng": {
                            "id": null,
                            "text": null
                        },
                        "shi": {
                            "id": null,
                            "text": null
                        },
                        "xian": {
                            "id": null,
                            "text": null
                        },
                        "select": {
                            "id": null,
                            "text": null
                        }
                    };
                    // console.log('show');


                    $('.popover-backdrop').trigger('click');
                },
                afterHide: function (e) {

                    var arr = $.grep(area_typehead_data, function (n, i) {

                        return n != null && n.fn == _this.val();
                    });
                    if (arr.length == 0) {
                        _this.val('');
                        $('#' + opts.valueContainerId).val('')
                    }

                },
                matcher: function (item) {
                    if ($.inArray(_typehead_source[item], [10, 2, 23, 3]) > -1)
                    {
                        return false;
                    }
                    if (area_typehead_data[_typehead_source[item]].t > opts.deep)
                    {
                        return false;
                    }
                    

                    var $this = this;
                    var tmpQ = this.query.toLowerCase();//.replace(/\s+/g, "")
                    item = _typehead_source2[_typehead_source[item]];
                    var tmpItems = item.split(',');
                    var flag = false;
                    if (tmpItems.length > 0) {
                        $.each(tmpItems, function (i, e) {
                            var it = $this.displayText(e);
                            if (it.toLowerCase().indexOf(tmpQ) == 0) {
                                flag = true;
                                return false;
                            }
                        });
                    }

                    return flag;

                    //item = _typehead_source2[_typehead_source[item]];
                    //var it = this.displayText(item); 
                    //return ~it.toLowerCase().indexOf(this.query.toLowerCase());
                },
                updater: function (item) {

                    rel = {
                        "sheng": {
                            "id": null,
                            "text": null
                        },
                        "shi": {
                            "id": null,
                            "text": null
                        },
                        "xian": {
                            "id": null,
                            "text": null
                        },
                        "select": {
                            "id": null,
                            "text": null
                        }
                    };


                    var tmpselect = area_typehead_data[_typehead_source[item]];
                    if (tmpselect.t == 1) {
                        rel.sheng = {
                            "text": tmpselect.n,
                            "id": _typehead_source[item]
                        };
                        rel.select = {
                            "text": tmpselect.n,
                            "id": _typehead_source[item]
                        };
                        callback(rel);
                    }
                    if (tmpselect.t == 2) {

                        rel.shi = {
                            "text": tmpselect.n,
                            "id": _typehead_source[item]
                        };
                        var shengid = tmpselect.c.split(',')[0];
                        rel.sheng = {
                            "text": area_typehead_data[shengid].n,
                            "id": shengid
                        };
                        rel.select = {
                            "text": tmpselect.n,
                            "id": _typehead_source[item]
                        };

                        callback(rel);
                    }
                    if (tmpselect.t == 3) {
                        rel.xian = {
                            "text": tmpselect.n,
                            "id": _typehead_source[item]
                        };
                        var shiid = tmpselect.c.split(',')[1];
                        rel.shi = {
                            "text": area_typehead_data[shiid].n,
                            "id": shiid
                        };
                        var shengid = tmpselect.c.split(',')[0];
                        rel.sheng = {
                            "text": area_typehead_data[shengid].n,
                            "id": shengid
                        };
                        rel.select = {
                            "text": tmpselect.n,
                            "id": _typehead_source[item]
                        };

                        callback(rel);
                    }


                    var _text = "";
                    if (rel.sheng.id != null && rel.sheng.id != "") {
                        if (rel.shi.id != null && rel.shi.id != "") {
                            if (rel.xian.id != null && rel.xian.id != "") {
                                _text = rel.sheng.text + "/" + rel.shi.text + "/" + rel.xian.text;
                            }
                            else {
                                _text = rel.sheng.text + "/" + rel.shi.text;
                            }
                        }
                        else {
                            _text = rel.sheng.text;
                        }

                    }

                    return _text;
                    //return item.substring(0, item.indexOf(' _ '));
                }
            });


        _this.on('shown.bs.popover', function () {
            _this.select();
            $(document.body).append('<div class="modal-backdrop popover-backdrop" style="width:100%;height:100%;background-color:#e1e1e1;filter: alpha(opacity=10);opacity: .1;z-index: 1059;"></div>');

            // $('[data-popver-open]').trigger('click');
            // _this.attr("data-popver-open", "1");

            _rootContainer = $('#' + opts.id);

            _popContainer = _rootContainer.parents('popover').first();

            _shengContainer = $('#' + tab_sheng_id);
            _shiContainer = $('#' + tab_shi_id);
            _xianContainer = $('#' + tab_xian_id);
            _close = $('#' + tab_close_id);


            //if (opts.deep == 1) {
            //    $('a[href="#' + tab_xian_id + '"]').hide();
            //    $('a[href="#' + tab_shi_id + '"]').hide();
            //}
            //if (opts.deep == 2) {
            //    $('a[href="#' + tab_xian_id + '"]').hide();
            //    //$('a[href="#' + tab_shi_id + '"]').hide();
            //}

            addEvent();
            initDefaultValue();
        });

        _this.on('hide.bs.popover', function () {

            var sid = null, stext = null;
            if (rel.xian.id != null) {

                rel.select.id = rel.xian.id;
                rel.select.text = rel.xian.text;
            }
            else {
                if (rel.shi.id != null) {

                    rel.select.id = rel.shi.id;
                    rel.select.text = rel.shi.text;
                }
                else {
                    if (rel.sheng.id != null) {

                        rel.select.id = rel.sheng.id;
                        rel.select.text = rel.sheng.text;
                    }
                    else {
                        rel.select.id = null;
                        rel.select.text = '';
                    }
                }
            }

            $('.popover-backdrop').remove();

            //alert();
            callback(rel);
        })


        var initDefaultValue = function () {
            createEle(1, _shengContainer);
            if (opts.valueContainerId != null) {
                init_select_value = $('#' + opts.valueContainerId).val();
            }
            if (init_select_value == null || init_select_value == '' || init_select_value == 0 || isNaN(init_select_value)) {

                $('a[href="#' + tab_sheng_id + '"]').tab('show');
            }
            else {
                var tmpShengId, tmpShiId, tmpXianId;
                jQuery.each(areas_source, function (entryIndex, entry) {
                    if (entry.id == init_select_value) {

                        if (entry.t == 1)//类型是 省 
                        {
                            $('a[href="#' + tab_sheng_id + '"]').tab('show');

                            tmpShengId = init_select_value;
                            var shengA = _shengContainer.find('[data-value="' + tmpShengId + '"]');
                            shengA.addClass("current");
                            //shengA.trigger('click');

                            createEle(tmpShengId, _shiContainer);

                            rel.sheng.id = tmpShengId;
                            rel.sheng.text = shengA.text();

                            rel.shi.id = null;
                            rel.shi.text = '';

                            rel.xian.id = null;
                            rel.xian.text = '';

                            return false;
                        }
                        else if (entry.t == 2)//类型是 市
                        {
                            var tmppid = entry.c.split(',');
                            var pid = tmppid[tmppid.length - 3];
                            tmpShengId = pid;
                            tmpShiId = init_select_value;

                            //$('a[href="#' + tab_shi_id + '"]').trigger('click');
                            $('a[href="#' + tab_shi_id + '"]').tab('show');
                            createEle(1, _shengContainer);


                            var shengA = _shengContainer.find('[data-value="' + tmpShengId + '"]');
                            shengA.addClass("current");
                            createEle(tmpShengId, _shiContainer);
                            //shengA.trigger('click');
                            var shiA = _shiContainer.find('[data-value="' + tmpShiId + '"]');
                            shiA.addClass("current");
                            //shiA.trigger('click');

                            createEle(tmpShiId, _xianContainer);

                            rel.sheng.id = tmpShengId;
                            rel.sheng.text = shengA.text();

                            rel.shi.id = tmpShiId;
                            rel.shi.text = shiA.text();

                            rel.xian.id = null;
                            rel.xian.text = '';


                            return false;
                        }
                        else if (entry.t == 3) {

                            var tmppid = entry.c.split(',');
                            var pid = tmppid[tmppid.length - 3];


                            tmpShengId = tmppid[tmppid.length - 4];
                            tmpShiId = tmppid[tmppid.length - 3];
                            tmpXianId = init_select_value;

                            $('a[href="#' + tab_xian_id + '"]').tab('show');
                            createEle(1, _shengContainer);

                            var shengA = _shengContainer.find('[data-value="' + tmpShengId + '"]');
                            shengA.addClass("current");
                            createEle(tmpShengId, _shiContainer);



                            //shengA.trigger('click');
                            var shiA = _shiContainer.find('[data-value="' + tmpShiId + '"]');
                            shiA.addClass("current");
                            createEle(tmpShiId, _xianContainer);

                            //shiA.trigger('click');
                            var xianA = _xianContainer.find('[data-value="' + tmpXianId + '"]');
                            xianA.addClass("current");
                            //shiA.trigger('click');


                            rel.sheng.id = tmpShengId;
                            rel.sheng.text = shengA.text();

                            rel.shi.id = tmpShiId;
                            rel.shi.text = shiA.text();

                            rel.xian.id = tmpXianId;
                            rel.xian.text = xianA.text();


                            return false;
                        } else {
                            return false;
                        }
                    }
                });
            }

        };


        function createEle(_parentID, _container) {
            var _html2 = ['<ul class="list-inline">'];
            jQuery.each(areas_source, function (entryIndex, entry) {
                var tmppid = entry.c.split(',');
                var pid = tmppid[tmppid.length - 3];

                if (pid == _parentID) {
                    _html2.push('<li><a  href="javascript:;" data-value="' + entry.id + '">' + entry.n + '</a> </li>');
                }
            });
            _html2.push('</ul>');
            _container.html(_html2.join(' '));
        }

        var addEvent = function () {

            $('.popover-backdrop').off('click').on('click', function (e) {
                $('.popover-backdrop').unbind('click');
                // stopBubble(e);
                tmpCallback();
            });

            _close.on('click', function (e) {
                e.preventDefault();
                tmpCallback();
            });

            _shengContainer.on("click", function (e) {
                var _parentID = $(e.target).attr("data-value");
                $(this).find("a").removeClass("current");
                $(e.target).addClass("current");

                if (_parentID != null) {

                    $('a[href="#' + tab_shi_id + '"]').trigger('click');

                    var _text = $(e.target).text();

                    rel.sheng.id = _parentID;
                    rel.sheng.text = _text;

                    rel.shi.id = null;
                    rel.shi.text = '';

                    rel.xian.id = null;
                    rel.xian.text = '';


                    if (opts.deep == 1) {
                        tmpCallback();
                        return false;
                    }

                    createEle(_parentID, _shiContainer);
                }
            });
            _shiContainer.on("click", function (e) {

                var _parentID = $(e.target).attr("data-value");

                $(this).find("a").removeClass("current");
                $(e.target).addClass("current");


                if (_parentID != null) {
                    $('a[href="#' + tab_xian_id + '"]').trigger('click');

                    var _text = $(e.target).text();

                    rel.shi.id = _parentID;
                    rel.shi.text = _text;

                    rel.xian.id = null;
                    rel.xian.text = '';


                    if (opts.deep == 2) {
                        tmpCallback();
                        return false;
                    }

                    createEle(_parentID, _xianContainer);

                }
                else {
                    tmpCallback();
                    return false;
                }
            });

            _xianContainer.on("click", function (e) {

                $(this).find("a").removeClass("current");
                $(e.target).addClass("current");

                var _parentID = $(e.target).attr("data-value");
                var _text = $(e.target).text();


                rel.xian.id = _parentID;
                rel.xian.text = _text;

                tmpCallback();
            });
        };

        var destroy = function () {
            _this.trigger('click');

            //_this.popover('destroy');
            //_rootContainer = null;
        };

        var tmpCallback = function () {
            destroy();
        };
    };



    //判断:当前元素是否是被筛选元素的子元素
    jQuery.fn.isChildOf = function (b) {
        return (this.parents(b).length > 0);
    };
    //判断:当前元素是否是被筛选元素的子元素或者本身
    jQuery.fn.isChildAndSelfOf = function (b) {
        return (this.closest(b).length > 0);
    };

    function stopDefault(e) {
        //阻止默认浏览器动作(W3C)
        if (e && e.preventDefault)
            e.preventDefault();
            //IE中阻止函数器默认动作的方式
        else
            window.event.returnValue = false;
        return false;
    }

    function stopBubble(e) {
        //如果提供了事件对象，则这是一个非IE浏览器  
        if (e && e.stopPropagation) {
            //因此它支持W3C的stopPropagation()方法  
            e.stopPropagation();
        } else {
            //否则，我们需要使用IE的方式来取消事件冒泡   
            window.event.cancelBubble = true;
        }
        return false;
    }
})(jQuery);

