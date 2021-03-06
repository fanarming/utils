/*
 Ajax 三级省市联动
 http://code.ciaoca.cn/
 日期：2012-7-18
 
 settings 参数说明
 -----
 url:省市数据josn文件路径
 prov:默认省份
 city:默认城市
 dist:默认地区（县）
 nodata:无数据状态
 required:必选项
 ------------------------------ */
(function($) {
    $.fn.citySelect = function(settings) {
        if (this.length < 1) {
            return;
        }
        ;

        // 默认值
        settings = $.extend({
            url: $.CHINESE_CITIES(),
            prov: null,
            city: null,
            dist: null,
            manager: null,
            nodata: null,
            required: true
        }, settings);

        var box_obj = this;
        var prov_obj = box_obj.find(".prov");
        var city_obj = box_obj.find(".city");
        var dist_obj = box_obj.find(".dist");
        var manager_obj = box_obj.find(".manager");
        var prov_val = settings.prov;
        var city_val = settings.city;
        var dist_val = settings.dist;
        var manager_val = settings.manager;
        var select_prehtml = (settings.required) ? "" : "<option value=''>请选择</option>";
        var city_json;

        // 赋值市级函数
        var cityStart = function(city) {
            var prov_id = prov_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
            }
            ;
            city_obj.empty().attr("disabled", true);
            dist_obj.empty().attr("disabled", true);
            manager_obj.empty().attr("disabled", true);

            if (prov_id < 0 || typeof (city_json.citylist[prov_id].c) == "undefined") {
                if (settings.nodata == "none") {
                    city_obj.css("display", "none");
                    dist_obj.css("display", "none");
                    manager_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    city_obj.css("visibility", "hidden");
                    dist_obj.css("visibility", "hidden");
                    manager_obj.css("visibility", "hidden");
                }
                ;

                return;
            }
            ;

            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist[prov_id].c, function(i, city) {
                temp_html += "<option value='" + city.n + "'>" + city.n + "</option>";
            });
            city_obj.html(temp_html).attr("disabled", false).css({"display": "", "visibility": ""});
            distStart(city);
        };

        // 赋值地区（县）函数
        var distStart = function(distr) {
            var prov_id = prov_obj.get(0).selectedIndex;
            var city_id = city_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
                city_id--;
            }
            ;
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || city_id < 0 || typeof (city_json.citylist[prov_id].c[city_id].a) == "undefined") {
                if (settings.nodata == "none") {
                    //dist_obj.css("display", "none");
                    dist_obj.css("disabled", true);
                } else if (settings.nodata == "hidden") {
                    dist_obj.css("visibility", "hidden");
                }
                ;               

                //managerStart(distr);

                return;
            }
            ;

            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist[prov_id].c[city_id].a, function(i, dist) {
                temp_html += "<option value='" + dist.s + "'>" + dist.s + "</option>";
            });
            dist_obj.html(temp_html).attr("disabled", false).css({"display": "", "visibility": ""});
            managerStart(distr);
        };

        // 赋值地区（县）分管人员函数
        var managerStart = function(distr) {
            var prov_id = prov_obj.get(0).selectedIndex;
            var city_id = city_obj.get(0).selectedIndex;
            /*var manager_id = manager_obj.get(0).selectedIndex;*/
            var flag = true;
            if (!settings.required) {
                prov_id--;
                city_id--;
                /*manager_id--;*/
            }
            ;
            manager_obj.empty().attr("disabled", true);

            if (prov_id < 0 || city_id < 0 || typeof (city_json.citylist[prov_id].c[city_id].a) == "undefined") {
                if (settings.nodata == "none") {
                    //manager_obj.css("display", "none");
                    manager_obj.css("disabled", true);
                } else if (settings.nodata == "hidden") {
                    manager_obj.css("visibility", "hidden");
                }
                ;

                flag = false;
                //return;
            }
            ;

            // 遍历赋值分管人员下拉列表
            temp_html = select_prehtml;

            if(flag) {
                $.each(city_json.citylist[prov_id].c[city_id].a, function(i, manager) {
                    if(distr==manager.s) { 
                        $.map(manager.m,function(item,j){
                            temp_html += "<option value='" + item.name + "'>" + item.name + "</option>";
                        })   
                    }             
                });
            } else {

                $.each(city_json.citylist[prov_id].c, function(i, manager) {                   
                    if(distr==manager.n) { 
                        $.map(manager.m,function(item,j){
                            temp_html += "<option value='" + item.name + "'>" + item.name + "</option>";
                        })   
                    }             
                });
            }
            
            manager_obj.html(temp_html).attr("disabled", false).css({"display": "", "visibility": ""});
        };

        var init = function() {
            // 遍历赋值省份下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist, function(i, prov) {
                temp_html += "<option value='" + prov.p + "'>" + prov.p + "</option>";
            });
            prov_obj.html(temp_html);

            // 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
            setTimeout(function() {
                if (settings.prov != null) {
                    prov_obj.val(settings.prov);
                    cityStart();
                    setTimeout(function() {
                        if (settings.city != null) {
                            city_obj.val(settings.city);
                            distStart();
                            setTimeout(function() {
                                if (settings.dist != null) {
                                    dist_obj.val(settings.dist);
                                    managerStart();
                                }
                                ;
                            }, 1);
                        }
                        ;
                    }, 1);
                }
                ;
            }, 1);

            // 选择省份时发生事件
            prov_obj.bind("change", function() {
                cityStart($(this).val());
            });

            // 选择市级时发生事件
            city_obj.bind("change", function() {

                distStart($(this).val());
            });

            // 选择县/区时发生事件
            dist_obj.bind("change", function() { 
          
                managerStart($(this).val());
            });
        };

        // 设置省市json数据
        if (typeof (settings.url) == "string") {
            /*$.getJSON(settings.url, function(json) {
                city_json = json;
                init();
            });*/
        } else {
            city_json = settings.url;
            init();
        }
        ;
    };
})(jQuery);