Feature: Verify that Admin is able to add activities in Ebook

    Scenario: Admin add the activities in ebook tab

       Given I login to Achieve-CW as "admin_1"
       When I create template with following data 
            | courseType  | productModel      | courseName                       | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Production Template  | macmillan calculus     | E2E 301      | 9781464199499  | draft         |

        And I update "Qualitative Production Template" template and add the following data
            | courseName                        |  courseCode   |  templateStatus      |
            | Qualitative Production Template   |   E2E 301     |  Active On Date      | 
        

        And I click on "Qualitative Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities |
          | Glossary   |
          | Appendix F |

        And I add the activities in Ebook
            | activities |
            | Glossary   |
            | Appndix F  |

        Then I verify that activities are added in Ebook and not in course Plan 
            | activities |
            | Glossary   |
            | Appndix F  |

    Scenario:  Admin add activities in ebook and courseplan 

       Given I login to Achieve-CW as "admin_1"

       When I search for "Qualitative Production Template" and click on course card

       And I add activities in Course plan 
            | activities |
            | Glossary   |
            | Appndix F  |

        Then I verify that activities are added both in eBook and CoursePlan 
            | activities |
            | Glossary   |
            | Appndix F  |

    Scenario: Verify that Admin is able to create Folder, reorder and delete Folder in ebook 

        Given I login to Achieve-CW as "admin_1"

        When I search for "Qualitative Production Template" and click on course card

        And I create folder and add the activities in the folders in ebook 
            | Folder      | activities  |
            | Reading 1   |  Glossary   |
            | Reading 2   | Appndix F   |

        Then I verify that activities are added in the folder in ebook 
            | Folder      | activities  |
            | Reading 1   |  Glossary   |
            | Reading 2   | Appndix F   |

        When I Reorder The folders in ebook
            | Folder    | Button                |
            | Reading 1 |  movedownButton       |
            | Reading 2 | moveToTop             |

        Then I verify that Folders are reordered in ebook 
            | Folder                                                            | orderNumber    |
            | Reading 2                                                         |  1             |                                                       
            | Reading 1                                                         |  2             |

        When I delete the folder in ebook 
            | Folder     |
            | Reading 1  |
            | Reading 2  |

        Then I verify that Folders are deeleted in ebook
            | Folder     |
            | Reading 1  |
            | Reading 2  |



            


        

        




    


