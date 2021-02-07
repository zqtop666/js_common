function reloadjs() {
    $(".win-homepage").click(function () {
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(document.URL);
        } else {
            alert("设置首页失败，请手动设置！");
        }
    });
    $(".win-favorite").click(function () {
        var sURL = document.URL;
        var sTitle = document.title;
        try {
            window.external.addFavorite(sURL, sTitle);
        } catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "");
            } catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    });
    $(".win-forward").click(function () {
        window.history.forward(1);
    });
    $(".win-back").click(function () {
        window.history.back(-1);
    });
    $(".win-backtop").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
    $(".win-refresh").click(function () {
        window.location.reload();
    });
    $(".win-print").click(function () {
        window.print();
    });
    $(".win-close").click(function () {
        window.close();
    });
    $('.checkall').click(function () {
        var e = $(this);
        var name = e.attr("name");
        var checkfor = e.attr("checkfor");
        var type;
        if (checkfor != '' && checkfor != null && checkfor != undefined) {
            type = e.closest('form').find("input[name='" + checkfor + "']");
        } else {
            type = e.closest('form').find("input[type='checkbox']");
        }
        if (name == "checkall") {
            $(type).each(function (index, element) {
                element.checked = true;
            });
            e.attr("name", "ok");
        } else {
            $(type).each(function (index, element) {
                element.checked = false;
            });
            e.attr("name", "checkall");
        }
    });
    $('.dropdown-toggle').click(function () {
        $(this).closest('.button-group, .drop').addClass("open");
    });
    //新增下拉列表移入/移除
    $(".dropdown-hover").hover(function () {
        $(".button-group, .drop").removeClass("open");
        $(this).closest('.button-group, .drop').addClass("open");
    }, function () {

    });
    $(document).bind("click", function (e) {
        if ($(e.target).closest(".button-group.open, .drop.open").length == 0) {
            $(".button-group, .drop").removeClass("open");
        }
    });
    $checkplaceholder = function () {
        var input = document.createElement('input');
        return 'placeholder' in input;
    };
    if (!$checkplaceholder()) {
        $("textarea[placeholder], input[placeholder]").each(function (index, element) {
            if ($(element).attr("placeholder") || $emptyplaceholder(element)) {
                $(element).val($(element).attr("placeholder"));
                $(element).data("pintuerholder", $(element).css("color"));
                $(element).css("color", "rgb(169,169,169)");
                $(element).focus(function () {
                    $hideplaceholder($(this));
                });
                $(element).blur(function () {
                    $showplaceholder($(this));
                });
            }
        })
    }
    ;
    $emptyplaceholder = function (element) {
        var $content = $(element).val();
        return ($content.length === 0) || $content == $(element).attr("placeholder");
    };
    $showplaceholder = function (element) {
        //不为空及密码框
        if (($(element).val().length === 0 || $(element).val() == $(element).attr("placeholder")) && $(element).attr("type") != "password") {
            $(element).val($(element).attr("placeholder"));
            $(element).data("pintuerholder", $(element).css("color"));
            $(element).css("color", "rgb(169,169,169)");
        }
    };
    var $hideplaceholder = function (element) {
        if ($(element).data("pintuerholder")) {
            $(element).val("");
            $(element).css("color", $(element).data("pintuerholder"));
            $(element).removeData("pintuerholder");
        }
    };
    $('textarea, input, select').blur(function () {
        var e = $(this);
        if (e.attr("data-validate")) {
            e.closest('.field').find(".input-help").remove();
            var $checkdata = e.attr("data-validate").split(',');
            var $checkvalue = e.val();
            var $checkstate = true;
            var $checktext = "";
            if (e.attr("placeholder") == $checkvalue) {
                $checkvalue = "";
            }
            if ($checkvalue != "" || e.attr("data-validate").indexOf("required") >= 0) {
                for (var i = 0; i < $checkdata.length; i++) {
                    var $checktype = $checkdata[i].split(':');
                    if (!$pintuercheck(e, $checktype[0], $checkvalue)) {
                        $checkstate = false;
                        //$checktext = $checktext + "<li>" + $checktype[1] + "</li>";
                        $checktext = $checktext + $checktype[1];
                    }
                }
            }
            ;
            if ($checkstate) {
                e.closest('.form-group').removeClass("check-error");
                e.parent().find(".input-help").remove();
                e.closest('.form-group').addClass("check-success");
            } else {
                e.closest('.form-group').removeClass("check-success");
                e.closest('.form-group').addClass("check-error");
                //e.closest('.field').append('<div class="input-help"><ul>' + $checktext + '</ul></div>');
                layer.tips($checktext, e, {tips: [3, '#e33']}); //在元素的事件回调体中，follow直接赋予this即可
            }
        }
    });
    $pintuercheck = function (element, type, value) {
        $pintu = value.replace(/(^\s*)|(\s*$)/g, "");
        switch (type) {
            case "required":
                return /[^(^\s*)|(\s*$)]/.test($pintu);
                break;
            case "chinese":
                return /^[\u0391-\uFFE5]+$/.test($pintu);
                break;
            case "number":
                return /^([+-]?)\d*\.?\d+$/.test($pintu);
                break;
            case "plusnumber":
                return /^[0-9]\d*$/.test($pintu);
                break;
            case "integer":
                return /^-?[0-9]\d*$/.test($pintu);
                break;
            case "plusinteger":
                return /^[1-9]\d*$/.test($pintu);
                break;
            case "unplusinteger":
                return /^-[1-9]\d*$/.test($pintu);
                break;
            case "znumber":
                return /^[1-9]\d*|0$/.test($pintu);
                break;
            case "fnumber":
                return /^-[1-9]\d*|0$/.test($pintu);
                break;
            case "double":
                return /^[-\+]?\d+(\.\d+)?$/.test($pintu);
                break;
            case "plusdouble":
                return /^[+]?\d+(\.\d+)?$/.test($pintu);
                break;
            case "unplusdouble":
                return /^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/.test($pintu);
                break;
            case "english":
                return /^[A-Za-z]+$/.test($pintu);
                break;
            case "username":
                return /^[a-z]\w{3,}$/i.test($pintu);
                break;
            case "mobile":
                return /^[0-9]\d{10}$/.test($pintu);
                break;
            case "phone":
                return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                break;
            case "tel":
                return /^[0-9]\d{10}$/.test($pintu) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                break;
            case "email":
                return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);
                break;
            case "url":
                return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);
                break;
            case "ip":
                return /^[\d\.]{7,15}$/.test($pintu);
                break;
            case "qq":
                return /^[1-9]\d{4,10}$/.test($pintu);
                break;
            case "currency":
                return /^\d+(\.\d+)?$/.test($pintu);
                break;
            case "zipcode":
                return /^[1-9]\d{5}$/.test($pintu);
                break;
            case "chinesename":
                return /^[\u0391-\uFFE5]{2,15}$/.test($pintu);
                break;
            case "englishname":
                return /^[A-Za-z]{1,161}$/.test($pintu);
                break;
            case "age":
                return /^[0-120]?\d*$/.test($pintu);
                break;
            case "date":
                return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test($pintu);
                break;
            case "datetime":
                return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/.test($pintu);
                break;
            case "idcard":
                return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test($pintu);
                break;
                break;
            case "bigenglish":
                return /^[A-Z]+$/.test($pintu);
                break;
            case "smallenglish":
                return /^[a-z]+$/.test($pintu);
                break;
            case "color":
                return /^#[0-9a-fA-F]{6}$/.test($pintu);
                break;
            case "ascii":
                return /^[\x00-\xFF]+$/.test($pintu);
                break;
            case "md5":
                return /^([a-fA-F0-9]{32})$/.test($pintu);
                break;
            case "zip":
                return /(.*)\.(rar|zip|7zip|tgz)$/.test($pintu);
                break;
            case "img":
                return /(.*)\.(jpg|gif|ico|jpeg|png)$/.test($pintu);
                break;
            case "doc":
                return /(.*)\.(doc|xls|docx|xlsx|pdf)$/.test($pintu);
                break;
            case "mp3":
                return /(.*)\.(mp3)$/.test($pintu);
                break;
            case "video":
                return /(.*)\.(rm|rmvb|wmv|avi|mp4|3gp|mkv)$/.test($pintu);
                break;
            case "flash":
                return /(.*)\.(swf|fla|flv)$/.test($pintu);
                break;
            case "radio":
                var radio = element.closest('form').find('input[name="' + element.attr("name") + '"]:checked').length;
                return eval(radio == 1);
                break;
            default:
                var $test = type.split('#');
                if ($test.length > 1) {
                    switch ($test[0]) {
                        case "compare":
                            return eval(Number($pintu) + $test[1]);
                            break;
                        case "regexp":
                            return new RegExp($test[1], "gi").test($pintu);
                            break;
                        case "length":
                            var $length;
                            if (element.attr("type") == "checkbox") {
                                $length = element.closest('form').find('input[name="' + element.attr("name") + '"]:checked').length;
                            } else {
                                $length = $pintu.replace(/[\u4e00-\u9fa5]/g, "***").length;
                            }
                            return eval($length + $test[1]);
                            break;
                        case "ajax":
                            var $getdata;
                            var $url = $test[1] + $pintu;
                            $.ajaxSetup({
                                async: false
                            });
                            $.getJSON($url, function (data) {
                                $getdata = data.getdata;
                            });
                            if ($getdata == "true") {
                                return true;
                            }
                            break;
                        case "repeat":
                            return $pintu == jQuery('input[name="' + $test[1] + '"]').eq(0).val();
                            break;
                        default:
                            return true;
                            break;
                    }
                    break;
                } else {
                    return true;
                }
        }
    };
    $('form').submit(function () {
        $(this).find('input[data-validate],textarea[data-validate],select[data-validate]').trigger("blur");
        $(this).find('input[placeholder],textarea[placeholder]').each(function () {
            $hideplaceholder($(this));
        });
        var numError = $(this).find('.check-error').length;
        if (numError) {
            $(this).find('.check-error').first().find('input[data-validate],textarea[data-validate],select[data-validate]').first().focus().select();
            return false;
        }
    });
    $('.form-reset').click(function () {
        $(this).closest('form').find(".input-help").remove();
        $(this).closest('form').find('.form-submit').removeAttr('disabled');
        $(this).closest('form').find('.form-group').removeClass("check-error");
        $(this).closest('form').find('.form-group').removeClass("check-success");
    });
    $('.tab .tab-nav li').each(function () {
        var e = $(this);
        var trigger = e.closest('.tab').attr("data-toggle");
        if (trigger == "hover") {
            e.mouseover(function () {
                $showtabs(e);
            });
            e.click(function () {
                return false;
            });
        } else {
            e.click(function () {
                $showtabs(e);
                return false;
            });
        }
    });
    //2015-05-27 新增，ajax提交表单扩展
    $.fn.ajaxSubmit = function (fn) {
        $(this).find('input[data-validate],textarea[data-validate],select[data-validate]').trigger("blur");
        $(this).find('input[placeholder],textarea[placeholder]').each(function () {
            $hideplaceholder($(this));
        });
        var numError = $(this).find('.check-error').length;
        if (numError) {
            $(this).find('.check-error').first().find('input[data-validate],textarea[data-validate],select[data-validate]').first().focus().select();
            return false;
        }
        if (fn && typeof fn == "function") {
            fn()
        }
    };
    $showtabs = function (e) {
        var detail = e.children("a").attr("href");
        e.closest('.tab .tab-nav').find("li").removeClass("active");
        e.closest('.tab').find(".tab-body .tab-panel").removeClass("active");
        e.addClass("active");
        $(detail).addClass("active");
    };
    /*** 搜索下拉框 **/
    $('.search-drop').each(function () {
        var e = $(this);
        var trigger = e.attr("data-toggle");
        if (trigger == "keydown") {
            e.keypress(function () {
                $searchDrop(e);
            });
        } else if (trigger == "click") {
            e.click(function () {
                $searchDrop(e);
            });
        }
    });
    $searchDrop = function (e) {
        //console.info('aha');
    };

    $('.dialogs').each(function () {
        var e = $(this);
        var trigger = e.attr("data-toggle");
        if (trigger == "hover") {
            e.mouseover(function () {
                $showdialogs(e);
            });
        } else if (trigger == "click") {
            e.click(function () {
                $showdialogs(e);
            });
        }
    });
    //这里目前还存在问题
    $showdialogs = function (e) {
        var trigger = e.attr("data-toggle");
        var getid = e.attr("data-target");
        var data = e.attr("data-url");
        var mask = e.attr("data-mask");
        var width = e.attr("data-width");
        var detail = "";
        var masklayout = $('<div class="dialog-mask"></div>');
        if (width == null) {
            width = "80%";
        }

        if (mask == "1") {
            $("body").append(masklayout);
        }
        detail = '<div class="dialog-win" style="position:fixed;width:' + width + ';z-index:11;">';
        if (getid != null) {
            detail = detail + $(getid).html();
        }
        if (data != null) {
            detail = detail + $.ajax({
                    url: data,
                    async: false
                }).responseText;
        }
        detail = detail + '</div>';

        var win = $(detail);
        win.find(".dialog").addClass("open");
        $("body").append(win);
        var x = parseInt($(window).width() - win.outerWidth()) / 2;
        var y = parseInt($(window).height() - win.outerHeight()) / 2;
        if (y <= 10) {
            y = 10
        }
        win.css({
            "left": x,
            "top": y
        });
        win.find(".dialog-close,.close").each(function () {
            $(this).click(function () {
                win.remove();
                $('.dialog-mask').remove();
            });
        });
        masklayout.click(function () {
            win.remove();
            $(this).remove();
        });
    };
    $('.tips').each(function () {
        var e = $(this);
        var title = e.attr("title");
        var trigger = e.attr("data-toggle");
        e.attr("title", "");
        if (trigger == "" || trigger == null) {
            trigger = "hover";
        }
        if (trigger == "hover") {
            e.mouseover(function () {
                $showtips(e, title);
            });
        } else if (trigger == "click") {
            e.click(function () {
                $showtips(e, title);
            });
        } else if (trigger == "show") {
            e.ready(function () {
                $showtips(e, title);
            });
        }
    });
    //2015-11-04 修复tips title 重叠
    $showtips = function (e, title) {
        var trigger = e.attr("data-toggle");
        var place = e.attr("data-place");
        var width = e.attr("data-width");
        var css = e.attr("data-style");
        var image = e.attr("data-image");
        var content = e.attr("content");
        var getid = e.attr("data-target");
        var data = e.attr("data-url");
        var x = 0;
        var y = 0;
        var html = "";
        var detail = "";

        if (image != null) {
            detail = detail + '<img class="image" src="' + image + '" />';
        }
        if (content != null) {
            detail = detail + '<p class="tip-body">' + content + '</p>';
        }
        if (getid != null) {
            detail = detail + $(getid).html();
        }
        if (data != null) {
            detail = detail + $.ajax({
                    url: data,
                    async: false
                }).responseText;
        }
        if (title != null && title != "") {
            if (detail != null && detail != "") {
                detail = '<p class="tip-title"><strong>' + title + '</strong></p>' + detail;
            } else {
                detail = '<p class="tip-line">' + title + '</p>';
            }
            e.attr("title", "");
        }
        detail = '<div class="tip">' + detail + '</div>';
        html = $(detail);

        $("body").append(html);
        if (width != null) {
            html.css("width", width);
        }
        if (place == "" || place == null) {
            place = "top";
        }
        if (place == "left") {
            x = e.offset().left - html.outerWidth() - 5;
            y = e.offset().top - html.outerHeight() / 2 + e.outerHeight() / 2;
        } else if (place == "top") {
            x = e.offset().left - html.outerWidth() / 2 + e.outerWidth() / 2;
            y = e.offset().top - html.outerHeight() - 5;
        } else if (place == "right") {
            x = e.offset().left + e.outerWidth() + 5;
            y = e.offset().top - html.outerHeight() / 2 + e.outerHeight() / 2;
        } else if (place == "bottom") {
            x = e.offset().left - html.outerWidth() / 2 + e.outerWidth() / 2;
            y = e.offset().top + e.outerHeight() + 5;
        }
        if (css != "") {
            html.addClass(css);
        }
        html.css({
            "left": x + "px",
            "top": y + "px",
            "position": "absolute"
        });
        if (trigger == "hover" || trigger == "click" || trigger == null) {
            e.mouseout(function () {
                html.remove();
                e.attr("title", title)
            });
        }
    };
    $('.alert .close').each(function () {
        $(this).click(function () {
            $(this).closest('.alert').remove();
        });
    });
    $('.radio label').each(function () {
        var e = $(this);
        e.click(function () {
            e.closest('.radio').find("label").removeClass("active");
            e.addClass("active");
        });
    });
    $('.checkbox label').each(function () {
        var e = $(this);
        e.click(function () {
            if (e.find('input').is(':checked')) {
                e.addClass("active");
            } else {
                e.removeClass("active");
            }
        });
    });
    $('.collapse .panel-head').each(function () {
        var e = $(this);
        e.click(function () {
            //增加反复折叠判断
            if (e.closest('.collapse').find(".toggle-actvie").html() != '' && e.closest('.collapse').find(".toggle-actvie").html() != undefined) {
                e.closest('.panel').toggleClass("active");
            } else {
                e.closest('.collapse').find(".panel").removeClass("active");
                e.closest('.panel').addClass("active");
            }
        });
    });
    $('.icon-navicon').each(function () {
        var e = $(this);
        var target = e.attr("data-target");
        e.click(function () {
            $(target).toggleClass("nav-navicon");
        });
    });
    $('.banner').each(function () {
        var e = $(this);
        var pointer = e.attr("data-pointer");
        var interval = e.attr("data-interval");
        var style = e.attr("data-style");
        var items = e.attr("data-item");
        var items_s = e.attr("data-small");
        var items_m = e.attr("data-middle");
        var items_b = e.attr("data-big");
        var num = e.find(".carousel .item").length;
        var win = $(window).width();
        var i = 1;
        if (interval == null) {
            interval = 5
        }
        if (items == null || items < 1) {
            items = 1
        }
        if (items_s != null && win > 760) {
            items = items_s
        }
        if (items_m != null && win > 1000) {
            items = items_m
        }
        if (items_b != null && win > 1200) {
            items = items_b
        }
        var itemWidth = Math.ceil(e.outerWidth() / items);
        var page = Math.ceil(num / items);
        e.find(".carousel .item").css("width", itemWidth + "px");
        e.find(".carousel").css("width", itemWidth * num + "px");

        var carousel = function () {
            i++;
            if (i > page) {
                i = 1;
            }
            $showbanner(e, i, items, num);
        };
        var play = setInterval(carousel, interval * 600);

        e.mouseover(function () {
            clearInterval(play);
        });
        e.mouseout(function () {
            play = setInterval(carousel, interval * 600);
        });

        if (pointer != 0 && page > 1) {
            var point = '<ul class="pointer"><li value="1" class="active"></li>';
            for (var j = 1; j < page; j++) {
                point = point + ' <li value="' + (j + 1) + '"></li>';
            }
            ;
            point = point + '</ul>';
            var pager = $(point);
            if (style != null) {
                pager.addClass(style);
            }
            ;
            e.append(pager);
            pager.css("left", e.outerWidth() * 0.5 - pager.outerWidth() * 0.5 + "px");
            pager.find("li").click(function () {
                $showbanner(e, $(this).val(), items, num);
            });
            var lefter = $('<div class="pager-prev icon-angle-left"></div>');
            var righter = $('<div class="pager-next icon-angle-right"></div>');
            if (style != null) {
                lefter.addClass(style);
                righter.addClass(style);
            }
            ;
            e.append(lefter);
            e.append(righter);

            lefter.click(function () {
                i--;
                if (i < 1) {
                    i = page;
                }
                $showbanner(e, i, items, num);
            });
            righter.click(function () {
                i++;
                if (i > page) {
                    i = 1;
                }
                $showbanner(e, i, items, num);
            });
        }
        ;
    });
    $showbanner = function (e, i, items, num) {
        var after = 0,
            leftx = 0;
        leftx = -Math.ceil(e.outerWidth() / items) * (items) * (i - 1);
        if (i * items > num) {
            after = i * items - num;
            leftx = -Math.ceil(e.outerWidth() / items) * (num - items);
        }
        ;
        e.find(".carousel").stop(true, true).animate({
            "left": leftx + "px"
        }, 800);
        e.find(".pointer li").removeClass("active");
        e.find(".pointer li").eq(i - 1).addClass("active");
    };
    $(".spy a").each(function () {
        var e = $(this);
        var t = e.closest(".spy");
        var target = t.attr("data-target");
        var top = t.attr("data-offset-spy");
        var thistarget = "";
        var thistop = "";
        if (top == null) {
            top = 0;
        }
        if (target == null) {
            thistarget = $(window);
        } else {
            thistarget = $(target);
        }

        thistarget.bind("scroll", function () {
            if (target == null) {
                thistop = $(e.attr("href")).offset().top - $(window).scrollTop() - parseInt(top);
            } else {
                thistop = $(e.attr("href")).offset().top - thistarget.offset().top - parseInt(top);
            }

            if (thistop < 0) {
                t.find('li').removeClass("active");
                e.parents('li').addClass("active");
            }
        });
    });
    $(".fixed").each(function () {
        var e = $(this);
        var style = e.attr("data-style");
        var top = e.attr("data-offset-fixed");
        if (top == null) {
            top = e.offset().top;
        } else {
            top = e.offset().top - parseInt(top);
        }
        ;
        if (style == null) {
            style = "fixed-top";
        }
        ;

        $(window).bind("scroll", function () {
            var thistop = top - $(window).scrollTop();
            if (style == "fixed-top" && thistop < 0) {
                e.addClass("fixed-top");
            } else {
                e.removeClass("fixed-top");
            }
            ;

            var thisbottom = top - $(window).scrollTop() - $(window).height();
            if (style == "fixed-bottom" && thisbottom > 0) {
                e.addClass("fixed-bottom");
            } else {
                e.removeClass("fixed-bottom");
            }
            ;
        });

    });

    /********************* 以下是sung的延展 ***************************/

    /*** 搜索式输入下拉框，表单中的下拉菜单选择进input ***/
    $('.drop-search').each(function () {
        var e = $(this);
        var e_input = e.find('input[class~=input-search]');
        var e_drop = e.find('.drop-menu');
        var t;
        e_input.keyup(function () {
            clearTimeout(t);
            t = setTimeout(function () {
                //通过搜索获取json数据，并写入下拉菜单中
                $.get(e_input.attr('data-url') + '/' + e_input.val(), function (data) {
                    var data_obj = (typeof(data) != 'object') ? $.evalJSON(data) : (data);
                    var li_html = '';
                    if (data_obj.length > 0) {
                        $.each(data_obj, function (k, row) {
                            var val = (row.val).replace(e_input.val(), "<span class='text-dot'>" + e_input.val() + "</span>")
                            li_html = li_html + '<li><a href="#" data-val="' + row.key + '" onclick="$dropSearch(\'' + e.attr('data-target') + '\',this)">' + val + '</a></li>';
                        });
                        e_drop.html(li_html);
                        e.addClass('open');
                    } else {
                        e.removeClass('open');
                    }
                });
            }, 1000);
        });
    });
    $dropSearch = function (target, xthis) {
        ////console.info(target,xthis);
        var e = $(target);
        var $xthis = $(xthis);
        e.val($xthis.attr('data-val'));
        $xthis.closest('.drop-search').removeClass('open');
    }
    /**
    $('.drop-search.drop-menu a').click(function () {
        $('#' + $(this).closest('.buttom-select').attr('data-val-id')).val($(this).attr('data-val'));
        $(this).closest('.button-group, .drop').find('.dropdown-toggle .buttom-select-val').text($(this).text());
        //console.info($(this).closest('.button-group'));
        $(this).closest('.button-group, .drop').removeClass('open');
        return false;
    });
     **/
    /** 自适应超过屏范围的表格加上横向滚动条 **/
    $tableResponsive = function () {
        //console.info('ahdsalskdjfa;lsdfjas;lkdfja;slkdf');
        var table_width = 0;
        $('.table-responsive table thead th').each(function () {
            table_width += parseInt($(this).width());
        });
        if ($('.table-responsive').width() < table_width) {
            $('.table-responsive table').width(table_width);
        }
    };
    /** 将区域自动计算自动填充为屏的的有空白高度 **/
    $tableResponsiveMaxHeight = function (e, vh) {
        var e_sib = $(e).siblings();
        var vheight = $('#layout-body-content').height();
        var e_par = $(e).parent('div').siblings('div');
        //console.info(e_par);
        e_par.each(function () {
            //console.info('.e_par.', $(this).outerHeight());
            vheight -= $(this).outerHeight();
        });
        e_sib.each(function () {
            //console.info($(this).outerHeight());
            vheight -= $(this).outerHeight();
        });
        if (vh == undefined) {
            $(e).height(vheight);
        } else {
            $(e).height(vheight - vh);
        }
    };
    /*** 表单中的下拉菜单选择进表单 ***/
    $('.buttom-select.drop-menu a').click(function () {
        $('#' + $(this).closest('.buttom-select').attr('data-val-id')).val($(this).attr('data-val'));//兼容旧版，
        //console.info($(this).attr('data-val'));
        $(this).closest('.button-group, .drop').find('.dropdown-toggle .buttom-select-val').html($(this).html());
        $(this).closest('.button-group').find('input[mmy-filter~=buttom-select-name]').val($(this).text());
        $(this).closest('.button-group').find('input[mmy-filter~=buttom-select-val]').val($(this).attr('data-val'));
        //console.info($(this).closest('.button-group').find('input[mmy-filter~=buttom-select-val]').val());
        $(this).closest('.button-group, .drop').removeClass('open');
        return false;
    });

    /** 可搜索的下拉框展展 **/
    $('body').unbind('click').click(function(){
        //console.info();
        if($('.button-group-search, .drop').hasClass('open') && !$(':focus').hasClass('button-select-val')){
            $('.button-group-search, .drop').removeClass('open');
        }
    });
    $('.dropdown-toggle-search').children('.button-select-val').unbind('focusin').focusin(function () {
        $(this).val('');
    });
    $('.dropdown-toggle-search').unbind('click').click(function () {
        //$(this).children('.buttom-select-val').prop('contenteditable',true);
        var e1 = $(this);
        var old_str = $(this).children('.button-select-val').val();
        $(this).children('.button-select-val').unbind('keyup').keyup(function () {
            //console.info('开始搜索');
            var e = $(this);
            $(e).closest('.button-group-search').find('.button-select-search.drop-menu li').removeClass('hidden');
            $(e).closest('.button-group-search').find('.button-select-search.drop-menu a').each(function () {
                //console.info($(this).text(),$(this).text().indexOf($(e).val()))
                if ($(this).text().indexOf($(e).val()) < 0) {
                    $(this).closest('li').addClass('hidden');
                }
            });
        });
        $(this).closest('.button-group-search, .drop').addClass("open");
    })
    /*** 表单中的下拉菜单选择进表单[可搜索] ***/
    $('.button-select-search.drop-menu a').click(function () {
        $(this).closest('.button-group-search').find($(this).closest('.button-select-search').attr('data-val-id')).val($(this).attr('data-val'));
        $(this).closest('.button-group-search, .drop').find('.dropdown-toggle-search .button-select-val').val($(this).text());
        $(this).closest('.button-group-search, .drop').removeClass('open');
        return false;
    });
    /*** 点击排序，=于使用ajax去传递了一次请求 **/
    $('.data-sort').each(function () {
        var e = $(this);
        e.unbind('click');
        e.click(function () {
            var str = '&orderby=' + e.attr('data-field') + '&sorttype=';
            if (e.attr('data-sort') == '' || e.attr('data-sort') == 'asc') {
                str += 'desc';
            } else {
                str += 'asc';
            }
            $ajaxload(e.attr('data-url') + str, e.attr('target-id'));
        });

    });
    $('.ajax-url').each(function () {
        var e = $(this);
        e.unbind('click');
        var target = (e.attr('target-id') != undefined) ? (e.attr('target-id')) : ('');
        e.click(function () {
            //console.info(target);
            if (target == '') {
                layer.msg('请设置链接的target-id');
                return;
            }
            var title = (e.attr('data-title') != undefined && e.attr('data-title') != '') ? (e.attr('data-title')) : (e.text());
            $tabAdd(e.attr('data-url'), target.substr(1), title, true);
        });
    });
    /**
     * 删除确认框
     * @param xthis
     * @param msg
     * @returns {boolean}
     */
    $delForm = function (xthis, msg) {
        layer.msg(msg, {
            time: 0 //不自动关闭
            , btnAlign: 'c'
            , btn: ['确定', '取消']
            , yes: function (index) {
                layer.close(index);
                $(xthis).closest('form').submit();
                return true;
            }
            , end: function (index) {
                layer.close(index);
                return false;
            }
        });
        return false;
    }
    /** 自动计算表格在屏中的宽度**/
    $('.mmyV2Table').each(function(){
        var e = $(this);
        $mmyV2Table(e);
    });
    $mmyV2Table = function(e){
        //console.info($(e).text());
        var cut = $(e).closest('.mmyV2main').find('.mmyV2Cut');
        var xheight = $(window).height()- $('#layout-body-top').outerHeight() - $('#top-menu').outerHeight() - 100;
        //console.info(xheight);
        $(cut).each(function(){
            xheight =  xheight- $(this).outerHeight();
        });
        $(e).height(xheight);
    }
    /*** 所有表单使用ajax方式请求提交 **/
    $('.ajax-form').each(function () {
        var e = $(this);
        //////console.info(e);
        e.unbind('submit');
        e.attr('onsubmit', 'return false;');
        e.submit(function () {
            //////console.info('xxx');
            e.ajaxSubmit(function () {
                var index = layer.msg('正在请求数据...', {time: 15 * 1000, shade: 0.3, scrollbar: false, icon: 16}); //正在加载的框，并且设定最长等待30秒
                if (e.attr('method').toUpperCase() == 'POST') {
                    var pdata = e.serializeArray();
                    //////console.info(pdata);
                    $.post(e.attr('action'), pdata, function (data) {
                        //////console.info(data);return false;
                        layer.close(index);//关闭加载框
                        if (data.status.toUpperCase() == 'N') {
                            layer.close(index);
                            if (typeof(data.html) != 'undefined') {
                                layer.msg(data.html, {time: 0});
                            } else {
                                layer.msg(data.info, {time: 5 * 1000, icon: 5});
                            }
                            return false;
                        } else if (data.status.toUpperCase() == 'Y') {
                            layer.msg(data.info, {time: 5 * 1000});
                            //在顶部弹出成功的提示
                            //判断是否关闭浮层
                            if (typeof(data.colse_dialogs) != 'undefined') {
                                //console.info(data.colse_dialogs.toUpperCase());
                                if (data.colse_dialogs.toUpperCase() == 'ALL') {
                                    layer.closeAll();
                                } else if (data.colse_dialogs.toUpperCase() == 'TAB') {
                                    var active_the_tab = $('.mmy-tab-item[class~=layui-show] .mmy-body-tabs-li li[class*=mmy-this]>a');
                                    $tabClose(active_the_tab);
                                    if ($('.mmy-tab-item[class~=layui-show] .mmy-body-tabs-li').children('li[tab-name=' + data.target_method.substr(1) + ']').length > 0) {
                                        $tabQh($('.mmy-tab-item[class~=layui-show] .mmy-body-tabs-li').children('li[tab-name=' + data.target_method.substr(1) + ']').children('a'), 'true');//切换到这个对应的列表页
                                    }else{
                                        $tabAdd(data.target_url,data.target_method.substr(1),data.target_title,true);
                                    }
                                    layer.closeAll();
                                    return;
                                }else if(data.colse_dialogs.toUpperCase() == 'CUR'){
                                    e.closest('div[class~=layui-layer]').find('span[class~=layui-layer-setwin]').find('a').click();
                                } else if (data.colse_dialogs != '' && data.colse_dialogs != false) {
                                    layer.close(data.colse_dialogs);//关闭当前浮层
                                }
                            }
                            //判断是否要直接加载html
                            //有需要直接显示的html就显示，否则就用data-url支刷新
                            if (typeof(data.target_html) != 'undefined' && typeof(data.target_method) != 'undefined') {
                                $(data.target_method).html(data.target_html);
                            }
                            //判断是否要打开url
                            if (typeof(data.target_url) != 'undefined' && data.target_url != '') {
                                //////console.info('进到target_url');
                                //判断打开方式 target_method
                                if (typeof(data.target_method) != 'undefined' && data.target_method.toUpperCase() != 'TOP') {
                                    //////console.info('进到method');
                                    //弹出浮层来打开
                                    if ((data.target_method).toUpperCase() == 'DIALOGS') {
                                        //////console.info(('进到dialogs'));
                                        var dialogs_width = (typeof(data.dialogs_width) != 'undefined') ? (data.dialogs_width) : ('80%');
                                        var dialogs_height = (typeof(data.dialogs_height) != 'undefined') ? (data.dialogs_height) : ('80%');
                                        var dialogs_title = (typeof(data.dialogs_title) != 'undefined') ? (data.dialogs_title) : ('信息');
                                        var shade = (typeof(data.dialogs_masklayout) != 'undefined') ? (data.dialogs_masklayout) : ('0.3');
                                        var btn = (typeof(data.dialogs_btn) != 'undefined' && data.dialogs_btn) ? (['确认', '取消']) : (false);
                                        var closeBtn = (typeof(data.closebtn) != 'undefined' && data.closebtn) ? (data.closebtn) : (1);
                                        var detail = $.ajax({
                                            url: data.target_url,
                                            async: false
                                        }).responseText;
                                        layer.open({
                                            type: 1,
                                            title: dialogs_title,
                                            content: detail, //这里content是一个普通的String
                                            area: [dialogs_width, dialogs_height],
                                            shade: shade,
                                            closeBtn: closeBtn,
                                            scrollbar: false,
                                            btn: btn,//['确认', '取消'],
                                            yes: function (index, layero) { //或者使用btn1
                                                //按钮【按钮一】的回调
                                                var xform = $(layero).find('.layui-layer-content form');
                                                xform.append('<input type="hidden" name="layer_index" value="' + index + '">');
                                                xform.submit();
                                                return false;
                                            },
                                            cancel: function (index) { //或者使用btn2
                                                //按钮【按钮二】的回调
                                                ////console.info(index);
                                            },
                                            success: function (layero, index) {
                                                reloadjs();
                                            }
                                        });
                                    } else {
                                        //加载id或class来刷新
                                        $ajaxload(data.target_url, data.target_method);
                                    }
                                } else {
                                    top.location.href = data.target_url;
                                }
                            }
                        } else if (data.status.toUpperCase() == 'CALLBACK') {//回调含数
                            //console.info('callback',data.callback);
                            eval(data.callback);
                        } else {
                            layer.close(index);
                            layer.msg('返回数据格式错误', {icon: 3});

                        }
                        //判断是否要打开url
                        if (typeof(data.target_html) != 'undefined' && data.target_html != '') {
                            if (typeof(data.target_method) != 'undefined' && data.target_method.toUpperCase() != 'TOP') {
                                $(data.target_method).html(data.target_html);
                            }
                        }
                        //////console.info('haha');
                    }, 'json');
                } else {
                    if (e.attr('target-id') != undefined && e.attr('target-id') != '') {
                        layer.close(index); //关闭加载框
                        var xurl = e.attr('action') + '?' + $.param(e.serializeArray());
                        $(e.attr('target-id')).html('<div class="mmyloading-tips x12 padding-large text-center">正在读取数据...</div>').load(xurl, function () {
                            reloadjs();
                        });
                    } else {
                        layer.msg('form未设置 target-id');
                    }
                }
            });
            return false;
        });
    });
    /*** 左侧浮出的层，一般用于更多操作选项的行为 ***/
    $('.dialogs-left').each(function () {
        var e = $(this);
        // 解出原来的绑定
        e.unbind('click');
        e.unbind('mouseover');
        var trigger = e.attr("data-toggle");
        if (trigger == "hover") {
            e.mouseover(function () {
                $show_dialogs_left_layer(e);
            });
        } else {
            e.click(function () {
                $show_dialogs_left_layer(e);
            });
        }
    });
    $show_dialogs_left_layer = function (e) {
        var getid = e.attr("data-target");
        var data = e.attr("data-url");
        var mask = e.attr("data-mask");
        var width = e.attr("data-width");
        var height = $(window).height() + 'px';
        var title = e.attr("data-title");
        var btn = (e.attr("data-btn") == 1) ? (['确认', '关闭']) : (false);
        var shadeclose = (e.attr("data-shadeclose") == 1) ? (true) : (false);
        var detail = "";
        var masklayout = (e.attr('data-mask') == 1) ? (0.2) : (0);
        if (width == null) {
            width = "30%";
        }
        if (getid != null) {
            detail = detail + $(getid).html();
        }
        if (data != null) {
            detail = detail + $.ajax({
                    url: data,
                    async: false
                }).responseText;
        }
        //layer
        layer.open({
            type: 1,
            title: title,
            content: detail, //这里content是一个普通的String
            area: [width, height],
            offset: ['0', '0'],
            shift: 2,
            shade: masklayout,
            scrollbar: false,
            shadeClose: shadeclose,
            id: 'dialogs-left-layer',
            btn: btn,
            yes: function (index, layero) { //或者使用btn1
                //按钮【按钮一】的回调
                var xform = $(layero).find('.layui-layer-content form');
                //把新的表单形式放入原表中，方便下一次打开高级搜索加载出来
                var new_html = $(layero).find('.layui-layer-content').html();
                $(getid).html(new_html);
                xform.submit();
                return false;
            },
            cancel: function (index, layero) { //或者使用btn2
                //按钮【按钮二】的回调
            },
            success: function (layero, index) {
                reloadjs();
            }

        });
    };
    /*** 右侧浮出的层，一般用于高级搜索，或有更多操作选项的行为 ***/
    $('.dialogs-right').each(function () {
        var e = $(this);
        // 解出原来的绑定
        e.unbind('click');
        e.unbind('mouseover');
        var trigger = e.attr("data-toggle");
        if (trigger == "hover") {
            e.mouseover(function () {
                $show_dialogs_right_layer(e);
            });
        } else {
            e.click(function () {
                $show_dialogs_right_layer(e);
            });
        }
    });
    $show_dialogs_right_layer = function (e) {
        var getid = e.attr("data-target");
        var data = e.attr("data-url");
        var mask = e.attr("data-mask");
        var width = e.attr("data-width");
        var height = $(window).height() + 'px';
        var title = e.attr("data-title");
        var btn = (e.attr("data-btn") == 1) ? (['确认', '关闭']) : (false);
        var shadeclose = (e.attr("data-shadeclose") == 1) ? (true) : (false);
        var detail = "";
        var masklayout = (e.attr('data-mask') == 1) ? (0.2) : (0);
        if (width == null) {
            width = "30%";
        }
        if (getid != null) {
            detail = detail + $(getid).html();
        }
        if (data != null) {
            detail = detail + $.ajax({
                    url: data,
                    async: false
                }).responseText;
        }
        //layer
        layer.open({
            type: 1,
            title: title,
            content: detail, //这里content是一个普通的String
            area: [width, height],
            offset: 'rb',
            shift: 2,
            shade: masklayout,
            scrollbar: false,
            shadeClose: shadeclose,
            id: 'dialogs-right-layer',
            btn: btn,
            yes: function (index, layero) { //或者使用btn1
                //按钮【按钮一】的回调
                var xform = $(layero).find('.layui-layer-content form');
                //把新的表单形式放入原表中，方便下一次打开高级搜索加载出来
                var new_html = $(layero).find('.layui-layer-content').html();
                $(getid).html(new_html);
                xform.submit();
                return false;
            },
            cancel: function (index, layero) { //或者使用btn2
                //按钮【按钮二】的回调
            },
            success: function (layero, index) {
                reloadjs();
            }

        });
    };
    // layer 重构弹出窗口
    $('.dialogs').each(function () {
        var e = $(this);
        // 解出原来的绑定
        e.unbind('click');
        var trigger = e.attr("data-toggle");
        if (trigger == "hover") {
            e.mouseover(function () {
                $showdialogs_layer(e);
            });
        } else {
            e.click(function () {
                $showdialogs_layer(e);
            });
        }
    });
    $showdialogs_layer = function (e) {
        var trigger = e.attr("data-toggle");
        var getid = e.attr("data-target");
        var data = e.attr("data-url");
        var mask = (e.attr("data-mask")) ? (e.attr("data-mask")) : ('0.7');
        var width = e.attr("data-width");
        var height = e.attr("data-height");
        var title = e.attr("data-title");
        var refurl = e.attr("data-refurl");
        var btn = (e.attr("data-btn") == 'false') ? (false) : (['确认', '关闭']);
        var offset = (e.attr("data-offset")) ? (e.attr("data-offset")) : ('auto');
        var shift = (e.attr("data-shift")) ? (e.attr("data-shift")) : ('0');
        var shadeClose = (e.attr("data-shadeClose")) ? (true) : (false);
        var detail = "";
        var masklayout = (mask == 1) ? (0.2) : (parseFloat(mask))
        //console.info(masklayout);
        var colse_callback = (e.attr("data-colse-callback")) ? (e.attr("data-colse-callback")) : (false);
        //////console.info(colse_callback);
        if (width == null) {
            width = "90%";
        }
        if (height == null) {
            height = "90%";
        }
        if (getid != null) {
            detail = detail + $(getid).html();
        }
        if (data != null) {
            detail = detail + $.ajax({
                    url: data,
                    async: false
                }).responseText;
        }
        //layer
        var index = layer.open({
            type: 1,
            title: title,
            content: detail, //这里content是一个普通的String
            area: [width, height],
            shade: masklayout,
            scrollbar: false,
            offset: offset,
            shift: shift,
            shadeClose: shadeClose,
            btn: btn,
            yes: function (index, layero) { //或者使用btn1
                //按钮【按钮一】的回调
                var xform = $(layero).find('.layui-layer-content form[class~=ajax-form]');
                if (xform.length == 0) {
                    var xform = $(layero).find('.layui-layer-content form[class~=mm-form]');
                }
                xform.append('<input type="hidden" name="layer_index" value="' + index + '">');
                xform.submit();
                return false;
            },
            cancel: function (index) { //或者使用btn2
                //按钮【按钮二】的回调
                ////console.info(index);
                if(colse_callback!==false) {
                    eval(colse_callback);
                }
                reloadjs();
            },
            success: function (layero, index) {
                /*var xform = $(layero).find('.layui-layer-content form[class~=ajax-form]');
                 if(xform.length==0){
                 var xform = $(layero).find('.layui-layer-content form[class~=mm-form]');
                 }
                 xform.append('<input type="hidden" name="layer_index" value="' + index + '">');*/
                reloadjs();
                $dialogsResizeFull($(layero));
            }

        });
    };
    $reTableHeight = function (xthis, vheight) {
        var wHeight = $(window).height();
        $(xthis).attr("style", "overflow:auto;height:" + (wHeight - $(xthis).closest('.tab-content').find('.top-search').height() - vheight) + "px")
    }
    /** 全屏的部局 **/
    $dialogsResizeFull = function (e) {
        //console.info('弹出后',e);
        ///如果是带左侧搜索框的部局
        var h = $(e).height()-82;
        var hbody = $(e).height()-50;
        $(e).find('.mmy-left-search .mmy-items').height(h);
        $(e).find('.mmy-left-search-body').height(hbody);
        var wbody=$(e).width() - $(e).find('.mmy-left-search').outerWidth()-12;
        var wbody_left  =$(e).find('.mmy-left-search').outerWidth()+8;
        //console.info($(e).width(),wbody,wbody_left);
        $(e).find('.mmy-left-search-body').width(wbody).css('left',wbody_left);
    }
    /** 收起左侧搜索 **/
    $mmyDialogsLeftSearch=function(e){
        if($(e).closest('.mmy-left-search').width()=='36'){
            $(e).closest('.mmy-left-search').width(170);
        }else{
            $(e).closest('.mmy-left-search').width(36);
        }
        $(e).closest('.mmy-left-search').find('.mmy-left-search-shou').toggle();
        $(e).closest('.mmy-left-search').find('.mmy-left-search-kai').fadeToggle();
        $dialogsResizeFull($(e).closest('.layui-layer'));
    }
    /** 转换数字为金额大写 **/
    $numToCny = function (currencyDigits) {
        var MAXIMUM_NUMBER = 99999999999.99;  //最大值
        // 定义转移字符
        var CN_ZERO = "零";
        var CN_ONE = "壹";
        var CN_TWO = "贰";
        var CN_THREE = "叁";
        var CN_FOUR = "肆";
        var CN_FIVE = "伍";
        var CN_SIX = "陆";
        var CN_SEVEN = "柒";
        var CN_EIGHT = "捌";
        var CN_NINE = "玖";
        var CN_TEN = "拾";
        var CN_HUNDRED = "佰";
        var CN_THOUSAND = "仟";
        var CN_TEN_THOUSAND = "万";
        var CN_HUNDRED_MILLION = "亿";
        var CN_DOLLAR = "元";
        var CN_TEN_CENT = "角";
        var CN_CENT = "分";
        var CN_INTEGER = "整";

        // 初始化验证:
        var integral, decimal, outputCharacters, parts;
        var digits, radices, bigRadices, decimals;
        var zeroCount;
        var i, p, d;
        var quotient, modulus;

        // 验证输入字符串是否合法
        if (currencyDigits.toString() == "") {
            //alert("还没有输入数字");
            //$("#Digits").focus();
            return;
        }
        //判断是否输入有效的数字格式
        var reg = /^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/;
        if (!reg.test(currencyDigits)) {
            //alert("请输入有效格式数字");
            //$("#Digits").focus();
            return;

        }

        currencyDigits = currencyDigits.replace(/,/g, "");
        currencyDigits = currencyDigits.replace(/^0+/, "");
        //判断输入的数字是否大于定义的数值
        if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            alert("您输入的数字太大了");
            //$("#Digits").focus();
            return;
        }

        parts = currencyDigits.split(".");
        if (parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
            decimal = decimal.substr(0, 2);
        }
        else {
            integral = parts[0];
            decimal = "";
        }
        // 实例化字符大写人民币汉字对应的数字
        digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
        radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
        bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
        decimals = new Array(CN_TEN_CENT, CN_CENT);

        outputCharacters = "";
        //大于零处理逻辑
        if (Number(integral) > 0) {
            zeroCount = 0;
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1;
                d = integral.substr(i, 1);
                quotient = p / 4;
                modulus = p % 4;
                if (d == "0") {
                    zeroCount++;
                }
                else {
                    if (zeroCount > 0) {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    outputCharacters += digits[Number(d)] + radices[modulus];
                }
                if (modulus == 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                }
            }
            outputCharacters += CN_DOLLAR;
        }
        // 包含小数部分处理逻辑
        if (decimal != "" && decimal != "00") {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1);
                //if (d != "0" || decimal.substr(1, 1)!="0") {
                outputCharacters += digits[Number(d)] + decimals[i];
                //}
            }
        }
        //确认并返回最终的输出字符串
        if (outputCharacters == "") {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        if (decimal == "" || decimal == "00") {
            outputCharacters += CN_INTEGER;
        }

        //获取人民币大写
        //$("#getCapital").val(outputCharacters);
        return outputCharacters;
    }
    /*** 使用ajax加载数据到指定目标 ***/
    $ajaxload = function (xurl, target) {
        if (target != undefined && target != '') {
            var index = layer.msg('加载中...', {time: 15 * 1000, shade: 0.0, scrollbar: false, icon: 16}); //正在加载的框，并且设定最长等待30秒
            $(target).load(xurl, function () {
                layer.close(index); //关闭加载框
                //layer.msg('加载完成', {time: 1 * 1000}); //加载完成，3秒关闭
                reloadjs();
            });
        } else {
            layer.msg('未设置 target');
        }

    }
    /**加载一个饼型的数据图表 **/
    $('.pie-charts').each(function () {
        var e = $(this);
        var data_url = e.attr('data-url');
        if (data_url != undefined && data_url != '') {
            $.get(data_url, function (data) {
                var charts_pram = {
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: data.title,
                    },
                    subtitle: {
                        text: data.sub_title,
                        style: {
                            color: "#000",
                            fontWeight: "bold"
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: e.attr('data-name'),
                        data: eval("(" + data.data + ")"),
                    }]
                };
                e.highcharts(charts_pram);

            });
        }
    });
    /**加载一个折线型的数据图表 **/
    $('.line-charts').each(function () {
        var e = $(this);
        var data_url = e.attr('data-url');
        if (data_url != undefined && data_url != '') {
            $.get(data_url, function (data) {
                var charts_pram = {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: data.title
                    },
                    subtitle: {
                        text: data.sub_title
                    },
                    xAxis: {
                        categories: eval("(" + data.xaxis_categories + ")")
                    },
                    yAxis: {
                        title: {
                            text: data.yaxis_title
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
                    },
                    series: eval("(" + data.data + ")")
                };
                e.highcharts(charts_pram);

            });
        }
    });
    /**点击向上滑动**/
    $('.touxiang').click(function () {
        $('.bounceInUp').show();
    });
    /**
     * 微信上传图片的类
     */
    $('.wx-imgupload').each(function () {
        var purl = '/wget/wximgupload/index';
        var e = $(this);
        var data_name = e.attr('name');
        var data_title = e.attr('data-title');
        var data_img = (e.attr('data-img') != '') ? (e.attr('data-img')) : ('/imgs/easyicon.png');
        e.wrap('<div class="wx-' + data_name + '"></div>');
        var e_div = $('.wx-' + data_name);
        var html_str = '<img src="' + data_img + '" class="wx-img-' + data_name + '" style="max-width:50%;">';
        e_div.append(html_str);
        e_div.unbind('click');
        e_div.click(function () {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    for (var i = 0; i < localIds.length; i++) {
                       //console.info(localIds[i]);
                        //调用微信上传
                        wx.uploadImage({
                            localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                var localId = res.localId; // 服务器返回图片的本地地址
                                //e_div.children('.wx-img-'+data_name).attr('src',localId);
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                ////console.info('上传成功的id',serverId);
                                purl = purl + '?media_id=' + serverId + '&img_input_name=' + data_name;
                                //访问服务器下载地址，获得服务器上存放的图片的img库的id
                                $.get(purl, function (data) {

                                    if (data.status == 'n') {
                                        layer.msg(data.info);
                                        return false;
                                    }
                                    $('input[name=' + data.data.img_input_name + ']').val(data.data.imgs_id);
                                    $('img.wx-img-' + data.data.img_input_name + '').attr('src', data.data.thumb_img_url);
                                    layer.msg("图片上传完成");
                                });
                            }
                        });
                    }
                }
            });
        });
    });
    $showImg = function (imgurl, width, height) {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 1,
            area: [width, height],
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: '<img src="' + imgurl + '" style="width:100%;height:auto;">'
        });
    }
}
$(function () {
    reloadjs();
});
/**
 * 根据生日获取年龄
 * @param null $birthday
 * @return int
 */
