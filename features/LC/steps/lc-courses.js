
var courses = {}

const addCourse = function (courseId) {
  courses[courseId] = {
    'student1': {},
    'student2': {}
  }
};

const getCourseById = function (courseId) {
  return courses[courseId];
};

const getCourses = function () {
  return courses;
};

const addAssignment = function (courseId, user, assignmentId) {
  courses[courseId][user][assignmentId] =
  {
    attempt: -1,
    scores: []
  };
};

const getAssignment = function (courseId, user, assignmentId) {
  return courses[courseId][user][assignmentId];
}

const addAttempt = function (courseId, user, assignmentId) {
  courses[courseId][user][assignmentId].scores.push({
    'currentScore': 0,
    'totalPossible': 0,
    'targetScore': 0
  })
  courses[courseId][user][assignmentId].attempt++;
}

const getCurrentAttempt = function (courseId, user, assignmentId) {
  return courses[courseId][user][assignmentId].scores[courses[courseId][user][assignmentId].attempt]
}

const getStudentInfo = function (courseId, user) {
  return courses[courseId][user];
}

module.exports = {
  addCourse,
  getCourseById,
  getCourses,
  addAssignment,
  getAssignment,
  addAttempt,
  getCurrentAttempt,
  getStudentInfo
}
