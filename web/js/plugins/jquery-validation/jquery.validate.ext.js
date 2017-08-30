/**
 * Created by 1 on 2015/7/24.  数据验证扩展
 */


// 中文字两个字节
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
    var length = value.length;
    for(var i = 0; i < value.length; i++){
        if(value.charCodeAt(i) > 127){
            length++;
        }
    }
    return this.optional(element) || ( length >= param[0] && length <= param[1] );
}, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");

/* 追加自定义验证方法 */
// 身份证号码验证
jQuery.validator.addMethod("isIdCardNo", function(value, element) {
    var IDCard = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    return this.optional(element) ||  (IDCard.test(value));
}, "请输入正确的身份证号码");

// 字符验证
jQuery.validator.addMethod("userName", function(value, element) {
    return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
}, "用户名只能包括中文字、英文字母、数字和下划线");

// 手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    return this.optional(element) || (length == 11 && /^[1][3,4,5,8]\d{9}$/g.test(value));
}, "请输入正确的手机号码");

// 电话号码验证
jQuery.validator.addMethod("isPhone", function(value, element) {
    //var tel = /(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)/;
    var tel = /(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)/;
    return this.optional(element) || (tel.test(value));
}, "请输入正确的电话号码");

// 邮政编码验证
jQuery.validator.addMethod("isZipCode", function(value, element) {
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
}, "请输入正确的邮政编码");