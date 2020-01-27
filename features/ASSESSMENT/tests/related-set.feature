@Assessment @Raptor
Feature: To create and configure a StED raptor item

    @SharedContent
    Scenario: Admin creates and configures a StED Raptor item and verifies in AMS

        Given I login to AMS as "all-permissions-author"

        When I create a non-performance module in AMS with the following details
            | Title                      | Item Type      | Module Type |
            | NGA QA StED Shared Content | Shared Content | Smart Data  |

        And I give format to elements of the Smart Data table

        And I configure the Shared Content item with "3" trials and the following variables
            | Header Name                                                                                        | Variable Name |
            | <md-always>Average [Na<sub>2</sub>S<sub>2</sub>O<sub>3</sub>] (M)</md-always>                      | aconcthio     |
            | <md-always>Mass of sample (g)</md-always>                                                          | msam          |
            | <md-always>Volume of Na<sub>2</sub>S<sub>2</sub>O<sub>3</sub> needed in titration (mL)</md-always> | vmlthio       |

        And I configure the Shared Content item with the following children
            | Child ID |
            | 1505569  |
            | 1505573  |
            | 1505577  |

        Then I verify the details of the following items are displayed in AMS
            | Author Mode | Title                      | Module Type |
            | Raptor      | NGA QA StED Shared Content | RS          |
