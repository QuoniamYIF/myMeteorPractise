Meteor.startup(function(){
	  ServiceConfiguration.configurations.remove({
	    service: "qq"
	  });
	  ServiceConfiguration.configurations.insert({
	    service: "qq",
	    clientId: "<your-client-id>",
	    scope:'get_user_info',
	    secret: "<your-client-secret>"
	  });
		process.env.MAIL_URL = "smtp://Quoniam_test_N4HxN4:BYEPz1BniKr0XQmB@smtpcloud.sohu.com:25";
});

Meteor.publish("courses", function(){
    return Courses.find();
});