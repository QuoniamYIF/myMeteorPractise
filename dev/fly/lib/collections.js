Courses = new Mongo.Collection("courses");

Courses.allow({
    remove: function(userId, doc) {
        return true;
    },
    insert: function(userId, doc){
        return true;  
    },
    update: function(userId, doc){
        return true;  
    },
});