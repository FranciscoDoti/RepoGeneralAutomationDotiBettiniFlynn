@Smoke
Feature: Student attempts reading activity
    @mediaproducer-delete-course
    Scenario: Verify that Student is able to attempt activities of a Instructor created course created from Quantitative Template

        # Given I login to Achieve-CW as "media_producer_1"
        # When I create template with following data 
        #     | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
        #     | Template    | Quantitative | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199487  | draft         |

        # And I activate the "Quantitative Template" template and add the following data
        #     | courseName             |  courseCode   |  templateStatus      |
        #     | Quantitative Template  |   E2E 301     |  Active On Date      |    

        # And I add the activities in resources to "Quantitative Template" template
        #     | type                      | activity                                      |
        #     | addButtonAssessment       | Exercise: Misused words 1 (autoscored)        |     
        #     | addButtonLearningcurve    | LC1551301608988                               |
        #     | addReadingButton          |  Dedication                                   |
        #     | addButtonReadandpractice  | Automation Test                               |

        # And I click on home button to return to coursepage
        # And I copy course from the "Quantitative Template" template with the following data
        #     | courseName            | courseCode           |
        #     | Quantitative Course   | E2E 301              |

        # And I sign out of Achieve
        # And I login to Achieve-CW as "customer_support_1"

        # And I assign "instructor_1" to the "Quantitative Course" course
        
        # And I sign out of Achieve
        # And I login to Achieve-CW as "instructor_1"

        # When I activate "Quantitative Course" course with following data 
        #     | field             | value                        |
        #     | courseName        | Quantitative Course          |
        #     | courseCode        |  E2E 301                     |
        #     | templateStatus    |  Active On Date              |
     
        # And I add the activities in courseplanner to "Quantitative Course" course
        #     | activity                                                          | 
        #     | Dedication                                                        |
        #     | LC1551301608988                                                   |
        #     | Exercise: Misused words 1 (autoscored)                            |
        #     | Automation Test                                                   |

        # And I assign the activities in courseplanner
        #     | activity                                                         | Points |
        #     | Exercise: Misused words 1 (autoscored)                           | 5      |
        #     | LC1551301608988                                                  | 5      |
        #     | Dedication                                                       | 5      |
        #     | Automation Test                                                  | 5      |
 

        # And I sign out of Achieve
        # And I login to Achieve-CW as "customer_support_1" 
        # And I enroll the "student_1" in "Quantitative Course" course  
        # And I sign out of Achieve

        And I login to Achieve-CW as "student_1"

        # And I attempt "Exercise: Misused words 1 (autoscored)" premade assesment in "Quantitative Course"
        #    | Questions   |  PremadeAssesmentKey                                                                                                       |   
        #    | 1 Question  |  Because Anne Tyler often writes about family loyalties, her allusions to King Lear are not surprising.                    |  
        #    | 2 Question  |  Designers of handheld devices understand that changes in ambient temperatures can damage the tiny circuit boards.         | 
        #    | 3 Question  |  The Keweenaw Peninsula is bordered on three sides by Lake Superior.                                                       |         
        #    | 4 Question  |  At the cooking school in Tuscany, I learned that rosemary is a perfect complement to lamb.                                |   
        #    | 5 Question  |  The person who complained to the human resources manager wishes to remain anonymous.                                      | 

        # And I complete the reading activity 
        #     | activity           |
        #     | Dedication         |

        # And I attempt "LC1551301608988" Learning curve activity
        
        And I attempt "Automation Test" Read and Practice activity
            # | Topics    |
            # | Topic_1_0 |
            # | Topic_2_0 |
            # | Topic_2_1 |
            # | Topic_2_2 |
            # | Topic_2_3 |
            # | Topic_3_0 |
            # | Topic_3_1 |
            # | Topic_3_2 |

        # Then I verify the activity status for the following activities
        #     | activity                                      | status    |
        #     | Dedication                                    | Complete  |
        #     | Exercise: Misused words 1 (autoscored)        | Complete  |
        #     | LC1551301608988                               | Complete  |


        # And I verify the assignmenent grades in gradebook for below assigned activities 
        #     | activity                                      | percentage  | points  | PercentOfTotalgrades |
        #     | Dedication                                    |   100%      | 5       | 33%                  |
        #     | Exercise: Misused words 1 (autoscored)        |   100%      | 5       | 33%                  |
        #     | LC1551301608988                               |   100%      | 5       | 33%                  |

        # When I sign out of Achieve
        # And I login to Achieve-CW as "instructor_1"
        # And I click on "Quantitative Course"

        # Then I verify the assignmenent grades in gradebook for below assigned activities 
        #     | activity                                      | percentage  | points  | PercentOfTotalgrades |
        #     | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 33%                   |
        #     | LC1551301608988                               |  100%       | 5       | 33%                   |
        #     | Dedication                                    |   100%      | 5       | 33%                   | 

        # When I sign out of Achieve
        # And I login to Achieve-CW as "admin_1"
        # And I search for "Quantitative Course" and click on course card

        # Then I verify the assignmenent grades in gradebook for below assigned activities
        #     | activity                                      | percentage  | points  | PercentOfTotalgrades  |
        #     | Exercise: Misused words 1 (autoscored)        |  100%       | 5       | 33%                   |
        #     # | Qual Test                                     |  100%       | 5       | 33%                   |
        #     # | LC1551301608988                               |  100%       | 5       | 33%                   |
        #     | Dedication                                    |   100%      | 5       | 33%                   |   