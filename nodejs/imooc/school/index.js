var klass = require('./klass')

export.add = function(klasses) {
  klasses.forEach(function(item, id) {
    var _klass = item
    var teacherName = item.teacherName
    var students = item.students
    
    klass.add(teacherName, students)
  })

  
}
