
(function () {
    require.config({ // 模块路径
        paths: {
            m1: './modules/m1',
            m2: './modules/m2',
            jquery: './jquery'
        }
    })

    require(['m2','jquery'],function(m2,$){
        m2.show();
        $('body').css('backgroundColor', '#000');
    });
}());