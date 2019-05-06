Feature: tabs verification

    @delete-all-courses
    Scenario: Verify that Instructor is able to see all the tabs 
        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object   | value                  |
            | course_type   | Template               |
            | product_model | Read & Practice        |
            | course_name   | Read Template          |
            | course_code   | E2E 401                |
            | isbn_number   | 9781464199411          |
            | course_status | draft                  |

        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Read Template                                               |true |
            | edit_course_code | E2E 401                                                     |true |
            | template_status  | Active On Date                                              |     |

        And I verify the course_list data
            | page_object             | value           |
            | course_name             | Read Template   |
            | course_name_course_code | E2E 301         |
            | course_name_isbn        | 9781464199411   |
        
        And I fill out the form to copy a course
            | page_object       | value                         | clear |
            | copy_course       | Read & Practice course Test   | true  |
            | copy_course_code  | E2E301                        | true  |
        And I close the popup message

        Given I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Read & Practice course Test" input 
        And I assign "instructor_1" to the course

        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"

        And I click on "course" system "create_course" feature "course_card" element 

        Then I verify the data in course page 
            | course_page            | clear |
            | overview               | true  |
            | course_planner         | true  |
            | gradebook              | true  |
          

         