function get_age(birthday) {
    var strs = new Array(); //定义一数组
    strs = birthday.split("-"); //字符分割

    var year = strs[0];
    var month = strs[1];
    var day = strs[2];
    var the_date = new Date();
    year_diff = the_date.getFullYear() - year;
    month_diff = the_date.getMonth() + 1 - month;
    day_diff = the_date.getDate() - day;
    if (month_diff == 0) {
        if (day_diff < 0) {
            year_diff--;
        }
    } else if (month_diff < 0) {
        year_diff--;
    }
    return year_diff;
}
/**
 * 根据身份证身份证识别生日
 * @param xthis
 */
function getBirthdayByCardno(cardno) {
    //获取出生日期
    var birthday = cardno.substring(6, 10) + "-" + cardno.substring(10, 12) + "-" + cardno.substring(12, 14);
    return birthday;
}

/**
 * 查询CSV导出状态
 */
$exportStatus = function (xthis, name) {
    var url = $(xthis).attr('export-url');
    $.get(url+"/"+name,{},function(data){
        if (data.status == 0) {
            $('.'+name+'1').show();
            $('.'+name+'2').hide();
            $('.'+name+'3').hide();
        }else if(data.status == 1){
            $('.'+name+'1').hide();
            $('.'+name+'2').show();
            $('.'+name+'3').hide();
        }else{
            $('.'+name+'1').show();
            $('.'+name+'2').hide();
            $('.'+name+'3').show();
        }
    })
}

