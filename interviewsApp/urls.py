from django.urls import path
from .views import (
    InterviewListView, InterviewDetailView,
    QuestionListView, QuestionDetailView,
    AnswerListView, AnswerDetailView,
    QuizQuestionListView, QuizQuestionDetailView, generate_quiz_api, UsersAnswerListView, UsersAnswerDetailView,
    check_interview_exists, checkIfQuizTaken
)

urlpatterns = [
    path('api/interviews/', InterviewListView.as_view(), name='api_interviews_list'),
    path('api/interviews/<int:pk>/', InterviewDetailView.as_view(), name='api_interview_detail'),
    path('api/questions/', QuestionListView.as_view(), name='api_questions_list'),
    path('api/questions/<int:pk>/', QuestionDetailView.as_view(), name='api_question_detail'),
    path('api/answers/', AnswerListView.as_view(), name='api_answers_list'),
    path('api/answers/<int:pk>/', AnswerDetailView.as_view(), name='api_answer_detail'),
    path('api/quizquestions/', QuizQuestionListView.as_view(), name='api_quizquestions_list'),
    path('api/quizquestions/<int:pk>/', QuizQuestionDetailView.as_view(), name='api_quizquestion_detail'),
    path('api/generate_quiz/', generate_quiz_api, name='api_generate_quiz'),
    path('api/users_answer/', UsersAnswerListView.as_view(), name='api_users_answer_list'),
    path('api/users_answer/<int:pk>/', UsersAnswerDetailView.as_view(), name='api_users_answer_detail'),
    path('api/check_interview_exists/', check_interview_exists, name='check_interview_exists'),
    path('api/check_quiz_taken/<int:interview_id>/', checkIfQuizTaken, name='check_quiz_taken'),
]
