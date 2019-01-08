Feature: Qualitative Happy Path

  @delete-course
  Scenario: Verify that Media Producer is able to create Qualitative Template
    Given I login to Achieve
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a course
      | page_object        | value                   |
      | course_type        | Template                |
      | product_model      | Qualitative             |
      | learning_objective | Principles of Economics |
      | course_name        | Qual Testcourse         |
      | course_code        | E2E 301                 |
      | isbn_number        | 9781464199498           |
      | course_status      | draft                   |

    Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
    And I verify that the course "isbn" "9781464199498" is listed on the courses page


    When I click on "edit_course" on "Qual Testcourse" course menu

    And I fill out the form to edit a course
      | page_object     | value          |
      | template_status | Active On Date |


    And I add Activities to course "isbn" "9781464199498"
     | activity        |
     | Homework        |
     | Animation       |
     | Analyzing Drama |
     | Dedication      |
     | new test epub   |
     | AT1nov          |

    Then I validate data table courses populate the list


    When I click on "copy_course" on "Qual Testcourse" course menu
    And I fill out the form to edit a course
      | page_object     | value          |
      | course_name | Testcourse |

    Then I verify "course" system "create_course" feature "success_message" element's "course_copied" message is displayed


    When I logout of the achieve system
    And I click on "course" system "home" feature "sign_in" element
    And I have logged in as "customer_support_2"


    When I search for "E2E 301" course
    And I click on "manage_instructor" on "Qual Testcourse" course menu
    And I add "instructor_2" instructor's email to the course
    And I validate that the Course Specific Link opens the course named "Testcourse"
    And I click on "course" system "create_course" feature "add_instructor_close" element


    When I logout of the achieve system
    And I click on "course" system "home" feature "sign_in" element
    And I have logged in as "instructor_7"


    And I click on course settings
    ### use the edit course function
    And I elect to edit the course named "$course1.name"
    And I activate the course
    ###

    And I click on course settings
    Then I capture the invite link and store to variable "inviteLink"
    And I populate the Invite Students "student" page
    And I click on course card "Qual Testcourse" template present in instructor
    And I click on courseplanner
    And I click on show library button
    And I click on Custom content button
    And I click on create custom activity button
    And I click on Select activity Assesment Button
    And create a custom task by passing the values for Assesement 1
    And I validate Custom Assesement is created
    And I click on Add button to add activities
    And I change the course from unassigned to assign

    @skip @courseware-logout
    Scenario: Verify that user is able to delete the course
      When I have logged in as "media_producer_2"
      And I search for "Qual Testcourse"
      And I click on course settings
      And I click on delete the course
      And I search for "E301"
      And I click on course settings
      And I click on delete the course
