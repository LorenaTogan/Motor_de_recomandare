from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginApi),
    path('login/<int:id>/', views.LoginApi),
    path('signup/', views.SignupApi),
    path('signup/<int:id>/', views.SignupApi),
    path('intrebari_chestionar/', views.IntrebariChestionarApi),
    path('intrebari_chestionar/<int:id>/', views.IntrebariChestionarApi),
    path('scoruri/', views.NoteBacApi),
    path('scoruri/<int:id>/', views.NoteBacApi),
    path('raspunsuri_chestionar/', views.RaspunsuriApi),
    path('raspunsuri_chestionar/<int:id>/', views.RaspunsuriApi),
    path('process-scores/', views.process_scores, name='process_scores'),
    path('check-test-status/<int:user_id>/', views.check_test_status, name='check_test_status'),
]


