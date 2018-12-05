const config = require("../../config.js");

let url, base;


function getUrl(page, endpoint) {
  let pageset = page.toLowerCase();
  let end = endpoint.toLowerCase();

  switch (pageset) {
    case 'achieve':
      if (config.environment === 'preprod' || config.environment === 'demo') {
        base = `https://int-achieve-${config.environment}-courseware-frontend.mldev.cloud`
      } else {
        base = `https://${config.environment}-achieve-courseware-frontend.mldev.cloud`
      }

      if (end === '' || end === 'base') {
        return url = base;
      } else {
        return url = base + "/start";
      };

    case 'courseware':
      if (end === 'login') {
        if (config.environment === 'preprod' || config.environment === 'demo') {
          base = `https://int-achieve-${config.environment}-iam.mldev.cloud/login?retURL=https://int-achieve-${config.environment}-courseware-frontend.mldev.cloud/courses`
        } else {
          base = `https://${config.environment}-achieve-iam.mldev.cloud/login?retURL=https://${config.environment}-achieve-courseware-frontend.mldev.cloud/courses`
        }

        return url = base;
      }
      if (end === 'register') {
        if (config.environment === 'preprod' || config.environment === 'demo') {
          base = `https://int-achieve-${config.environment}-iam.mldev.cloud/register?retURL=https%3A%2F%2Fint-achieve-${config.environment}-courseware-frontend.mldev.cloud%2Fcourses`
        } else {
          base = `https://${config.environment}-achieve-iam.mldev.cloud/register?retURL=https%3A%2F%2F${config.environment}-achieve-courseware-frontend.mldev.cloud%2Fcourses`
        }

        return url = base;
      };
      if (end === 'lcrp') {
        if (config.environment === 'preprod' || config.environment === 'demo') {
          base = `https://int-achieve-${config.environment}-learningcurve.mldev.cloud`
        } else {
          base = `https://${config.environment}-achieve-learningcurve.mldev.cloud`
        }

        return url = base + "/lcrp";
      };

    case 'learningcurve':
      if (config.environment === 'preprod' || config.environment === 'demo') {
        base = `https://int-learning-curve-${config.environment}-learningcurve.mldev.cloud`
      } else {
        base = `https://${config.environment}-learning-curve-learningcurve.mldev.cloud`
      }

      if (end === '' || end === 'base') {
        return url = base;
      } else {
        return url = base + "/lcrp";
      };

    case 'uat':
      if (config.environment === 'preprod' || config.environment === 'demo') {
        base = `https://int-achieve-${config.environment}-uat-learningcurve.mldev.cloud`
      } else {
        base = `https://${config.environment}-achieve-uat-learningcurve.mldev.cloud`
      }

      if (end === '' || end === 'base') {
        return url = base;
      } else {
        return url = base + "/lcrp";
      };

    case 'savi':
      if (end === 'saviverification') {
        return "http://savipo2.saplinglearning.me/ibiscms/mod/flcn/view.php?id=4195376";
      }
      if (end === 'loginurl') {
        return "https://savipo2.saplinglearning.me/ibiscms/login/";
      }
      if (end === 'assignment') {
        return "https://savipo2.saplinglearning.me/sac/#/1396//-1";
      }
      if (end === 'standalone') {
        return "https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=5667507739001";
      }

    case '3rdparty':
      return "http://accounts.google.com/signin/v2";

    default:
      break;
  }
}

module.exports = {
  getUrl: getUrl
};
