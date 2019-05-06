Feature: Instructor creates course from the Quantitative template

    @delete-all-courses
    Scenario: Verify that instructor is able to create a Instructor created course from Quantitative Template

    Given I click login to the Achieve product
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a new course
       | page_object                   | value                                       |
       | course_type                   | Template                                    |
       | product_model                 | Quantitative                                |
       | course_name                   | Quantitative Template                       |
       | learning_objective            | macmillan calculus                          |
       | course_code                   | E2E 302                                     |
       | isbn_number                   | 9781464199411                               |
       | course_status                 | Draft                                       |
    And I close the popup message

    And I fill out the form to update the template from draft to Template
      | page_object      | value                                                       |clear|
      | edit_course_name | Quantitative Template                                       |true |
      | edit_course_code | E2E 302                                                     |true |
      | template_status  | Active On Date                                              |     |
    And I close the popup message
     
     Then I verify the course_list data
      | page_object             | value                       | 
      | course_name             | Quantitative Template       | 
      | course_name_course_code | E2E 302                     |
      | course_name_isbn        | 9781464199411               |

    And I click on "course" system "create_course" feature "course_card" element  
    And I click on "course" system "course_page" feature "resources" element
    And I add the activity to the course under the resources tab
        | activity                                                          | type                      |
        |Exercise: Misused words 1 (autoscored)                                         | add_button_assessment     |
        | Chapter 15. Monopolistic Competition and Product Differentiation  | add_button_learningcurve  |

    And I click on "course" system "main" feature "achieve_home" element 
    And I fill out the form to copy a course
      | page_object       | value                    |clear|
      | copy_course       | Quantitative Testcourse  |true |
      | copy_course_code  | E2E302                   |true |

    And I close the popup message

    And I "sign_out" of Achieve
    And I click login to the Achieve product
    And I have logged in as "customer_support_1"
        
    And I click on "course" system "course_list" feature "search" element "Quantitative Testcourse" input 
    And I assign "instructor_1" to the course
    
    And I "sign_out" of Achieve
    And I click login to the Achieve product 
    And I have logged in as "instructor_1"


    When I select template and create course with following details

        | page_object             |  value                    | clear |
        | copy_course             |  Quantitative Instructor  | true  |
        | copy_course_code        |  E2E302                   | true  |
  

    Then I verify that the course's name "Quantitative Instructor" is listed on the courses page
