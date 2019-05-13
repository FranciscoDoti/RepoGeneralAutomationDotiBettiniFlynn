Feature: Student attempts all the activities
    @delete-all-courses
    Scenario: Verify that Student is able to attempt activities of a Instructor created course created from Quantitative Template

        
    Given I click login to the Achieve product
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a new course
      | page_object        | value                   |clear|
      | course_type        | Template                |     |
      | product_model      | Qualitative             |     |
      | learning_objective | Principles of Economics |     |
      | course_name        | Qualitative Testcourse  |true |
      | course_code        | E2E 301                 |true |
      | isbn_number        | 9781464199497           |true |
      | course_status      | draft                   |     |
    And I close the popup message

    And I fill out the form to update the template from draft to Template
      | page_object      | value                                                       |clear|
      | edit_course_name | Qualitative Testcourse                                      |true |        
      | edit_course_code | E2E 301                                                     |true |
      | template_status  | Active On Date                                              |     |
    
    And I close the popup message

    And I click on "course" system "create_course" feature "course_card" element  
    And I click on "course" system "course_page" feature "resources" element
    And I add the activity to the course under the resources tab
        | activity                                                          | type                      |
        | Exercise: Misused words 1 (autoscored)                            | add_button_assessment     |
        | LC1551301608988                                                   | add_button_learningcurve  |

    And I click on "course" system "main" feature "achieve_home" element 
    And I fill out the form to copy a course
      | page_object       | value                        |clear|
      | copy_course       | Qualitative Testcourse test  |true |
      | copy_course_code  | E2E301                       |true |

    And I close the popup message

    And I "sign_out" of Achieve
    And I click login to the Achieve product
    And I have logged in as "customer_support_1"
        
    And I click on "course" system "course_list" feature "search" element "Qualitative Testcourse test" input 
    And I assign "instructor_1" to the course
        

    And I "sign_out" of Achieve
    And I click login to the Achieve product 
    And I have logged in as "instructor_1"

     When I fill out the form to update the status of course to active 
        | page_object      | value                        | clear |
        | edit_course_name | Qualitative Testcourse test  | true  |
        | edit_course_code |  E2E301                      | true  |
        | template_status  |  Active On Date              |       |
    
    And I close the popup message
    And I click on "course" system "create_course" feature "course_card" element
    When I create custom made activity
        | activity           | value                                    |
        | Assignment_tittle  | Qual Test                                |
        | Assignment_type    | Test                                     |
        | taxonomy           | Interactive General Chemistry V1         |
     
    And I add the activities in courseplanner
        | activity                                                          | 
        | Exercise: Misused words 1 (autoscored)                            |                                                        
        | LC1551301608988                                                   |
        
    And I add custom made activities in courseplanner
        | activity                           |
        | Qual Test                          |

    And I assign the activities in courseplanner
        | activity                                                          | verify | Points | 
        | Qual Test                                                         | true   | 5      |
        | Exercise: Misused words 1 (autoscored)                              | true   | 5      | 
        | LC1551301608988                                                   | true   | 5      | 
 

    And I "sign_out" of Achieve
    And I click login to the Achieve product
    And I have logged in as "admin_1"
        
    And I click on "course" system "course_list" feature "search" element "Qualitative Testcourse test" input 
    And I enroll the "student_6" in the course  
    
        
    And I click on "course" system "home" feature "close_alert" element 

    And I "sign_out" of Achieve
    And I click login to the Achieve product
    And I have logged in as "student_6"


    And I attemt premade assesment and custom made activity
        |  Activity                                |  PremadeAssesmentKey                                                                                                       |   customMadeActivity    |
        |  Exercise: Misused words 1 (autoscored)  |   Because Anne Tyler often writes about family loyalties, her allusions to to King Lear are not surprising.                |      1000               |
        |  Qual Test                               |   Designers of handheld devices understand that changes in ambient temperatures can damage the tiny circuit boards.        |                         |
        |                                          |   The Keweenaw Peninsula is surrounded on three sides by Lake Superior.                                                    |                         |           
        |                                          |   At the cooking school in Tuscany, I learned that rosemary is a perfect complement to lamb.                               |                         |
        |                                          |  The person who complained to the human resources manager wishes to remain anonymous.                                      |                         |
    Then I verify that "premadeAssesment" activity status as completed 
    And I verify that "customMadeAssesment" activity status as completed 
    And I verify the gradebook status

    When I attempt learning curve activity
        | activity          |
        | LC1551301608988   |

    Then I verify that "learningCurve" activity status as completed 
    And I verify the gradebook status

    When I click on reading activity
        | activity                                      |
        | Communicating courteously and professionally  |
        
    Then I verify reading activity has content to read
        | activity                                      |
        | Communicating courteously and professionally  |

    Then I verify that "Reading" activity status as completed 
    And I verify the gradebook status
