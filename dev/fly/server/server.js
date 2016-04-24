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
});

Meteor.publish("courses", function(){
    return Courses.find();
  });