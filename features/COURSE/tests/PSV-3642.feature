Feature: Student attempts all the activities in Quantitative
    @delete-all-courses
    Scenario: Verify that Student is able to attempt activities of a Instructor created course created from Quantitative Template

        # Given I login to Achieve-CW as "media_producer_2"
        # When I create coourse with the data 
        #     | page_object        | value                        |
        #     | course_type        | Template                     |
        #     | product_model      | Quantitative                 |
        #     | course_name        | Qualitative TC               |
        #     | learning_objective | Principles of Microeconomics |
        #     | course_code        | E2E 301                      |
        #     | isbn_number        | 9781464199498                |
        #     | course_status      | draft                        |

        # And I update the "Qualitative TC" template from draft to active with the following data
        #     | page_object      | value                                                       |
        #     | edit_course_name | Qualitative TC                                              |       
        #     | edit_course_code | E2E 301                                                     |
        #     | template_status  | Active On Date                                              |

        # And I add the activity to "Qualitative TC" course under the resources tab
        #     | activity                                                          | type                      |
        #     | Exercise: Misused words 1 (autoscored)                            | add_button_assessment     |
        #     | LC1551301608988                                                   | add_button_learningcurve  |
        #     |Communicating courteously and professionally                       | add_reading_button        |

        # And I click on home button to return to coursepage
        # And I copy course from the "Qualitative TC" template with the following data
        #     | page_object       | value                        |
        #     | copy_course       | Qualitative TC test          |
        #     | copy_course_code  | E2E301                       |

        # And I sign out of Achieve
        # And I login to Achieve-CW as "customer_support_1"

        # And I assign "instructor_2" to the "Qualitative TC test" course
        
        # And I sign out of Achieve
        And I login to Achieve-CW as "instructor_2"

        # When I update the "Qualitative TC test" course from draft to Active with following data 
        #     | page_object      | value                        |
        #     | edit_course_name | Qualitative TC test          |
        #     | edit_course_code |  E2E301                      |
        #     | template_status  |  Active On Date              |
    
        And I create custom made activity in "Qualitative TC test" with the following data
            | activity           | value                                    |
            | Assignment_tittle  | Qual Test                                |
            | Assignment_type    | Test                                     |
            # | taxonomy           | Interactive General Chemistry V1         |
     
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
        And I enroll the "student_1" in "Qualitative TC test" course 
        And I close the popup message 
        And I sign out of Achieve

        And I login to Achieve-CW as "student_1" 

        And I attempt "Exercise: Misused words 1 (autoscored)" premade assesment in "Qualitative TC test"
            |  PremadeAssesmentKey                                                                                                       |   
            |  Because Anne Tyler often writes about family loyalties, her allusions to King Lear are not surprising.                    |  
            |   Designers of handheld devices understand that changes in ambient temperatures can damage the tiny circuit boards.        | 
            |   The Keweenaw Peninsula is bordered on three sides by Lake Superior.                                                      |         
            |  At the cooking school in Tuscany, I learned that rosemary is a perfect complement to lamb.                                |   
            |  The person who complained to the human resources manager wishes to remain anonymous.                                      |

        And I attempt "Qual Test" custom made assesment in "Qualitative TC test"
            |  key           |
            |  1             |


        When I attempt "LC1551301608988" learning curve activity
              | Key            |
              | Correct Answer |


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


        And I verify the assignmenent grades in gradebook for below assigned activities in "Qualitative TC test"
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 1%                   |
            | Qual Test                                     |  100%       | 5       | 1%                   |
            | LC1551301608988                               |  100%       | 5       | 1%                   |
            | Communicating courteously and professionally  |   100%      | 5       | 1%                   | 

        When I sign out of Achieve
        And I login to Achieve-CW as "instructor_2"
        And I click on course card 

        Then I verify the assignmenent grades in gradebook for below assigned activities in "Qualitative TC test"
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 1%                   |
            | Qual Test                                     |  100%       | 5       | 1%                   |
            | LC1551301608988                               |  100%       | 5       | 1%                   |
            | Communicating courteously and professionally  |   100%      | 5       | 1%                   | 

        When I sign out of Achieve
        And I login to Achieve-CW as "admin_1"
        And I click on search button and input "Qualitative TC test" to search the course 
        And I click on course card 

        Then I verify the assignmenent grades in gradebook for below assigned activities in "Qualitative TC test"
            | activity                                      | percentage  | points  | PercentOfTotalgrades  |
            | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 33%                   |
            | Qual Test                                     |  100%       | 5       | 33%                   |
            | LC1551301608988                               |  100%       | 5       | 33%                   |
            | Communicating courteously and professionally  |   100%      | 5       | 33%                   |   