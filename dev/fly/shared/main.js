Meteor.methods({
  addCourse: function(source){
    Courses.insert(source);
  },
  findCourses: function(){
    console.log("be used!");
    var courses = Courses.find();
    console.log(courses);
    return courses;
  },
});