var ZQ = {
    //region URL
    zqseturl: function (key, value, href) {
        var searchreg = new RegExp("&" + key + "=((?!&).)*&");
        var kvstr = key + "=" + value; //子串
        var anchor = ZQ.zqgetanchor(href); //拿到锚点
        href = href.replace(anchor, ''); //临时去掉锚点
        if (href.indexOf("?") === -1) {
            href += "?&";
        } else if (href.indexOf("?&") === -1) {
            href = href.replace("?", "?&");
        }
        if (href.right(1) !== "&") href += "&";
        if (value !== "") { //设置
            if (String.prototype.match.call(href, searchreg)) { //找到了
                href = String.prototype.replace.call(href, searchreg, "&" + kvstr + "&"); //替换子串
                href += anchor; //恢复锚点
            } else { //没找到
                href += kvstr + "&"; //拼接子串
                href += anchor; //恢复锚点
            }
        } else { //删除
            if (String.prototype.match.call(href, searchreg)) { //找到了
                href = String.prototype.replace.call(href, searchreg, "&");
                href += anchor; //恢复锚点
            } else { //没找到
            }
        }
        return href;
    },

    zqgetanchor: function (url) {
        url = url.match(/&?#.*$/g, "");
        if (url) {
            url = url[0];
            if (url.substr(0, 1) === "&") url = url.substr(1);
        } else {
            url = "";
        }
        url = url.replace(/[#]+/g, "#");
        return url;
    },

    zqsetanchor: function (anchor, url) {
        url = url.replace(/&?#.*$/g, "");
        url += "#" + anchor;
        return url;
    },

    zqgetMyQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    //endregion

    //#region 分页
    mypageprev: function (index) {
        var i = index ? index : "";
        var curpage = Number(ZQ.zqgetMyQueryString('page' + i));
        if (curpage > 1) {
            curpage--;
        }
        var url = ZQ.zqseturl('page' + i, curpage, location.href);
        location.href = url;
    },

    mypagenext: function (pgcount, index) {
        var i = index ? index : "";
        var curpage = Number(ZQ.zqgetMyQueryString('page' + i));
        curpage = curpage ? curpage : 1;
        if (curpage < Number(pgcount)) {
            curpage++;
        }
        var url = ZQ.zqseturl('page' + i, curpage, location.href);
        location.href = url;
    },

    mypageto: function (curpage, index) {
        var i = index ? index : "";
        var url = ZQ.zqseturl('page' + i, curpage, location.href);
        location.href = url;
    },
    //#endregion

    //#region 表单
    inputfileChange: function (extArrWithDot) {
        //在input[type=file]用call调用此方法，this代表input,如：inputfileChange.call(this,[])，扩展名数组别忘记带英文点
        //需要jquery支持
        var val = this.value.toLowerCase();
        var check = false;
        for (var i = 0; i < extArrWithDot.length; i++) {
            var extlen = extArrWithDot[i].length;
            var ext = extArrWithDot[i].toLowerCase();
            if (val.right(extlen) === ext) {
                check = true;
            }
        }
        if (check == false) {
            alert("文件格式错误！");
        } else {
            var par = jQuery(this).parent("*").eq(0);
            var name = jQuery(this).attr('name');
            var that = jQuery("<input type='file' name='" + name + "' />");
            jQuery(this).remove();
            par.prepend(that);
        }
    },
    //#endregion

    //#region 其他
    runInterval: function runInterval(intvalID, overcondition, intvalFunc, intval) {
        zqintval = typeof zqintval === "undefined" ? [] : zqintval;
        var over = overcondition;
        var func = intvalFunc;
        var int = intval;
        zqintval[intvalID] = setInterval(function () {
            if (eval("(" + over + ")") === true) {
                clearInterval(zqintval[intvalID]);
                zqintval[intvalID] = null;
            } else {
                func();
            }
        }, int);
    },
    zqdelHtmlTag: function (str) {
        return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
    },

    zqstrlen: function (str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    },
    getScrollWidth: function () {
        var odiv = document.createElement('div'),
            styles = {
                width: '100px',
                height: '100px',
                overflowY: 'scroll'
            },
            i, scrollbarWidth;
        for (i in styles) odiv.style[i] = styles[i];
        document.body.appendChild(odiv);
        scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;
        odiv.remove();
        return scrollbarWidth;
    }
    //#endregion

};
(function () {
//region 字符串
    String.prototype.left = function (length) {
        if (length <= this.length) {
            return this.substr(0, length);
        } else {
            return this;
        }
    };
    String.prototype.right = function (length) {
        if (length <= this.length) {
            return this.substr(this.length - length, length);
        } else {
            return this;
        }
    };
    String.prototype.substr_replace = function (location, str) {
        //location 0开始
        if (location <= this.length - 1) {
            var l = this.left(location);
            var r = this.replace(l, "");
            return (l + str + r);
        } else {
            return (this + str);
        }
    };
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    String.prototype.ltrim = function () {
        return this.replace(/(^\s*)/g, "");
    };
    String.prototype.rtrim = function () {
        return this.replace(/(\s*$)/g, "");
    };
    String.prototype.seturl = function (key, val) {
        return ZQ.zqseturl(key, val, this);
    };
    String.prototype.delHtmlTag = function () {
        return ZQ.zqdelHtmlTag(this);
    };
    String.prototype.strlen = function () {
        return ZQ.zqstrlen(this);
    };
    String.prototype.removeAnchor = function (key, val) {
        var anc = ZQ.zqgetanchor(this);
        return this.replace(anc, "", this);
    };
    String.prototype.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var str = "";
        if (this.indexOf("?&") !== -1)
            str = this.substr(this.indexOf("?&") + 2);
        else if (this.indexOf("?") !== -1)
            str = this.substr(this.indexOf("?") + 1);
        var r = str.match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    };
//endregion
})();