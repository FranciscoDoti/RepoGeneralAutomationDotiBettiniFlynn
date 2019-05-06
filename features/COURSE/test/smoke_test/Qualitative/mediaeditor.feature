Feature: Media editor creates Template for Qualitative 


Scenario: Verify that a Media Editor is able to create a Qualitative Template
 
    Given I click login to the Achieve product
    And I have logged in as "media_editor_1"
    And I click on "course" system "create_course" feature "plus_button" element

    When I fill out the form to edit a new course
      | page_object        | value                        |
      | course_type        | Template                     |
      | product_model      | Qualitative                  |
      | learning_objective | Principles of Economics      |
      | course_name        | Qualitative Template TC      |
      | course_code        | E2E 302                      |
      | isbn_number        | 9039532434843                |
      | course_status      | draft                        |

    Then I verify "course" system "create_course" feature "success_message" element's "create_course_Qual_media" message is displayed
    And I click on "course" system "course_list" feature "search" element "Qualitative Template TC" input
   And I verify that the course "isbn" "9039532434843 " is listed on the courses page
   