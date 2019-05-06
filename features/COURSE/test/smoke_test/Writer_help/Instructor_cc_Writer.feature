Feature: Instructor is able to create course from Writer's help template

    @delete-all-courses
    Scenario:Verify that Instructor is abke to create a course for writer's help course

       Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object   | value                           |
            | course_type   | Template                        |
            | product_model | Skills                          |
            | course_name   | Testcourse Writer's Help 3.0    |
            | course_code   | Test                            |
            | isbn_number   | 5015578884056                   |
            | course_status | Active On Date                  |
        And I close the popup message

        And I fill out the form to copy a course
            | page_object       | value                      | clear |
            | copy_course       | Skills Writer's Help 3.0   | true  |
            | copy_course_code  | Test                       | true  |
      
        And I close the popup message

        And I "sign_out" of Achieve
        Given I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Skills Writer's Help 3.0" input 
        And I assign "instructor_1" to the course
            
        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"

        When I select template and create course with following details
            | page_object             |  value                        | clear |
            | copy_course             |  Instructor Writer's Help 3.0 | true  |
            | copy_course_code        |  E2E305                       | true  |

        Then I verify that the course's name "Instructor Writer's Help 3.0" is listed on the courses page
