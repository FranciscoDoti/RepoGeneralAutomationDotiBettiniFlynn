# @Smoke @Course
# Feature: Student attempts all the activities in Quantitative
#     @mediaproducer-delete-courseTemplate
#     Scenario: Verify that Student is able to attempt activities of a Instructor created course created from Quantitative Template

#         Given I login to Achieve-CW as "media_producer_2"
#         When I create template with following data 
#             | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
#             | Template    | Quantitative | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |   

#         And I activate the "Quantitative Template" template and add the following data
#             | courseName             |  courseCode   |  templateStatus      |
#             | Quantitative Template  |   E2E 301     |  Active On Date      | 


#         And I add the activities in resources to "Quantitative Template" template
#             | type                    | activity                                      |
#             | addButtonAssessment     | Exercise: Misused words 1 (autoscored) Automated Test       |     
#             | addButtonLearningcurve  | LC1551301608988 Automated Test                               |
#             | addReadingButton        |  Glossary Automated Test                                  |

#         And I click on home button to return to coursepage
#         And I copy course from the "Quantitative Template" template with the following data
#             || courseName          | courseCode           |
#             | Qualitative Course   | E2E 301              |

#         And I sign out of Achieve
#         And I login to Achieve-CW as "customer_support_1"

#         And I assign "instructor_1" to the "Quantitative Course" course
        
#         And I sign out of Achieve
#         And I login to Achieve-CW as "instructor_1"

#         When I activate "Quantitative Course" course with following data 
#             | field             | value                        |
#             | courseName        | Quantitative Course          |
#             | courseCode        |  E2E 301                      |
#             | templateStatus    |  Active On Date              |
     
#         And I add the activities in courseplanner to "Quantitative Course" course
#             | activity                                                          | 
#             | Exercise: Misused words 1 (autoscored) Automated Test                           |                                                        
#             | LC1551301608988 Automated Test                                                   |
#             | Glossary Automated Test                                                       |

#         # And I create custom made activity in "Quantitative Course" with the following data
#         #     | activity           | value                                    |
#         #     | assignmenttitle    | Qual Test                                |
#         #     | assignmentType     | Test                                     |
#         #     | taxonomy           | Interactive General Chemistry V1         |
        
#         # And I add custom made activities in courseplanner
#         #     | activity                           |
#         #     | Qual Test                          |

#         And I assign the activities in courseplanner
#             | activity                                                         | Points | 
#             # | Qual Test                                                      | 5      |
#             | Exercise: Misused words 1 (autoscored) Automated Test                          | 5      | 
#             | LC1551301608988 Automated Test                                                  | 5      | 
#             | Glossary Automated Test                                                      | 5      |
 

#         And I sign out of Achieve
#         And I login to Achieve-CW as "admin_1" 
#         And I enroll the "student_1" in "Quantitative Course" course  
#         And I sign out of Achieve

#         And I login to Achieve-CW as "student_1" 

#         And I attempt "Exercise: Misused words 1 (autoscored)" premade assesment in "Quantitative Course"
#            | Questions   |  PremadeAssesmentKey                                                                                                       |   
#            | 1 Question  |  Because Anne Tyler often writes about family loyalties, her allusions to King Lear are not surprising.                    |  
#            | 2 Question  |  Designers of handheld devices understand that changes in ambient temperatures can damage the tiny circuit boards.         | 
#            | 3 Question  |  The Keweenaw Peninsula is bordered on three sides by Lake Superior.                                                       |         
#            | 4 Question  |  At the cooking school in Tuscany, I learned that rosemary is a perfect complement to lamb.                                |   
#            | 5 Question  |  The person who complained to the human resources manager wishes to remain anonymous.                                      |

#     #    And I attempt "Qual Test" custom made assesment in "Quantitative Course"
#     #        | Questions    |  key           |
#     #        | 1 Question   |  1             |
 

#         # When I attempt "LC1551301608988" learning curve activity
            

#         When I complete the reading activity 
#             | activity           |
#             | Glossary Automated Test        |
        

#         Then I verify the activity status for the following activities
#             | activity                                      | status    |
#             | Exercise: Misused words 1 (autoscored) Automated Test       | Complete  |
#             # | Qual Test                                     | Complete  | 
#             # | LC1551301608988 Automated Test                               | Complete  | 
#             | Glossary Automated Test                             | Complete  |


#         And I verify the assignmenent grades in gradebook for below assigned activities 
#             | activity                                      | percentage  | points  | PercentOfTotalgrades |
#             | Exercise: Misused words 1 (autoscored) Automated Test       |  100%       | 5       | 1%                   |
#             # | Qual Test                                     |  100%       | 5       | 1%                   |
#             # | LC1551301608988 Automated Test                               |  100%       | 5       | 1%                   |
#             | Glossary Automated Test                                   |   100%      | 5       | 1%                   | 

#         When I sign out of Achieve
#         And I login to Achieve-CW as "instructor_1"
#         And I click on "Qualtitative Course"

#         Then I verify the assignmenent grades in gradebook for below assigned activities 
#             | activity                                      | percentage  | points  | PercentOfTotalgrades |
#             | Exercise: Misused words 1 (autoscored) Automated Test       |  100%       | 5       | 1%                   |
#             # | Qual Test                                     |  100%       | 5       | 1%                   |
#             # | LC1551301608988 Automated Test                               |  100%       | 5       | 1%                   |
#             | Glossary Automated Test                                   |   100%      | 5       | 1%                   | 

#         When I sign out of Achieve
#         And I login to Achieve-CW as "admin_1"
#         And I search for "Quantitative Course" and click on course card

#         Then I verify the assignmenent grades in gradebook for below assigned activities
#             | activity                                      | percentage  | points  | PercentOfTotalgrades  |
#             | Exercise: Misused words 1 (autoscored) Automated Test       |  100%       | 5       | 33%                   |
#             # | Qual Test                                     |  100%       | 5       | 33%                   |
#             # | LC1551301608988 Automated Test                               |  100%       | 5       | 33%                   |
#             | Glossary Automated Test                                   |   100%      | 5       | 33%                   |   