@Course @Smoke
Feature: Verify that MediaProducer is able to add activities in Ebook

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that MediaProducer is abe to add activities, add folder, delete folder in Skills Production Template

       Given I login to Achieve-CW as "media_producer_2"
       When I create template with following data 
           | courseType  | productModel | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Production Template  |                  | E2E 301      | 9781464199498  | draft         |  

        And I close the popup message                      

        And I click on search button and input "Skills Production Template" to search the course

        And I activate "Skills Production Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Skills Production Template    |   E2E 301     |  Active On Date      | 
        

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

         And I add activities to "Content Library"
          | activities            |
          | GLOSSARY              |
          | Appendix F            |
          | Literary Elements     |
          | Confidence Intervals  |

        And I add the activities in "E-book"
            | activities |
            | GLOSSARY   |
            | Appendix F |

        Then I verify that activities are added in "E-book" and not in "Course Plan"
            | activities |
            | GLOSSARY   |
            | Appendix F |

       When I add activities in "Course Plan" 
            | activities           |
            | Literary Elements    |
            | Confidence Intervals |

        Then I verify that activities are added in CoursePlan and not in eBook
            | activities                    |
            | Literary Elements             |
            | Confidence Intervals          |

         When I add the activities in both "Course Plan" and "E-book"
            | activities            | tab               |
            | GLOSSARY              | CoursePlanEbook   |
            | Appendix F            | CoursePlanEbook   |
            | Literary Elements     | CoursePlanEbook   |
            | Confidence Intervals  | CoursePlanEbook   |

        Then I verify that activities are added both in "E-book" and "Course Plan" 
            | activities            |
            | GLOSSARY              |
            | Appendix F            |
            | Literary Elements     |
            | Confidence Intervals  |

        When I create folder and add the activities to the folder in "E-book" 
            | Folder       | activities             | PlaceFolder           |
            | Reading 1    | Appendix F             | Reading 1 folder      |
            | Reading 2    | GLOSSARY               | Reading 2 folder      |
            | Reading 3    | Confidence Intervals   | Reading 3 folder      |
            | Reading 4    | Literary Elements      | Reading 4 folder      |

        Then I verify that activities are added to the folder 
            | Folder        | activities             |
            | Reading 4     | Literary Elements      |
            | Reading 1     | Appendix F             |
            | Reading 2     | GLOSSARY               |
            | Reading 3     | Confidence Intervals   |

        When I Reorder The folders
            | Folder    |   Button              |
            | Reading 1 |   moveToTop           |
            | Reading 2 |   moveUpButton        |
            | Reading 2 |   moveUpButton        |
            | Reading 3 |   moveUpButton        |
            | Reading 4 |  moveToEnd            |  

        Then I verify that Folders are reordered 
            | Folder                                                            | orderNumber    |
            | Reading 1                                                         |  1             |                                                       
            | Reading 2                                                         |  2             |
            | Reading 3                                                         |  3             |
            | Reading 4                                                         |  4             |
           
        When I delete the folder 
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |
            | Reading 4  |
   

        Then I verify that Folders are deleted
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |
            | Reading 4  |
        
