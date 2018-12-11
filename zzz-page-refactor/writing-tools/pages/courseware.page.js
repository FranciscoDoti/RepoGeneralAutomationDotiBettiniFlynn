/* eslint-disable camelcase */

const Page = require('marvin-js').Page;

exports.CoursewarePage = class extends Page {
    things() {
        return {
            username: {
                desc: `courseware username`,
                locator: `[id='email']`
            },
            password: {
                desc: `courseware password`,
                locator: `[id='Password']`
            },
            login_button: {
                desc: `courseware login button`,
                locator: `[id='signIn']`
            },
            writing_course: {
                locator: `[class*='_1f3R'] div:nth-child(2) div:nth-child(245) a`
            },
            resources_tab: {
                locator: `[class*='_2_TT'] li:nth-child(2)`
            },
            create_activity_button: {
                locator: `[class*='_20yN']`
            },
            create_activity_link: {
                locator: `[class*='_36XY']`
            },
            create_writing_activity: {
                locator: `[class*='_2L1E'] div:nth-child(2)`
            },
            test_assignment: {
                locator: `[class*='_3Jn1']`
            },
            user_menu: {
                locator: `[class*='gz_l']`
            },
            sign_out_button: {
                locator: `[class*='_1pVO'] div:nth-child(2)`
            }
        };
    }
};
