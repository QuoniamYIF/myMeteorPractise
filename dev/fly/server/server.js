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
		// process.env.MAIL_URL = "smtp://Quoniam_test_N4HxN4:BYEPz1BniKr0XQmB@smtpcloud.sohu.com:25";
		Accounts.config({sendVerificationEmail: true});
		Accounts.emailTemplates.siteName = "AwesomeSite";
		Accounts.emailTemplates.from = "AwesomeSite Admin <accounts@example.com>";
		Accounts.emailTemplates.enrollAccount.subject = function (user) {
				return "Welcome to Awesome Town, " + user.profile.name;
		};		
		Accounts.emailTemplates.resetPassword.from = function () {
			// Overrides value set in Accounts.emailTemplates.from when resetting passwords
			return "密码重置 <no-reply@flyall100.com>";
		};
		Accounts.emailTemplates.resetPassword.subject = function () {
			// Overrides value set in Accounts.emailTemplates.from when resetting passwords
			return "密码重置";
		};
		Accounts.emailTemplates.resetPassword.text = function (user, url) {
			// Overrides value set in Accounts.emailTemplates.from when resetting passwords
			return user.username + "请复制如下链接到浏览器中进行密码重置" + "\n\n" + url;
		};
		
		
});

Meteor.publish("courses", function(){
    return Courses.find();
});