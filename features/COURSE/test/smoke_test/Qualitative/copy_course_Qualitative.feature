Feature: copy course from template 
  
  @delete-all-courses
  Scenario: Verify that Media Producer is able to edit a created Qualitative Template
    Given I click login to the Achieve product
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element
    When I fill out the form to edit a new course
        | page_object                   | value                                       |
        | course_type                   | Template                                    |
        | product_model                 | Qualitative                                 |
        | course_name                   | Qualitative Template                        |
        | learning_objective            | Principles of Microeconomics                |
        | course_code                   | E2E 302                                     |
        | isbn_number                   | 1547659765741                               |
        | course_status                 | Draft                                       |
    And I close the popup message
   
    And I fill out the form to update the template from draft to Template
      | page_object      | value                                                       |clear|
      | edit_course_name | Qualitative Template                                        |true |
      | edit_course_code | E2E 301                                                     |true |
      | template_status  | Active On Date                                              |     |
    And I close the popup message
    
    And I fill out the form to copy a course
      | page_object       | value                    |clear|
      | copy_course       | Qualitative Testcourse   |true |
      | copy_course_code  | E2E301                   |true |

    Then I verify "course" system "create_course" feature "success_message" element's "course_copied" message is displayed
  
    