/**
 * 清除CSV文件
 */
$exportClean = function (xthis) {
    var url = $(xthis).attr('clean-url');
    $.get(url);
    layer.closeAll();
}

/**检查是不是IE9以下的版本**/
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}
var ieversion = IEVersion();
if(ieversion==6 || ieversion==7 || ieversion==8 || ieversion==9 ){
    window.location.href="/tips";
}
/**
*xiang列表全选
*/
function xLlbQx(xthis){
    if($(xthis).children('div').html()==''){
            $(xthis).children('div').html('<div class="x12 xtgl_dx_xz"></div>');
            $($(xthis).attr('target-id')).children('div').html('<div class="x12 xtgl_dx_xz"></div>');
            $($(xthis).attr('target-id')).children('input').prop('checked','checked');
        }else{
            $(xthis).children('div').html('');
            $($(xthis).attr('target-id')).children('div').html('');
            $($(xthis).attr('target-id')).children('input').removeProp('checked');
        }
}
/**
*xiang列表单选
*/
function xLlbDx(xthis){
    if($(xthis).children('div').html()==''){
           $(xthis).children('div').html('<div class="x12 xtgl_dx_xz"></div>');
           $(xthis).children('div').next('input').prop('checked','checked');
        }else{
           $(xthis).children('div').html('');
           $(xthis).children('div').next('input').removeProp('checked');
        }
        var qb_td_num=0;
        var xz_td_num=0;
        $('.'+$(xthis).attr('class')).children('div').each(function(){
            qb_td_num += 1;
            if($(this).html()!=''){
                xz_td_num += 1;
            }
        })
        //判断是不是全部选中
        if(qb_td_num==xz_td_num){
            $($(xthis).attr('target-id')).children('div').html('<div class="x12 xtgl_dx_xz"></div>');
        }else{
            $($(xthis).attr('target-id')).children('div').html('');
        }
}
/** 一些问题的提示框 **/
$mmyTips= function(str){
    var strv = '<div class="padding text-small">'+str+'</div>';
    layer.open({content:strv,area: ['420px', '240px'],type: 1, skin:'layui-layer-demo', closeBtn: 0, anim: 2, shadeClose: true});
}
//表格用上下左右键切换
function cjcgd_price_calculation(){
    $(document).unbind('keyup').keyup(function (event) {
        var xthis = $('input:focus');
        if (event.keyCode==37) {//左键
            xthis.closest('td').prevAll('td').find('input').last('input').focus();return;
        }else if(event.keyCode==38){//上键
            xthis.closest('tr').prev('tr').children('td').find('input[data-filed='+xthis.attr('data-filed')+']').focus();return;
        }else if(event.keyCode==39){//右键
            xthis.closest('td').nextAll('td').find('input').first('input').focus();return;
        }else if(event.keyCode==40){//下键
            xthis.closest('tr').next('tr').children('td').find('input[data-filed='+xthis.attr('data-filed')+']').focus();return;
        }
    });
}
//简单版表格用上下左右键切换
function jb_sxzy(xthis,event){
    if (event.keyCode==37) {//左键
            xthis.closest('td').prevAll('td').find('input').last('input').focus();return;
        }else if(event.keyCode==38){//上键
            xthis.closest('tr').prev('tr').children('td').find('input[data-filed='+xthis.attr('data-filed')+']').focus();return;
        }else if(event.keyCode==39){//右键
            xthis.closest('td').nextAll('td').find('input').first('input').focus();return;
        }else if(event.keyCode==40){//下键
            xthis.closest('tr').next('tr').children('td').find('input[data-filed='+xthis.attr('data-filed')+']').focus();return;
        }
}
//输入时先验证是否是数字
function yz_input(xthis){
    if(isNaN(xthis.val())){
        layer.msg('请准确输入信息', {time: 3000}); //检查输入的是不是数字
        return false;
    }
}
//点击搜索按钮时将已经存在的商品数据传输起走
function getTableList(xthis,str){
    var barcode_ids = '';
    for (var m = 0; m < eval(str).length; m++) {
        barcode_ids += eval(str)[m].barcode_id+",";
    }
    var urls = $(xthis).attr('data-url')+'&barcode_ids='+encodeURIComponent(barcode_ids);
    $(xthis).attr('data-url',urls);
}
function mmy_active(xthis){
        //console.info($(xthis).closest('ul').find('li').html());
        $(xthis).closest('ul').find('li').removeClass('x_tab');
        $(xthis).addClass('x_tab');
        $(xthis).closest('div[class~=mmy-left-search-kai]').children('div[class~=xtab]').hide();
        $(xthis).closest('div[class~=mmy-left-search-kai]').children('div[class~='+$(xthis).attr('data-val')+']').show();
    }
