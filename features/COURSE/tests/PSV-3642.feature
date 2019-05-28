Feature: Student attempts all the activities in Quantitative
    @delete-all-courses
    Scenario: Verify that Student is able to attempt activities of a Instructor created course created from Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create Course Template with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Qualitative course Template  |
            | learningObjective | Principles of Microeconomics |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Qualitative course Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Qualitative courseTemplate                                  |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Qualitative course Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Communicating courteously and professionally |

    #     And I click on home button to return to coursepage
    #     And I copy course from the "Qualitative course Template" template with the following data
    #         | field             | value                        |
    #         | course            | Qualitative Course           |
    #         | courseCode        | E2E301                       |

    #     And I sign out of Achieve
    #     And I login to Achieve-CW as "customer_support_1"

    #     And I assign "instructor_2" to the "Qualitative Course" course
        
    #     And I sign out of Achieve
    #     And I login to Achieve-CW as "instructor_2"

    #     When I activate  "Qualitative Course" course with following data 
    #         | field             | value                        |
    #         | courseName        | Qualitative Course           |
    #         | courseCode        |  E2E301                      |
    #         | templateStatus    |  Active On Date              |
    
    #     And I create custom made activity in "Qualitative Course" with the following data
    #         | activity           | value                                    |
    #         | assignmentTittle   | Qual Test                                |
    #         | assignmentType     | Test                                     |
    #         | taxonomy           | Interactive General Chemistry V1         |
     
    #     And I add the activities in courseplanner
    #         | activity                                                          | 
    #         | Exercise: Misused words 1 (autoscored)                            |                                                        
    #         | LC1551301608988                                                   |
        
    #     And I add custom made activities in courseplanner
    #         | activity                           |
    #         | Qual Test                          |

    #     And I assign the activities in courseplanner
    #         | activity                                                         | Points | 
    #         | Qual Test                                                        | 5      |
    #         | Exercise: Misused words 1 (autoscored)                           | 5      | 
    #         | LC1551301608988                                                  | 5      | 
 

    #     And I sign out of Achieve
    #     And I login to Achieve-CW as "admin_1" 
    #     And I enroll the "student_1" in "Qualitative Course" course 
    #     And I close the popup message 
    #     And I sign out of Achieve

    #     And I login to Achieve-CW as "student_1" 

    #     And I attempt "Exercise: Misused words 1 (autoscored)" premade assesment in "Qualitative Course"
    #        | Questions   |  PremadeAssesmentKey                                                                                                       |   
    #        | 1 Question  |  Because Anne Tyler often writes about family loyalties, her allusions to King Lear are not surprising.                    |  
    #        | 2 Question  |  Designers of handheld devices understand that changes in ambient temperatures can damage the tiny circuit boards.         | 
    #        | 3 Question  |  The Keweenaw Peninsula is bordered on three sides by Lake Superior.                                                       |         
    #        | 4 Question  |  At the cooking school in Tuscany, I learned that rosemary is a perfect complement to lamb.                                |   
    #        | 5 Question  |  The person who complained to the human resources manager wishes to remain anonymous.                                      |

    #    And I attempt "Qual Test" custom made assesment in "Qualitative Course"
    #        | Questions    |  key           |
    #        | 1 Question   |  1             |
 

    #     When I attempt "LC1551301608988" learning curve activity
            

    #     When I complete the reading activity 
    #         | activity                                      |
    #         | Communicating courteously and professionally  |
        

    #     And I verify the activity status for the following activities
    #         | activity                                      | status    |
    #         | Exercise: Misused words 1 (autoscored)        | Complete  |
    #         | Qual Test                                     | Complete  | 
    #         | LC1551301608988                               | Complete  | 
    #         | Communicating courteously and professionally  | Complete  |


    #     And I verify the assignmenent grades in gradebook for below assigned activities 
    #         | activity                                      | percentage  | points  | PercentOfTotalgrades |
    #         | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 1%                   |
    #         | Qual Test                                     |  100%       | 5       | 1%                   |
    #         | LC1551301608988                               |  100%       | 5       | 1%                   |
    #         | Communicating courteously and professionally  |   100%      | 5       | 1%                   | 

    #     When I sign out of Achieve
    #     And I login to Achieve-CW as "instructor_2"
    #     And I click on "Qualtitative Course"

    #     Then I verify the assignmenent grades in gradebook for below assigned activities 
    #         | activity                                      | percentage  | points  | PercentOfTotalgrades |
    #         | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 1%                   |
    #         | Qual Test                                     |  100%       | 5       | 1%                   |
    #         | LC1551301608988                               |  100%       | 5       | 1%                   |
    #         | Communicating courteously and professionally  |   100%      | 5       | 1%                   | 

    #     When I sign out of Achieve
    #     And I login to Achieve-CW as "admin_1"
    #     And I search for "Qualitative Course" and click on course card

    #     Then I verify the assignmenent grades in gradebook for below assigned activities
    #         | activity                                      | percentage  | points  | PercentOfTotalgrades  |
    #         | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 33%                   |
    #         | Qual Test                                     |  100%       | 5       | 33%                   |
    #         | LC1551301608988                               |  100%       | 5       | 33%                   |
    #         | Communicating courteously and professionally  |   100%      | 5       | 33%                   |   