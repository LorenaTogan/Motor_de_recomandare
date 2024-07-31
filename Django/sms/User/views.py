from django.http import Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404

from User.models import Raspunsuri, Utilizator, IntrebariChestionar, NoteBac
from User.serializers import RaspunsuriSerializer, UtilizatorSerializer,IntrebariChestionarSerializer,NoteBacSerializer
from django.contrib.auth.hashers import check_password
from .models import process_scores



@csrf_exempt
def LoginApi(request, id=0):
    if request.method == 'GET':
        utilizatori = Utilizator.objects.all()
        utilizatori_serializer = UtilizatorSerializer(utilizatori, many=True)
        return JsonResponse(utilizatori_serializer.data, safe=False)
    
    elif request.method == 'POST':
        utilizator_data = JSONParser().parse(request)
        print('Date primite:', utilizator_data)
        if 'email' in utilizator_data and 'password' in utilizator_data:
           
            email = utilizator_data['email']
            password = utilizator_data['password']
            try:
                utilizator = Utilizator.objects.get(email=email)
                 
                if password == utilizator.password:
                    return JsonResponse({'id_utilizator': utilizator.id_utilizator}, safe=False)
                else:
                    return JsonResponse({"error": "Parolă incorectă."}, status=400)
            except Utilizator.DoesNotExist:
                 
                utilizator_serializer = UtilizatorSerializer(data=utilizator_data)
                if utilizator_serializer.is_valid():
                    utilizator_serializer.save()
                    return JsonResponse("Adăugat cu succes", safe=False)
                else:
                    return JsonResponse({"error": utilizator_serializer.errors}, status=400)
        else:
            return JsonResponse({"error": "Email și parola sunt necesare pentru înregistrare."}, status=400)
        


@csrf_exempt
def SignupApi(request, id=0):
    if request.method == 'GET':
        utilizatori = Utilizator.objects.all()
        utilizatori_serializer = UtilizatorSerializer(utilizatori, many=True)
        return JsonResponse(utilizatori_serializer.data, safe=False)
    
    elif request.method == 'POST':
        utilizator_data = JSONParser().parse(request)
        print('Date primite:', utilizator_data)
        if 'email' in utilizator_data:
            email = utilizator_data['email']
            try:
                # Verifică dacă emailul există deja în baza de date
                utilizator = Utilizator.objects.get(email=email)
                return JsonResponse({"error": "Email already exists."}, status=400)
            except Utilizator.DoesNotExist:
                # Dacă emailul nu există, creează un nou utilizator
                utilizator_serializer = UtilizatorSerializer(data=utilizator_data)
                if utilizator_serializer.is_valid():
                    utilizator_serializer.save()
                    return JsonResponse("Adăugat cu succes", safe=False)
                else:
                    return JsonResponse({"error": utilizator_serializer.errors}, status=400)
        else:
            return JsonResponse({"error": "Email este necesar pentru înregistrare."}, status=400)        

@csrf_exempt
def IntrebariChestionarApi(request, id=0):
    if request.method == 'GET':
        intrebari_chestionar = IntrebariChestionar.objects.all()
        serializer = IntrebariChestionarSerializer(intrebari_chestionar, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = IntrebariChestionarSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        intrebari_chestionar = IntrebariChestionar.objects.get(id=id)
        serializer = IntrebariChestionarSerializer(intrebari_chestionar, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    


@csrf_exempt
def NoteBacApi(request, id=0):
    if request.method == 'GET':
        note_bac = NoteBac.objects.all()
        serializer = NoteBacSerializer(note_bac, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = NoteBacSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        note_bac = NoteBac.objects.get(id=id)
        serializer = NoteBacSerializer(note_bac, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update.", safe=False)   
    

@csrf_exempt
def RaspunsuriApi(request, id=0):
    if request.method == 'GET':
        raspunsuri = Raspunsuri.objects.all()
        serializer = RaspunsuriSerializer(raspunsuri, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        print("Data received from frontend:", data) 

        
        for raspuns in data:
            serializer = RaspunsuriSerializer(data=raspuns)
            if serializer.is_valid():
                serializer.save()
            else:
                print("Errors in data:", serializer.errors)

        print("All responses saved successfully in database")  
        return JsonResponse("All responses added successfully", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        print("Data received from frontend:", data) 
        raspunsuri = Raspunsuri.objects.get(id=id)
        serializer = RaspunsuriSerializer(raspunsuri, data=data)
        if serializer.is_valid():
            serializer.save()
            print("Data updated successfully in database")   
            return JsonResponse("Updated Successfully", safe=False)
        else:
            print("Errors in data:", serializer.errors)
            print("Data failed to update in database")   
            return JsonResponse("Failed to Update.", safe=False)
    elif request.method == 'DELETE':
    
     user_id = request.GET.get('userId')
     if not user_id:
        return JsonResponse({"error": "Parametrul userId lipsește"}, status=400)

    try:
       
        raspunsuri = Raspunsuri.objects.filter(id_User=user_id)
    except Raspunsuri.DoesNotExist:
        return JsonResponse({"error": "Răspunsurile nu au fost găsite pentru acest utilizator"}, status=404)
 
    raspunsuri.delete()
    
    return JsonResponse({"message": "Toate răspunsurile asociate utilizatorului au fost șterse cu succes"}, status=200)


def process_scores_view(request):
    results = process_scores(request)
    return JsonResponse(results, safe=False)

    

 

from django.http import JsonResponse
from .models import Utilizator, Raspunsuri

def check_test_status(request, user_id):
    try:
        user = Utilizator.objects.get(id_utilizator=user_id)
        has_completed_test = Raspunsuri.objects.filter(id_User=user).exists()
        
        if has_completed_test:
            return JsonResponse({'message': 'User has completed the test'})
        else:
            return JsonResponse({'message': 'User has not completed the test'})
    except Utilizator.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)

 
def my_view(request):
    user_id = request.GET.get('userId')  
    test_status = check_test_status(request, user_id)
    return test_status

 