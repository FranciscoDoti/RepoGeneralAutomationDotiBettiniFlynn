Feature: Updating Draft Template to Template
@delete-all-courses
Scenario: Verify that a Media Producer is able to create a Read & Practice Course
        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a new course
        | page_object   | value                    |
        | course_type   | Template                 |
        | product_model | Read & Practice          |
        | course_name   | Read & Practice Template |
        | course_code   | E2E 301                  |
        | isbn_number   | 9781464199411            |
        | course_status | draft                    |
    And I close the popup message
  
    And I fill out the form to update the template from draft to Template
        | page_object      | value                                                       |clear|
        | edit_course_name | Read & Practice Template                                    |true |
        | edit_course_code | E2E 301                                                     |true |
        | template_status  | Active On Date                                              |     |
    

    Then I verify "course" system "create_course" feature "success_message" element's "edit_course_sucess" message is displayed
    And I verify the course_list data
        | page_object             | value                    |
        | course_name             | Read & Practice Template |
        | course_name_course_code | E2E 301                  |
        | course_name_isbn        | 9781464199411            |
        
        
