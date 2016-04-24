var Glo = {};
Glo.content = new Array();
var chartNameCount = 0;
var chartName = ["第一章","第二章","第三章",
                            "第四章","第五章","第六章",
                            "第七章","第八章","第九章",
                            "第十章","第十一章","第十二章",
                            "第十三章","第十四章","第十五章",
                            "第十六章","第十七章","第十八章"];
var questionCount = 1;
var qBody = {};
var cBody = {};
var qContent = new Array();
var answers = new Array();
var resultAnswer = new Array();
var count = 1;
var currentQ = null;
var dataA = {
    labels : ["正确","错误"],
    datasets : [
        {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            data: [1,3]
        }
    ]
};
var dataB = {
    labels : ["正确","错误"],
    datasets: [
        {
            value: 30,
            color:"#F38630"
        },
        {
            value : 50,
            color : "#E0E4CC"
        },  
    ]
}

Meteor.subscribe("courses");

//路由
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    this.render('navbar', {
        to: "navbar"
    });
    this.render('main', {
        to: "main"
    });
    this.render('footer', {
        to: "footer"
    });
});

Router.route('/profileEdit', function () {
    this.render('navbar', {
        to: "navbar"
    });
    this.render('edit', {
        to: "main"
    });
    this.render('footer', {
        to: "footer"
    });
});

Router.route('/course/:id', function () {
    Session.set("courseid", this.params.id);
    // console.log(Session.get("courseid"));
    this.render('navbar', {
        to: "navbar"
    });
    this.render('modal', {
        to: "main"
    });
    this.render('footer', {
        to: "footer"
    });
});

Router.route('course/test1/:id', function () {
    Session.set("courseid", this.params.id);
    Session.set("chartCount", 0);
    // console.log(Session.get("courseid"));
    this.render('navbar', {
        to: "navbar"
    });
    this.render('test1', {
        to: "main"
    });
    this.render('footer', {
        to: "footer"
    });
});

Router.route('course/test2/:id', function () {
    Session.set("courseid", this.params.id);
    // console.log(Session.get("courseid"));
    this.render('navbar', {
        to: "navbar"
    });
    this.render('test2', {
        to: "main"
    });
    this.render('footer', {
        to: "footer"
    });
});

Router.route('/preview', function(){
    this.render('preview');
});

Router.route('/admin', function(){
    this.render('admin');
});
//end 路由


Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        Router.go('profileEdit');
    }
});

//$模板帮助函数设置$
Template.preview.helpers({
    courses: function(){
        return Courses.find();
    },
});

Template.main.helpers({
    courses: function(){
        // console.log(Courses.find());
        return Courses.find({}, {limit: 2});
    }
});

Template.modal.helpers({
    course: function(){
        return Courses.findOne({_id: Session.get("courseid")});
    }
});

Template.test1.helpers({
    course: function(){
        // console.log(Courses.findOne({_id: Session.get("courseid")}));
        // console.log(Courses.findOne({_id: Session.get("courseid")}).content[0].currentC);
        // Courses.findOne({_id: Session.get("courseid")}).content[0].currentC = false;
        return Courses.findOne({_id: Session.get("courseid")});
    },
    // chartOne: function(){
    //     // console.log(Courses.findOne({_id: Session.get("courseid")}));
    //     // var Course = Courses.findOne({_id: Session.get("courseid")});
    //     // console.log(Course);
    //     // var chartOne = Course.content[0].qC;
    //     // console.log(chartOne);
    //     console.log(Courses.findOne({_id: Session.get("courseid")}).content[0].qC);
    //     return Courses.findOne({_id: Session.get("courseid")}).content[0].qC;
    // },
});

Template.test2.helpers({
    course: function(){
          return Courses.findOne({_id: Session.get("courseid")});
    },
    count: function(){
        if(count < 10){
            return count++;
        } else {
            count = 1;
            return count++;
        }
    },
    vali: function(realNum){
        var num = Math.ceil(Math.random()*3);
        if(num == realNum){
            console.log("111");
            return true;
        } else {
            console.log("1112222");
            return false;
        }
    }
});

//^模板帮助函数设置结束^

//模板事件设置
Template.test2.events({
});

