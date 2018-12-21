const config = require("../../config.js");


function achieve_base() {
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `https://int-achieve-${config.environment}-courseware-frontend.mldev.cloud`
  } else {
    return `https://${config.environment}-achieve-courseware-frontend.mldev.cloud`
  }
};

function learningcurve_base() {
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `https://int-learning-curve-${config.environment}-learningcurve.mldev.cloud`
  } else {
    return `https://${config.environment}-learning-curve-learningcurve.mldev.cloud`
  }
};

function uat_base() {
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `https://int-achieve-${config.environment}-uat-learningcurve.mldev.cloud`
  } else {
    return `https://${config.environment}-achieve-uat-learningcurve.mldev.cloud`
  }
};

function courseware_base() {
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `https://int-achieve-${config.environment}-learningcurve.mldev.cloud`
  } else {
    return `https://${config.environment}-achieve-learningcurve.mldev.cloud`
  }
};

function courseware_login() {
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `/login?retURL=https://int-achieve-${config.environment}-courseware-frontend.mldev.cloud/courses`
  } else {
    return `/login?retURL=https://${config.environment}-achieve-courseware-frontend.mldev.cloud/courses`
  }
};

function courseware_register() {
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `/register?retURL=https%3A%2F%2Fint-achieve-${config.environment}-courseware-frontend.mldev.cloud%2Fcourses`
  } else {
    return `/register?retURL=https%3A%2F%2F${config.environment}-achieve-courseware-frontend.mldev.cloud%2Fcourses`
  }
};


module.exports = {
  achieve: {
    base: achieve_base(),
    login: achieve_base() + "/start"
  },
  courseware: {
    login: courseware_base() + courseware_login(),
    register: courseware_base() + courseware_register(),
    lcrp: courseware_base() + "/lcrp"
  },
  learningcurve: {
    base: learningcurve_base(),
    lcrp: learningcurve_base() + "/lcrp"
  },
  uat: {
    base: uat_base(),
    lcrp: uat_base() + "/lcrp"
  },
  savi: {
    saviverification: "http://savipo2.saplinglearning.me/ibiscms/mod/flcn/view.php?id=4195376",
    loginurl: "https://savipo2.saplinglearning.me/ibiscms/login/",
    assignment: "https://savipo2.saplinglearning.me/sac/#/1396//-1",
    standalone: "https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=5667507739001"
  },
  third_party: {
    base: "http://accounts.google.com/signin/v2"
  }
}