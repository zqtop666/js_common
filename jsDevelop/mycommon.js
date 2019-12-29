let ZQ = {
    //region URL
    zqsetkv: function (key, value, href) {
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
        anchor = anchor.replace('#', '');
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
        var url = ZQ.zqsetkv('page' + i, curpage, location.href);
        location.href = url;
    },

    mypagenext: function (pgcount, index) {
        var i = index ? index : "";
        var curpage = Number(ZQ.zqgetMyQueryString('page' + i));
        curpage = curpage ? curpage : 1;
        if (curpage < Number(pgcount)) {
            curpage++;
        }
        var url = ZQ.zqsetkv('page' + i, curpage, location.href);
        location.href = url;
    },

    mypageto: function (curpage, index) {
        var i = index ? index : "";
        var url = ZQ.zqsetkv('page' + i, curpage, location.href);
        location.href = url;
    },
    //#endregion

    //#region 其他
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
    String.prototype.setkv = function (key, val) {
        return ZQ.zqsetkv(key, val, this);
    };
    String.prototype.setanchor = function (anchor) {
        var urlremoveanchor=this.removeanchor();
        return ZQ.zqsetanchor(anchor, urlremoveanchor);
    };
    String.prototype.getanchor = function () {
        return ZQ.zqgetanchor(this);
    };
    String.prototype.removeanchor = function () {
        var anchor = ZQ.zqgetanchor(this);
        return this.replace(anchor, "", this);
    };
    String.prototype.delhtmltag = function () {
        return ZQ.zqdelHtmlTag(this);
    };
    String.prototype.strlen = function () {
        return ZQ.zqstrlen(this);
    };
    String.prototype.getquerystring = function (name) {
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

export default ZQ;