Template.admin.events({
    'blur .js-add-title': function(event){
        Glo.title = event.target.value;
    },
    'blur .js-add-description': function(event){
        Glo.description = event.target.value;
    },
    'click .js-finish-title': function(event){
        $("#content").empty().append(
            "<form  id=\"content\">"+
              "<div class=\"form-group\">"+
                "<label for=\"title\">章节名</label>"+
                "<input type=\"text\" class=\"form-control js-add-chartName\" id=\"title\" name=\"title\" required>"+
              "</div>"+
              "<button type=\"button\" class=\"btn btn-success js-finish-chartName\">下一步</button>"+
            "</form>"
        );
    },
    'blur .js-add-chartName': function(event){
        // Glo["content"]["chart" + chartNameCount] = {};
        // Glo["content"]["chart" + chartNameCount].cTitle = event.target.value;
        cBody.cTitle = event.target.value;
        // console.log(Glo[chartNameCount]);
     },
    'click .js-finish-chartName': function(event){
         $("#content").empty().append(
            "<form  id=\"content\">"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">题目内容</label>"+
                "<textarea name=\"questionContent\" id=\"questionContent\" cols=\"30\" rows=\"10\" class=\"form-control js-q-content\" placeholder=\"注意：如果此题是最后一题，请点击下一题后，再点击本章输入结束按钮\"></textarea>"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">选项A</label>"+
                "<input type=\"text\" class=\"form-control js-qA-content\" placeholder=\"选项A\">"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">选项B</label>"+
                "<input type=\"text\" class=\"form-control js-qB-content\" placeholder=\"选项B\">"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">选项C</label>"+
                "<input type=\"text\" class=\"form-control js-qC-content\" placeholder=\"选项C\">"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">选项D</label>"+
                "<input type=\"text\" class=\"form-control js-qD-content\" placeholder=\"选项D\">"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">正確选项</label>"+
                "<input type=\"text\" class=\"form-control js-qAnswer-content\" placeholder=\"填正确选项的内容\">"+
              "</div>"+
              "<button type=\"button\" class=\"btn btn-danger js-finish-cO\" style=\"margin-left:50px\">本课程题目输入结束</button>"+
              "<button type=\"button\" class=\"btn btn-primary js-finish-cH\" style=\"margin-left:50px\">本章题目输入结束</button>"+
              "<button type=\"button\" class=\"btn btn-success js-finish-q\" style=\"margin-left:50px\">下一题</button>"+
            "</form>"
        );
    },
    'blur .js-q-content': function(event){
        qBody.q = event.target.value;           
    },
    'blur .js-qA-content': function(event){
        qBody.qA = event.target.value;           
    },
    'blur .js-qB-content': function(event){
        qBody.qB = event.target.value;
    },
    'blur .js-qC-content': function(event){
        qBody.qC = event.target.value;
    },
    'blur .js-qD-content': function(event){
        qBody.qD = event.target.value;
        // console.log(qBody);
    },
    'blur .js-qAnswer-content': function(event){
        qBody.qAnswer = event.target.value;
        // console.log(qBody);
    },
    'click .js-finish-q': function(event){
        qBody.qCount = questionCount++;
        qContent.push(qBody);
        qBody = {};
        $("#content").empty().append(
            "<form  id=\"content\">"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">题目内容</label>"+
                "<textarea name=\"questionContent\" id=\"questionContent\" cols=\"30\" rows=\"10\" class=\"form-control js-q-content\"></textarea>"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">选项A</label>"+
                "<input type=\"text\" class=\"form-control js-qA-content\" placeholder=\"选项A\">"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">选项B</label>"+
                "<input type=\"text\" class=\"form-control js-qB-content\" placeholder=\"选项B\">"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">选项C</label>"+
                "<input type=\"text\" class=\"form-control js-qC-content\" placeholder=\"选项C\">"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">选项D</label>"+
                "<input type=\"text\" class=\"form-control js-qD-content\" placeholder=\"选项D\">"+
              "</div>"+
              "<div class=\"form-group\">"+
                "<label for=\"questionContent\">正確选项</label>"+
                "<input type=\"text\" class=\"form-control js-qAnswer-content\" placeholder=\"填正确选项的内容\">"+
              "</div>"+
              "<button type=\"button\" class=\"btn btn-danger js-finish-cO\" style=\"margin-left:50px\">本课程题目输入结束</button>"+
              "<button type=\"button\" class=\"btn btn-primary js-finish-cH\" style=\"margin-left:50px\">本章题目输入结束</button>"+
              "<button type=\"button\" class=\"btn btn-success js-finish-q\" style=\"margin-left:50px\">下一题</button>"+
            "</form>"
        );
        // console.log(Glo[chartNameCount]["chart" + chartNameCount]["Q" + (qCount)]);
        // console.log(Glo[chartNameCount]);
        // console.log(Glo);
    },
    'click .js-finish-cH': function(event){
        // console.log(qContent);
        // Glo["content"]["chart" + chartNameCount].qC = qContent;
        if(chartNameCount != 0){
            cBody.classN = "noDisplay";
        }
        cBody.cCount = chartNameCount;
        cBody.cName = chartName[chartNameCount++];
        cBody.qC = qContent;
        qContent = [];
        questionCount = 1;
        Glo["content"].push(cBody);
        cBody = {};
        $("#content").empty().append(
            "<form  id=\"content\">"+
              "<div class=\"form-group\">"+
                "<label for=\"title\">章节名</label>"+
                "<input type=\"text\" class=\"form-control js-add-chartName\" id=\"title\" name=\"title\" required>"+
              "</div>"+
              "<button type=\"button\" class=\"btn btn-success js-finish-chartName\">下一步</button>"+
            "</form>"
        );
    },
    'click .js-finish-cO': function(event){
        chartNameCount = 0;
        questionCount = 1;
        qBody = {};
        // console.log(Glo);
        Meteor.call("addCourse", Glo);
        // var nextStep = confirm("本课程已添加完毕，是否继续添加其他课程?");
        // if(nextStep){
        //     Router.go("admin");
        // } else {
        Router.go("preview");
        // }
    },
});

