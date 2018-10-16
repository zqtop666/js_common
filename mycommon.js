//region URL
function seturl(key, value, href) {
    if (href.indexOf('?') === -1) href += '?';
    var searchreg = new RegExp("&?" + key + "=((?!&).)*&?");
    var kvstr = "&" + key + "=" + value; //子串
    if (value !== "") { //设置
        if (String.prototype.match.call(href, searchreg)) { //找到了
            var anchor = getanchor(href); //拿到锚点
            href = href.replace(anchor, ''); //临时去掉锚点
            href = String.prototype.replace.call(href, searchreg, kvstr + "&"); //替换子串
            if (href.substr(href.length - 1, 1) === "&") href = href.substr(0, href.length - 1); //最后为&时，去掉
            if (href.substr(href.length - 1, 1) === "?" && href.indexOf("&") === -1) href = href.substr(0, href.length - 1); //最后为?时，去掉
            href += anchor; //恢复锚点
        }
        else { //没找到
            var anchor = getanchor(href); //拿到锚点
            href = href.replace(anchor, ''); //临时去掉锚点
            if (href.substr(href.length - 1, 1) === "&") href = href.substr(0, href.length - 1); //最后为&时，去掉
            href += kvstr; //拼接子串
            //if (href.substr(href.length - 1, 1) === "?" && href.indexOf("&") === -1) href = href.substr(0, href.length - 1); //最后为?时，去掉
            href += anchor; //恢复锚点
        }
    } else { //删除
        if (String.prototype.match.call(href, searchreg)) { //找到了
            var anchor = getanchor(href); //拿到锚点
            href = href.replace(anchor, ''); //临时去掉锚点
            href = String.prototype.replace.call(href, searchreg, "&");
            if (href.substr(href.length - 1, 1) === "&") href = href.substr(0, href.length - 1); //最后为&时，去掉
            if (href.substr(href.length - 1, 1) === "?" && href.indexOf("&") === -1) href = href.substr(0, href.length - 1); //最后为?时，去掉
            href += anchor; //恢复锚点
        }
        else { //没找到
            if (href.substr(href.length - 1, 1) === "&") href = href.substr(0, href.length - 1); //最后为&时，去掉
            if (href.substr(href.length - 1, 1) === "?" && href.indexOf("&") === -1) href = href.substr(0, href.length - 1); //最后为?时，去掉
        }
    }
    return href;
}

function getanchor(url) {
    url = url.match(/&?#.*$/g, "");
    if (url) {
        url = url[0];
        if (url.substr(0, 1) === "&") url = url.substr(1)
    }
    else
        url = "";

    url = url.replace(/[#]+/g, "#");
    return url;
}

function setanchor(anchor, url) {
    url = url.replace(/&?#.*$/g, "");
    url += "#" + anchor;
    return url;
}

function getMyQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

//endregion

//#region 分页
function mypageprev(index) {
    var i = index ? index : "";
    var curpage = Number(getMyQueryString('page' + i));
    if (curpage > 1) {
        curpage--;
    }
    var url = seturl('page' + i, curpage, location.href);
    location.href = url;
}

function mypagenext(pgcount, index) {
    var i = index ? index : "";
    var curpage = Number(getMyQueryString('page' + i));
    curpage = curpage ? curpage : 1;
    if (curpage < Number(pgcount)) {
        curpage++;
    }
    var url = seturl('page' + i, curpage, location.href);
    location.href = url;
}

function mypageto(curpage, index) {
    var i = index ? index : "";
    var url = seturl('page' + i, curpage, location.href);
    location.href = url;
}

//#endregion

//#region 表单
function inputfileOnChange(extArrWithDot) {
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
}

//#endregion

//#region 其他
function runInterval(intvalID, overcondition, intvalFunc, intval) {
    zqintval = typeof zqintval === "undefined" ? [] : zqintval;
    var over = overcondition;
    var func = intvalFunc;
    var int = intval;
    zqintval[intvalID] = setInterval(function () {
        if (eval("(" + over + ")") === true) {
            clearInterval(zqintval[intvalID]);
            zqintval[intvalID] = null;
        }
        else {
            func();
        }
    }, int);
}

function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
}

//#endregion

//region 字符串
String.prototype.left = function (length) {
    if (length <= this.length) {
        return this.substr(0, length);
    }
    else {
        return this;
    }
};
String.prototype.right = function (length) {
    if (length <= this.length) {
        return this.substr(this.length - length, length);
    }
    else {
        return this;
    }
};
String.prototype.insertStr = function (location, str) {
    //location 0开始
    if (location <= this.length - 1) {
        var l = this.left(location);
        var r = this.replace(l, "");
        return (l + str + r);
    }
    else {
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
String.prototype.setURL = function (key, val) {
    return seturl(key, val, this);
};
String.prototype.removeAnchor = function (key, val) {
    var anc = getanchor(this);
    return this.replace(anc, "", this);
};
String.prototype.delHtmlTag = function () {
    return delHtmlTag(this);
};
//endregion