//-----------------------------------------------下面是分类搜索-------------//

function search_goods_category(){
        $('.goods-categroy-search').find('.category-list').each(function () {
            $(this).next('ul').hide();
            if($(this).next('ul').children('li').length==0){
                $(this).children('form').children('div').first().html('<span class="budian"><img src="/imgs/flico3.png" /></span>');
            }
        });
    }
    //点击时候把自己下面的ul展开或关闭
    function xCategoryIco(xthis){
        if($(xthis).attr('class')=="guanbi"){
            $(xthis).addClass('hidden');
            $(xthis).closest('div').children('span').first().removeClass('hidden');
            $(xthis).closest('li').children('ul').show();
        }
        if($(xthis).attr('class')=="zankai"){
            $(xthis).addClass('hidden');
            $(xthis).next('span').removeClass('hidden');
            $(xthis).closest('li').children('ul').hide();
        }
    }
    function xCategoryName(xthis){
        if($(xthis).attr('data-val')=='1'){
            //展开的同时加载出对应分类的商品数据
            $str = '';
            $(xthis).closest('div[class~=x_tab_2]').prev().find('label').each(function(){
                if($(this).find('input').attr('type')=='text' || $(this).find('input').attr('type')=='hidden'){
                    $str += '<input type="text" name="'+$(this).find('input').attr('name')+'" value="'+$(this).find('input').val()+'">';
                }
                if($(this).find('input').attr('type')=='radio' || $(this).find('input').attr('type')=='checkbox'){
                    if($(this).find('input').prop('checked')==true){
                        $str += '<input type="text" name="'+$(this).find('input').attr('name')+'" value="'+$(this).find('input').val()+'" checked="checked">';
                    }
                }
            })
            $(xthis).children('div').html($str);
        }
        if($(xthis).attr('data-val')=='fl'){
            $('#data-category_id').val($(xthis).children('input[name=category_id]').val());
        }else{
            var category_id = '';
            $(xthis).closest('li').find('li').each(function(){
                category_id += $(this).children('div').attr('data-category_id')+',';
            })
            var idStr = category_id+$(xthis).closest('li').children('div').attr('data-category_id');
            $('#data-category_id').val(encodeURIComponent(idStr));
            $(xthis).children('input[name=category_id]').val(encodeURIComponent(idStr));
        }
        if($(xthis).attr('data-val')=='1'){
        }else{
            $(xthis).children('input[name=c_s_id]').val($('input[id=goods-set-c_s_id]').val());
            $(xthis).children('input[name=s_d_id]').val($('input[id=goods-set-s_d_id]').val());
            $(xthis).children('input[name=xtype]').val($('input[id=goods-cg-sx-xtype]').val());
            $(xthis).children('input[name=fields]').val($('input[id=goods-cg-sx-fields]').val());
            $(xthis).children('input[name=keyword]').val($('input[id=goods-cg-sx-keyword]').val());
        }
        //console.info(idStr);
        $('.qbCategoryName').removeClass('button_bg_color');
        $('.goods-categroy-search').find('.category-list').find('button').removeClass('button_bg_color');
        $(xthis).children('button').addClass('button_bg_color');
    }
    function qbCategoryName(xthis){
        //$(xthis).next('button').click();
        if($(xthis).attr('data-val')=='1'){
            //展开的同时加载出对应分类的商品数据
            $str = '';
            $(xthis).closest('div[class~=x_tab_2]').prev().find('label').each(function(){
                if($(this).find('input').attr('type')=='text' || $(this).find('input').attr('type')=='hidden'){
                    $str += '<input type="text" name="'+$(this).find('input').attr('name')+'" value="'+$(this).find('input').val()+'">';
                }
                if($(this).find('input').attr('type')=='radio' || $(this).find('input').attr('type')=='checkbox'){
                    if($(this).find('input').prop('checked')==true){
                        $str += '<input type="text" name="'+$(this).find('input').attr('name')+'" value="'+$(this).find('input').val()+'" checked="checked">';
                    }
                }
            })
            $(xthis).children('div').html($str);
        }
        $('.goods-categroy-search').find('.category-list').find('button').removeClass('button_bg_color');
        $(xthis).find('button').addClass('button_bg_color');
        $('#data-category_id').val('');
    }
    function qkDelData(xthis){
        $(xthis).closest('form').find('input[id=goods-set-c_s_id]').val('');
        $(xthis).closest('form').find('input[id=goods-set-gs_name]').val('');
        $(xthis).closest('form').find('input[id=goods-set-s_d_id]').val('');
        $(xthis).closest('form').find('input[id=goods-set-bm_name]').val('');
        //$(xthis).closest('form').find('input[id=goods-cg-sx-xtype]').val('');
        $(xthis).closest('form').find('input[id=goods-cg-sx-keyword]').val('');
    }
//----------点击分类搜索给自己前面加上分类id------//
function secvv(xthis){
        var $xbut = $(xthis).closest('div[class~=x_tab_1]').next('div').find('button[class~=button_bg_color]');
        if($xbut.attr('data-val')!=''){
            var $str = '<input type="hidden" name="category_id" value="'+$xbut.attr('data-val')+'">';
            $(xthis).prev().html($str);
        }else{
            $(xthis).prev().html('');
        }
    }
//数组按某个字段排序
    function compare(property){
                            return function(a,b){
                                var value1 = a[property];
                                var value2 = b[property];
                                return value1 - value2;
                            }
                        }
//自动生成付款单-参数的显示与隐藏
function autoAddFkd(xthis){
    if($(xthis).find('input').prop('checked')==false){
        $(xthis).find('input').prop('checked',false);
        $(xthis).find('input').val(1);
        $(xthis).next('div').hide();
    }else{
        $(xthis).find('input').prop('checked',true);
        $(xthis).find('input').val(2);
        $(xthis).next('div').show();
    }

}