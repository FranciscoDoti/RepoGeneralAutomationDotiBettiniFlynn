@Module @NameAPIBeingTested @TestSuiteType @TestGroupName
Feature: To verify the request and reponse from sample API
    
    @NamesofTheAPIBeingCalled @PriorityOfTest @ParameterSelections
    Scenario: Check if user is able to submit a GET API request
        Given I create a course template using the API test-sm-api with the following details
            | is_course_template    |
            | true                  |
    
    # @AllPossibleCombinations
    # Scenario: verify the response

    # Scenario: verify the reponse code

    # @SelfContained
    # Scenario: verify the duration 1

    # @AvoidChaining
    # Scenario: verify the duration 2

    # @CallSequencing
    # Scenario: verify the duration 3