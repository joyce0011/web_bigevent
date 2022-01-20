$(function () {
     // 调用 getUserInfo 获取用户基本信息
    getUserInfo();
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
  
            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
    


})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            
      // 调用 renderAvatar 渲染用户的头像
          renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
      // 1. 获取用户的名称
    let name = user.nickname || user.username;
    // 2. 设置欢迎的文本
    // 在html代码中，使用转义字符&nbsp表示1个空格，而使用转义字符&amp表示 &。 html() 方法返回或设置被选元素的内容 (inner HTML)。
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    
     // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像  attr() 方法设置或返回被选元素的属性和值。
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()


    }
    
}
