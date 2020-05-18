<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>赛格指定赛报名入口</title>
        <link rel="stylesheet" href="/css/common/bootstrap.min.css">
        <link rel="stylesheet" href="/css/common/Myalert.css" type="text/css"/>
        <script src="/js/common/jquery.min.js"></script>
        <script src="/js/common/bootstrap.min.js"></script>
        <script src="/js/common/Myalert.js"></script>
        <!-- Styles -->
        <style>
            .header{
                margin-top: 20px;
                text-align: center;
                font-size: 16px;
            }
        </style>
    </head>
    <body>
        <div class="main">
            <div class="container">
                <div class="header">
                    <p>赛格指定赛报名入口</p>
                </div>
                <form action="/" method="post" class="form-controller">
                    <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
                    <div class=""form-group mt41>
                        <label for="name" class="col-sm-3 control-label">您的姓名</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="name" name="name" placeholder="请输入您的姓名(必填)" maxlength="20">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="bird_no" class="col-sm-3 control-label">脚环号</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="bird_no" name="bird_no" placeholder="请输入脚环号(必填)" maxlength="100">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="remark" class="col-sm-3 control-label">备注</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="remark" name="remark" placeholder="备注(非必填)" maxlength="100">
                        </div>
                    </div>
                    <button type="button" id="save" class="btn btn-primary" data-loading-text="提交中...">提交</button>
                </form>
            </div>
        </div>
    </body>
    <script>
$(function () {
    var consult = new consultEvent();
    consult.clickEvent();
})
function consultEvent() {
    var self = this;
    self.clickEvent = function () {
        $("#save").click(self.save);

    };
    self.save = function () {
        let name        = $("#name").val();
        let bird_no      = $("#bird_no").val();
        let remark   = $("#remark").val();
        let _token   = $("#_token").val();
        if(bird_no == "" || name == ""){
            popupalert('请填写姓名和脚环号','notice','');
            return;
        }
        $.ajax({
            url:'/api/enroll/add',
            type:'post',
            data:{
                name:name,
                bird_no:bird_no,
                remark:remark,
                _token:_token
            },
            dataType:'json',
            success:function (res) {
               if(res.code == 0){
                   popupalert('提交成功','message',function () {
                       window.location.reload();
                   })
               }else {
                   popupalert('提交失败','error','');
                   return;
               }
            },
            error:function (e) {
                console.log('error:'+e);
            }
        })
    };
}
</script>
</html>
