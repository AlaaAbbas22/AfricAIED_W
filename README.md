# ATQ (Ace The Quiz)

**Team *Kernel***: Alaa Abbas, Alhassan Abdelhafez, Thu Than, Aya Elnakeb

## Overview

<p align="center">
  <img src="https://github.com/AlaaAbbas22/AfricAIED_W/assets/121454779/c8390894-5c34-48bb-b82d-ee9f2db6c268"  />
</p>

**ATQ (Ace The Quiz)** is a web application designed to help NSMQ (National Science & Maths Quiz) students prepare for their competitions more effectively. The app provides a flexible and comprehensive platform for students to practice questions, receive personalized feedback, and track their progress.

<p align="center">
  <img src="https://github.com/AlaaAbbas22/AfricAIED_W/assets/121454779/7bbe04bb-0733-408a-9404-e9b1046e0b8a"  />
</p>

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

## Usage

1. **Dashboard**: View recent practice questions and personalized insights.
2. **Practice by Questions/Rounds**: Choose to practice specific questions or rounds with various subjects.
3. **Answer Evaluation**: Receive feedback on answers with accurate assessment models.
4. **Review History**: Track past practices and access detailed feedback on performance.