Template.test1.events({
    'click .js-toggle-chart': function(event){
        event.preventDefault();
        //console.log($(event.target));
        //console.log($(event.target).attr("id"));
        var dataChart = $(event.target).attr("id");
        var cLists = $(".chart");
        // console.log(cLists);
        for(var i = 0;i < cLists.length;i ++){
            cLists[i].className = "noDisplay" +" col-sm-12 col-md-7 chart";
            if(i == dataChart){
                cLists[i].className = ""+" col-sm-12 col-md-7 chart";
            }
        }
        Session.set("chartCount", $(event.target).attr("id"))
        // console.log($(event.target).attr("id"));
        // console.log(Session.get("chartCount"));
    },
    'click .js-add-option': function(event){
        var answer = $(event.target).val();
        // console.log("1:" + answer);
        // if($(event.target).attr('name').slice(-1) == 1){
        //     currentQ = $(event.target).attr('name');
        // }
        // if(currentQ != $(event.target).attr('name')){
        //      chooseCount = 0;
        // }
        // if(chooseCount == 0) {
        //     answers.push(answer);
        //     chooseCount++;
        // } else if(chooseCount != 0){
        //     answers.shift();
        //     answers.push(answer);
        // }
        answers[$(event.target).attr('name').slice(-1) - 1] = answer;
        // console.log("2:" +answers);
    },
    'click .js-check-answer': function(event){
        resultAnswer = new Array();
        var count = [0,0];
        // console.log(count);
        var course = Courses.findOne({_id: Session.get("courseid")});
        var currentChart = Session.get("chartCount");
        for(var i = 0;i < course.content[currentChart].qC.length;i ++){
            // console.log("for1:" + course.content[currentChart].qC[i].qAnswer);
            // console.log("for2:" + answers[i]);
            if(course.content[currentChart].qC[i].qAnswer == answers[i]) {
                resultAnswer.push(true);
                continue;
            }
            resultAnswer.push(false);
        }
        console.log( resultAnswer);
        for(var i = 0;i < resultAnswer.length;i ++){
            if(resultAnswer[i] == true){
                count[0] ++;
            } else {
                count[1] ++;
            }
        }
        // console.log(count);
        // console.log(resultAnswer);
        // console.log(course.content[currentChart].qC.length);
        // console.log(course.content[0].qC[0].qAnswer);
        //Get context with jQuery - using jQuery's .get() method.
        var ctx1 = $("#myChart1").get(0).getContext("2d");
        //This will get the first returned node in the jQuery collection.
        var myNewChart1 = new Chart(ctx1);
        // var ctx2 = $("#myChart2").get(0).getContext("2d");
        // var myNewChart2 = new Chart(ctx2);        
        dataA.datasets[0].data = count;
        myNewChart1.Bar(dataA);
        // myNewChart2.Pie(dataB);
        // console.log(count);
        // console.log(resultAnswer);
        // console.log(dataA.datasets.data);
        // console.log(dataA);
        // console.log(dataA.datasets.data);
        // myChart.Bar(dataA);
        // paint(myNewChart, dataA);
    },
});

//模板事件设置结束


//账户配置
accountsUIBootstrap3.setLanguage('zh-CN');

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});

Accounts.ui.config({
    forceEmailLowercase: true,
    forceUsernameLowercase: true,
    forcePasswordLowercase: true
});

Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'terms',
        fieldLabel: '我已阅读并接受飞百网用户协议',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('You must accept the terms and conditions.');
                return false;
            }
        }
    }]
});
//end 账户配置

//全局函数
function paint(myChart, data) {
        // var d = data;
        // console.log(data);
        // console.log(d.datasets.data);
        // console.log(d.datasets.data[0]);
        // console.log(d.datasets.data[1]);
        // d.datasets.data[0] = 3;
        // console.log(d);
        myChart.Bar(data);
}
