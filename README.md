# testkit.link

Here I am building a social network app which allows you to track Corvid-19 spread in your social network aka 
social network analysts' attempt in helping fight the Corvid-19 virus.

## Idea

Users can visit the production [app](https://app.testkit.link/) (link not yet working) and allow the app to connect
with their Facebook. Upon successful sign-up the app allows the user to enter their last known Corvid-19 status.
Possible options will be: 

 - Unknown (not tested)
 - Negative and last test date
 - Postitive and last test date
 
Users are then able to "Tinder-swipe" through their friends list and by doing so marking whether they have met people
from their social network in the past 14 days. As an alternative users can mark others as:

 - Meet them on a regular basis (e.g. family members)
 - Enter the exact date they have last met the other person
 
Now if a user changes their Corvid-19 status to `positive` their social network which was met in person the last
14-days gets an indicator that there was 1 (or more) people tested positive who I have met the last few days.

In that case the app will provide a link to a health self assessment service and information on how to proceed from
there. 

## Techstack

 - TypeScript
 - Serverless (Amazon AWS)
 - ReactJS

## How to contribute

If you are a software developer skilled in some of the above areas drop me a message via
[GMail](mailto:matthias.steinbauer@gmail.com) or just clone this repo and open pull requests.

If you are any other person sign up at [app](https://app.testkit.link/) and spread the word among your peers.

## Open Source

Given the sensitive data this project stores the code of this project will remain open source under
[MIT license](LICENSE) such that it will always be possible for external parties to check how data is processed. 

## Development Links

| Zone | Frontend   | Backend    | Build                                                                |
|------|------------|------------|----------------------------------------------------------------------|
| dev  | [dev.testkit.link](https://dev.testkit.link/) | [api-dev.testkit.link](https://api-dev.testkit.link/) | ![app, dev CodeBuild state](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWnVpMDV6SllGV0xMMnQ1M01WTFl5T1lXMTdKR2ZpWHJzOGVoMUt6ZUVQSWVvdyt6QnF2VmFRUmRneTdLK1NXbG83K3EzYXdiMzVkWE5YTWl4eEVYd2xFPSIsIml2UGFyYW1ldGVyU3BlYyI6Ing5V0w0ZGtEYmMyeUdyVFMiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master) |
| test | [test.testkit.link](https://test.testkit.link/) | [api-test.testkit.link](https://api-test.testkit.link/) | ![app, test CodeBuild state](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWnVpMDV6SllGV0xMMnQ1M01WTFl5T1lXMTdKR2ZpWHJzOGVoMUt6ZUVQSWVvdyt6QnF2VmFRUmRneTdLK1NXbG83K3EzYXdiMzVkWE5YTWl4eEVYd2xFPSIsIml2UGFyYW1ldGVyU3BlYyI6Ing5V0w0ZGtEYmMyeUdyVFMiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=test) |
| app  | [app.testkit.link](https://app.testkit.link/) | [api-prod.testkit.link](https://api-prod.loupe.link/) | ![app, app CodeBuild state](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWnVpMDV6SllGV0xMMnQ1M01WTFl5T1lXMTdKR2ZpWHJzOGVoMUt6ZUVQSWVvdyt6QnF2VmFRUmRneTdLK1NXbG83K3EzYXdiMzVkWE5YTWl4eEVYd2xFPSIsIml2UGFyYW1ldGVyU3BlYyI6Ing5V0w0ZGtEYmMyeUdyVFMiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=app) |

