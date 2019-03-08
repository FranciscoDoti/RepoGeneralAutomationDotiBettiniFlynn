Feature: Happy path flow for Read and Practice

    @delete-course
    Scenario: Verify that a Media Producer is able to create a Read & Practice Course
        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the create course form
            | page_object   | value                    |
            | course_type   | Template                 |
            | product_model | Read & Practice          |
            | course_name   | Read & Practice Template |
            | course_code   | E2E 301                  |
            | isbn_number   | 9781464199498            |
            | course_status | draft                    |


        Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
        And I verify that the course's name "Read & Practice Template" is listed on the courses page

        When I fill out the edit course form
            | page_object      | value                                                       | clear |
            | edit_course_name | Edit Testcourse                                             | true  |
            | edit_course_code | E2E 301                                                     | true  |
            | ebook_link       | https://int-achieve-courseware-frontend.mldev.cloud/courses | true  |
            | template_status  | Active On Date                                              |       |

        Then I verify "course" system "create_course" feature "success_message" element's "edit_course_sucess" message is displayed
        And I verify the course_list data
             | value           |
             | Edit Testcourse |
             | E2E 301         |
             | 9781464199498   |

        When I navigate to the course page "resources" tab

        Then I verify the data in "resources"
            | course_page      |
            | share_template   |
            | import_structure |
            | add_folder       |

        #WE'RE HERE
        And I add the activity to the course under the resources tab
            | activity                  | type                       |
            | communicating courteously | add_reading_button         |
            | Active and Passive voice  | add_button_learningcurve   |
            | Wars of Religion          | add_button_readandpractice |
      #
      #   Then I verify the activity list
      #       | activity                     |
      #       | communicating courteously    |
      #       | Active and Passive voice     |
      #       | Wars of Religion             |
      #
      #
      #   And I fill out the form to copy a course
      #   And I fill out the course form
      #       | page_object       | value                    |
      #       | copy_course       | Read & Practice course   |
      #       | copy_course_code  | E2E301                   |
      #
      #   Then I verify "course" system "create_course" feature "success_message" element's "course_copied" message is displayed
      #
      #   And I "sign_out" of Achieve
      #   And I click login to the Achieve product
      #   And I have logged in as "customer_support_1"
      #
      #   And I click on "course" system "course_list" feature "search_for_course_name" element "Edit TestcourseRead & Practice course" input
      #   And I assign Instructor to the course
      #       | username                     | password   |
      #       | kabimigom@digitalmail.info   | ABCabc@123 |
      #     #  | cofikada@webmails.top | ABCabc@123 |
      #
      #   And I "sign_out" of Achieve
      #   And I click login to the Achieve product
      #   And I have logged in as "instructor_7"
      #
      #
      #   Then I verify that the course's name "COPY OF Edit TestcourseRead & Practice course" is listed on the courses page
      #
      #   When I fill out the form to update the template from draft to Template
      #   And I fill out the course form
      #       | page_object      | value                |
      #       |  course          |  Read& Practice      |
      #       |  course_code     |   E2E301             |
      #       | template_status  |  Active On Date      |
      #   And I do the other thing
      #
      #   Then I verify "course" system "create_course" feature "success_message" element's "course_activation" message is displayed
      #   And I verify that the course "COPY OF Edit TestcourseRead & Practice course" is "course_activation"
      #
      #   And I invite the students
      #       | username                    |
      #       | macmillanstudent5@gmail.com |
      #
      #   Then I verify "course" system "create_course" feature "success_message" element's "email_notification" message is displayed
      #
      #   And I add the activities in courseplanner
      #       | activity                                                          |
      #       | communicating courteously                                         |
      #       | Active and Passive voice                                          |
      #       | Wars of Religion                                                  |
      #
      #   Then I verify activity list
      #       | activity                     |
      #       | communicating courteously    |
      #       | Active and Passive voice     |
      #       | Wars of Religion             |
      #
      #
      #
      #
      # And I click on the course planner to assign the activity and add points
      #   |   Activity                    |   Points  |
      #   |  Active and Passive voice     |   5       |
      #
      #   Then I verify "activity_status" as open
      #
      #   And I "sign_out" of Achieve
      #   And  I click login to the Achieve product
      #   And I have logged in as "admin_1"
      #
      #  And I click on "course" system "course_list" feature "search_for_course_name" element "COPY OF Edit TestcourseRead & Read& Practice" input
      #  And I enroll the student in the course
      #  | username                    |
      #  | macmillanstudent5@gmail.com |
      #  And I click on "course" system "home" feature "close_alert" element
      #
      #   And I "sign_out" of Achieve
      #   And I click login to the Achieve product
      #   And I have logged in as "student_4"
      #
      #   Then I verify that the course's name "COPY OF Edit TestcourseRead & Practice course" is listed on the courses page
      #
      #   When I attempt the activity present in courseware
      #       | Activity                 | success | sleep |
      #       | Active and Passive Voice | true    | 2     |
      #
      #
      #   Then I verify grades in Gradebook for following activities
      #       | activity                                                          | type               |
      #       | communicating courteously                                         | Reading            |
      #       | Active and Passive voice                                          | learning_curve     |
      #       | Wars of Religion                                                  | Read and Practice  |
