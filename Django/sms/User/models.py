 
import itertools
from unittest import result
from django.db import models

class Utilizator(models.Model):
    id_utilizator = models.AutoField(primary_key=True)
    nume = models.CharField(max_length=500)
    prenume = models.CharField(max_length=500)
    email = models.CharField(max_length=500)
    password = models.CharField(max_length=500)

class NoteBac(models.Model):
    id_note_bac = models.AutoField(primary_key=True)
    tip_nota1 = models.CharField(max_length=500)
    valoare_nota1 = models.FloatField()
    tip_nota2 = models.CharField(max_length=500)
    valoare_nota2 = models.FloatField()
    tip_nota3 = models.CharField(max_length=500)
    valoare_nota3 = models.FloatField()
    tip_nota4 = models.CharField(max_length=500)
    valoare_nota4 = models.FloatField()
    utilizator = models.ForeignKey(Utilizator, on_delete=models.CASCADE)

class IntrebariChestionar(models.Model):
    id_intrebari_chestionar = models.AutoField(primary_key=True)
    text_intrebare = models.CharField(max_length=500)
    categorie = models.CharField(max_length=100, default='Categorie implicită') 


class Raspunsuri(models.Model):
    id_Raspunsuri_chestionar = models.AutoField(primary_key=True)
    id_User = models.ForeignKey(Utilizator, on_delete=models.CASCADE)
    id_intrebari_chestionar = models.ForeignKey(IntrebariChestionar, on_delete=models.CASCADE , null=True)
    Raspunsuri_intrebare = models.IntegerField()

from django.http import JsonResponse
from django.db import connection
import json

def process_scores(request):
    processed_data = []
    userId = request.GET.get('userId')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    
    with connection.cursor() as cursor:
        if userId:
            cursor.execute("""
                SELECT
                    r.id_User_id,
                    (
                        SELECT
                            categorie,
                            SUM(Raspunsuri_intrebare) AS punctaj
                        FROM
                            User_intrebarichestionar ic
                        JOIN
                            User_raspunsuri r2 ON ic.id_intrebari_chestionar = r2.id_intrebari_chestionar_id
                        WHERE
                            r2.id_User_id = %s  -- Filtrăm datele pentru userId-ul specificat
                        GROUP BY
                            categorie
                        FOR JSON PATH
                    ) AS rezultat
                FROM
                    User_raspunsuri r
                WHERE
                    r.id_User_id = %s  -- Filtrăm datele pentru userId-ul specificat
                GROUP BY
                    r.id_User_id
            """, [userId, userId])
        
 

        results = cursor.fetchall()

    def determine_personality(scores):
        sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
       
        max_score = sorted_scores[0][1]
     
        max_score_categories = [category for category, score in sorted_scores if score == max_score]
    
        if  all(sorted_scores[0][1] != score[1] for score in sorted_scores[1:]) and all(sorted_scores[1][1] != score[1] for score in sorted_scores[2:]):
            personality = f"{max_score_categories[0]} - {sorted_scores[1][0]}"
            return personality

        if len(max_score_categories) == 3:
            personality = [f"{max_score_categories[0]} - {max_score_categories[1]}",
                           f"{max_score_categories[0]} - {max_score_categories[2]}",
                           f"{max_score_categories[1]} - {max_score_categories[0]}",
                           f"{max_score_categories[1]} - {max_score_categories[2]}",
                           f"{max_score_categories[2]} - {max_score_categories[0]}",
                           f"{max_score_categories[2]} - {max_score_categories[1]}"]
            return personality
    
        if len(max_score_categories) == 2:
            personality = [f"{max_score_categories[0]} - {max_score_categories[1]}",
                           f"{max_score_categories[1]} - {max_score_categories[0]}"]
            return personality
        if sorted_scores[0][1] != sorted_scores[1][1]:
            second_max_points = sorted_scores[1][1]     
            if second_max_points != 0:
                second_max_score_categories = [score[0] for score in sorted_scores if score[1] == second_max_points]

                if len(second_max_score_categories) > 1:
                    personality = ', '.join([f"{sorted_scores[0][0]} - {category}" for category in second_max_score_categories])
                    return personality
        if all(score == max_score for _, score in sorted_scores):
            return None
        return None


    
    for row in results:
        user_id = row[0]
        punctaj_json = json.loads(row[1])   
        punctaj = {category['categorie']: category['punctaj'] for category in punctaj_json}  
        categorie = determine_personality(punctaj)   
        print(categorie)
        processed_data.append({'id_User_id': user_id, 'scores': punctaj, 'personality': categorie})

    return JsonResponse(processed_data, safe=False)
