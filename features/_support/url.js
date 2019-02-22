const config = require('../../config.js');

const saplingBase = () => {
  let baseUrl = `http://${config.environment}.saplinglearning.me`;
  if (config.environment === 'local') {
    baseUrl = 'http://local.saplinglearning.me:8081';
  }
  return baseUrl;
}

const saplingBaseAssignmentId = () => {
  return config.sap;
}

const saplingBaseQuestionBank = () => {
  return saplingBase() + '/activityeditor/questionbank/' +
    saplingBaseAssignmentId();
}

const saplingLogin = () => {
  let loginUrl = 'ibiscms/login/';
  if (config.environment === 'local') {
    loginUrl = `activityeditor/questionbank/${saplingBaseAssignmentId()}`;
  }
  return loginUrl;
}

function achieve_base () {
  if (config.environment === 'local-achieve') {
    return `https://courseware-frontend.local-mml.cloud`;
  }
  if (config.environment === 'local') {
    return `http://courseware-local.mldev.cloud:3000`
  }
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `https://int-achieve-${config.environment}-courseware-frontend.mldev.cloud`
  } else {
    return `https://${config.environment}-achieve-courseware-frontend.mldev.cloud`
  }
};

function iam_base () {
  if (config.environment === 'local-achieve') {
    return `https://iam.local-mml.cloud`;
  }
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `https://int-achieve-${config.environment}-iam.mldev.cloud`
  } else {
    return `https://${config.environment}-achieve-iam.mldev.cloud`
  }
};

function learningcurve_base () {
  if (config.environment === 'local-achieve') {
    return `https://learningcurve.local-mml.cloud/`;
  }
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `https://int-learning-curve-${config.environment}-learningcurve.mldev.cloud`
  } else {
    return `https://${config.environment}-learning-curve-learningcurve.mldev.cloud`
  }
};

function uat_base () {
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `https://int-achieve-${config.environment}-uat-learningcurve.mldev.cloud`
  } else {
    return `https://${config.environment}-achieve-uat-learningcurve.mldev.cloud`
  }
};

function courseware_base () {
  if (config.environment === 'local-achieve') {
    return `https://courseware-frontend.local-mml.cloud`;
  }
  if (config.environment === 'local') {
    return `http://courseware-local.mldev.cloud:3000`
  }
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `https://int-achieve-${config.environment}-learningcurve.mldev.cloud`
  } else {
    return `https://${config.environment}-achieve-learningcurve.mldev.cloud`
  }
};

function courseware_login () {
  if (config.environment === 'local-achieve') {
    return `/login?retURL=https://courseware-frontend.local-mml.cloud/courses`;
  }
  if (config.environment === 'local') {
    return `/login?retURL=http://courseware-local.mldev.cloud:3000/courses`
  }
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `/login?retURL=https://int-achieve-${config.environment}-courseware-frontend.mldev.cloud/courses`
  } else {
    return `/login?retURL=https://${config.environment}-achieve-courseware-frontend.mldev.cloud/courses`
  }
};

function courseware_register () {
  if (config.environment === 'local-achieve') {
    return `/login?retURL=https%3A%2F%2Fcourseware-frontend.local-mml.cloud%2Fcourses`;
  }
  if (config.environment === 'local') {
    return `/register?retURL=http%3A%2F%2Fcourseware-local.mldev.cloud%3A3000%2Fcourses`
  }
  if (config.environment === 'preprod' || config.environment === 'demo') {
    return `/register?retURL=https%3A%2F%2Fint-achieve-${config.environment}-courseware-frontend.mldev.cloud%2Fcourses`
  } else {
    return `/register?retURL=https%3A%2F%2F${config.environment}-achieve-courseware-frontend.mldev.cloud%2Fcourses`
  }
};

function math_base () {
  if (config.environment === 'local') {
    return `http://local.saplinglearning.me:3080`
  } else if (config.environment === 'int' || config.environment === 'dev') {
    return `http://${config.environment}.saplinglearning.me`
  } else {
    return `https://int-achieve-${config.environment}-courseware-frontend.mldev.cloud`
  }
};

module.exports = {
  achieve: {
    base: achieve_base(),
    login: achieve_base() + '/start',
    user_creation: iam_base() + courseware_register()
  },
  courseware: {
    login: courseware_base() + courseware_login(),
    register: courseware_base() + courseware_register(),
    lcrp: courseware_base() + '/lcrp'
  },
  learningcurve: {
    base: learningcurve_base(),
    lcrp: learningcurve_base() + '/lcrp'
  },
  savi: {
    saviverification: 'http://savipo2.saplinglearning.me/ibiscms/mod/flcn/view.php?id=4195376',
    loginurl: 'https://savipo2.saplinglearning.me/ibiscms/login/',
    assignment: 'https://savipo2.saplinglearning.me/sac/#/1396//-1',
    standalone: 'https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=5667507739001'
  },
  math: {
    local: math_base() + '/login',
    int: math_base() + '/ams/'
  },
  sapling: {
    login: `${saplingBase()}/${saplingLogin()}`,
    empty_activity: `${saplingBase()}/activityeditor/assignment/${saplingBaseAssignmentId()}`,
    sapling_base_question_bank: saplingBaseQuestionBank()
  },
  third_party: {
    base: 'http://accounts.google.com/signin/v2'
  },
  uat: {
    base: uat_base(),
    lcrp: uat_base() + '/lcrp'
  }
}
