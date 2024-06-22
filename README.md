# ATQ (Ace The Quiz)

**Team *Kernel***: Alaa Abbas, Alhassan Abdelhafez, Thu Than, Aya Elnakeb

## Overview

<p align="center">
  <img src="https://github.com/AlaaAbbas22/AfricAIED_W/assets/121454779/c8390894-5c34-48bb-b82d-ee9f2db6c268"  />
</p>

**ATQ (Ace The Quiz)**  is a web application designed to help students prepare for the National Science & Maths Quiz (NSMQ) competition. It offers personalized practice sessions, real-time feedback, and performance tracking, leveraging AI to provide customized recommendations for improvement.

<p align="center">
  <img src="https://github.com/AlaaAbbas22/AfricAIED_W/assets/121454779/7bbe04bb-0733-408a-9404-e9b1046e0b8a"  />
</p>

## Problem Statement

Many NSMQ participants possess significant intellectual abilities but lack the proper resources to maximize their potential. Key challenges include:
Lack of a user-friendly application for comprehensive preparation.
The need for physical gathering to prepare, which is impractical for students in different locations or with varying schedules.

## Features

<p align="center">
  <img src="https://github.com/AlaaAbbas22/AfricAIED_W/assets/121454779/449735de-52a6-4a4c-afc8-873500bccfd2"  />
</p>

- **Extensive Question Bank**: Compiled over 12,000 practice questions across various subjects and competition rounds.
- **User-Friendly Dashboard**: Displays recent practice questions and provides insights for personalized practice.
- **Flexible Practice Modes**: Options to practice by specific questions or rounds, with random subject sampling and timed practice.
- **Answer Evaluation**: Utilizes an AI sequence classification model (kortukov/answer-equivalence-bem) for accurate assessment of student answers.
- **Personalized Feedback**: Provides recommendations using the Phi-3-small-128k-instruct model based on student performance.
- **Accessibility Features**: Includes text-to-speech functionality to accommodate students with visual impairments.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Flask
- **Database**: MongoDB
- **AI Models**: kortukov/answer-equivalence-bem, Phi-3-small-128k-instruct
- **Voice Integration**: Text-to-speech (TTS)

## Impact
**Accessibility:** Allows students to practice at their convenience and offers personalized training.
**Performance Tracking:** Helps students monitor their progress and identify areas for improvement.
**Personalized Feedback:** Provides tailored recommendations to enhance preparation effectiveness.
**Inclusivity:** Supports students with special needs through audio-based interaction.
**Fair Assessment:** Uses AI to provide unbiased and accurate evaluation of answers.

## KPIs (Key Performance Indicators)
- **Accuracy of Answers:** Percentage of correct answers in practice sessions.
- **Speed of Responses:** Average time taken to answer questions.
- **Engagement Levels:** Number of practice sessions completed per user.
- **Improvement Over Time:** Change in accuracy and speed over multiple sessions.
- **Feedback Utilization:** Number of users who follow personalized recommendations.

## Feature Prioritization Process

### Initial Ideas and Suggestions

We considered various features based on the structure of the NSMQ competition, including:
- Audio-based assessment systems
- Multiplayer quiz assessments
- Voice-activated practice apps
- Comprehensive coverage of all competition rounds

### Prioritization Criteria

- **Impact on Users:** We focused on features that would provide the most significant benefit to students, particularly those in underprivileged areas.
- **Technical Feasibility:** We prioritized features that were achievable within the hackathon timeframe and with our available resources.
- **User Feedback and Needs:** We considered the rounds that presented the most challenges and inequality in preparation.

### Selected Features

- **Comprehensive Question Bank and Flexible Practice Modes:** These features were prioritized to provide broad coverage and flexible practice options for all students.
- **Real-Time Feedback and Personalized Recommendations:** These were essential for helping students understand their mistakes and focus their preparation efforts.
- **Performance Tracking and Accessibility Features:** Ensuring that the application was inclusive and provided valuable insights into student progress.

