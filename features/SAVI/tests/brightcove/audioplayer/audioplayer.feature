@SAVI
@Brightcove

Feature: Brightcove Audio Player

  Background: Login to IBISCMS and navigate to Student Assignment tab

    Given I login to IBISCMS as "savi.create"
    Then I navigate to an assignment with Brightcove Audio Player
    Then I launch the Student Assignment

  # SAVI -> Brightcove Audio -> Test Cases -> Play Audio
  Scenario: Play audio with bottom bar play button
    When I click the play button in the bottom bar of the player
    Then the audio should begin playing

  # SAVI -> Brightcove Audio -> Test Cases -> Pause Audio
  Scenario: Pause audio with bottom bar pause button
    Given the audio is playing
    When I click the pause button in the bottom bar of the player
    Then the audio should pause

  # SAVI -> Brightcove Audio -> Test Cases -> Captions Button
  Scenario: Toggle Show Captions on
    Given the Captions button is present
    When I click the "Show Captions" button
    Then the captions should be toggled on and visible, and the button text should change to "Hide captions"

  # Toggle Show Captions off
    Given the Captions button is present
    When I click the "Hide Captions" button
    Then the captions should be toggled off and not visible, and the button text should change to "Show captions"

  # SAVI -> Brightcove Audio -> Test Cases -> Open transcript
  Scenario: Open a audio transcript
    Given the Open Transcript button is present
    When I click the "Open Transcript" button
    Then a new tab should open containing an HTML page transcript of the content

  # SAVI -> Brightcove Audio -> Test Cases -> Playback Speed
  Scenario: Open playback speed menu
    When I click the "Playback speed" menu bar button while the playback speed menu is closed
    Then the playback speed menu should open

  # Close playback speed menu
    When I click the "Playback speed" menu bar button while the playback speed menu is open
    Then the playback speed menu should close

  Scenario: Increase playback speed
    Given the playback speed menu is open
    When I click the "Increase playback speed" button
    Then the playback speed should increase by 0.5, to a maximum of 2.0

  Scenario: Decrease playback speed
    Given the playback speed menu is open
    When I click the "Decrease playback speed" button
    Then the playback speed should decrease by 0.5, to a minimum of 0.5

  # SAVI -> Brightcove Audio -> Test Cases -> Volume
  Scenario: Open volume menu
    Given the volume menu is not open
    When I click the volume button
    Then the volume menu should open

  # Close volume menu
    When I click the volume button
    Then the volume menu should close

  Scenario: Move volume slider
    Given the volume menu is open
    When I move the volume slider
    Then the volume level visually should change as well as change in volume level heard from the media

  Scenario: Mute volume from menu
    Given the volume menu is open
    When I click on the volume icon
    Then the application should mute

  # SAVI -> Brightcove Audio -> Test Cases -> Audio playing
  Scenario: Timestamp update while playing
    When the audio is playing
    Then the current timestamp of the media should be updating every second in the menu bar
