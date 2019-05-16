Feature: Student attempts all the activities in Quantitative
    @delete-all-courses
    Scenario: Verify that Student is able to attempt activities of a Instructor created course created from Quantitative Template

        Given I login to Achieve-CW as "media_producer_1"
        When I fill out the form to create course
            | page_object        | value                         |clear|
            | course_type        | Template                     |     |
            | product_model      | Quantitative                 |     |
            | learning_objective | Principles of Microeconomics |     |
            | course_name        | Qualitative Testcourse       |true |
            | course_code        | E2E 301                      |true |
            | isbn_number        | 9781464199497                |true |
            | course_status      | draft                        |     |
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Qualitative Testcourse                                      |true |        
            | edit_course_code | E2E 301                                                     |true |
            | template_status  | Active On Date                                              |     |
    
        And I close the popup message

        And I click on course card   
        And I click on resource tab
        And I add the activity to the course under the resources tab
            | activity                                                          | type                      |
            | Exercise: Misused words 1 (autoscored)                            | add_button_assessment     |
            | LC1551301608988                                                   | add_button_learningcurve  |

        And I click on home button to return to coursepage
        And I fill out the form to copy a course
            | page_object       | value                        |clear|
            | copy_course       | Qualitative Testcourse test  |true |
            | copy_course_code  | E2E301                       |true |

        And I close the popup message

        And I sign out of Achieve
        And I click login to the Achieve product
        And I login to Achieve-CW as "customer_support_1"
        
        And I click on search button and input "Qualitative Testcourse test" to search the course
        And I assign "instructor_1" to the course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I fill out the form to update the status of course to active 
            | page_object      | value                        | clear |
            | edit_course_name | Qualitative Testcourse test  | true  |
            | edit_course_code |  E2E301                      | true  |
            | template_status  |  Active On Date              |       |
    
        And I close the popup message
        And I click on course card
        And I create custom made activity
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
            | Exercise: Misused words 1 (autoscored)                            | true   | 5      | 
            | LC1551301608988                                                   | true   | 5      | 
 

        And I sign out of Achieve
        And I login to Achieve-CW as "admin_1"
        And I click on search button and input "Qualitative Testcourse test" to search the course 
        And I enroll the "student_1" in the course 
        And I close the popup message 
        And I sign out of Achieve

        And I login to Achieve-CW as "student_1" 

        And I attempt premade assesment and custom made activity
            |  Activity                                |  PremadeAssesmentKey                                                                                                       |   customMadeActivity    |
            |  Exercise: Misused words 1 (autoscored)  |   Because Anne Tyler often writes about family loyalties, her allusions to to King Lear are not surprising.                |      1000               |
            |  Qual Test                               |   Designers of handheld devices understand that changes in ambient temperatures can damage the tiny circuit boards.        |                         |
            |                                          |   The Keweenaw Peninsula is surrounded on three sides by Lake Superior.                                                    |                         |           
            |                                          |   At the cooking school in Tuscany, I learned that rosemary is a perfect complement to lamb.                               |                         |
            |                                          |  The person who complained to the human resources manager wishes to remain anonymous.                                      |                         |
        
        When I attempt learning curve activity
            | activity          |
            | LC1551301608988   |


        When I click on reading activity
            | activity                                      |
            | Communicating courteously and professionally  |
        
        Then I verify reading activity has content to read
            | activity                                      |
            | Communicating courteously and professionally  |

        And I verify the activity status as completed once the student attempt the activities
            | activity                                      | status    |
            | Exercise: Misused words 1 (autoscored)        | Complete  |
            | Qual Test                                     | Complete  | 
            | LC1551301608988                               | Complete  | 
            | Communicating courteously and professionally  | Complete  |


        And I verify the assignmenent grades in gradebook for below assigned activities
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 1%                   |
            | Qual Test                                     |  100%       | 5       | 1%                   |
            | LC1551301608988                               |  100%       | 5       | 1%                   |
            | Communicating courteously and professionally  |   100%      | 5       | 1%                   | 

        When I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"
        And I click on course card 

        Then I verify the assignmenent grades in gradebook for below assigned activities
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 1%                   |
            | Qual Test                                     |  100%       | 5       | 1%                   |
            | LC1551301608988                               |  100%       | 5       | 1%                   |
            | Communicating courteously and professionally  |   100%      | 5       | 1%                   | 

        When I sign out of Achieve
        And I login to Achieve-CW as "admin_1"
        And I click on search button and input "Qualitative Testcourse test" to search the course 
        And I click on course card 

        Then I verify the assignmenent grades in gradebook for below assigned activities
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 1%                   |
            | Qual Test                                     |  100%       | 5       | 1%                   |
            | LC1551301608988                               |  100%       | 5       | 1%                   |
            | Communicating courteously and professionally  |   100%      | 5       | 1%                   |   