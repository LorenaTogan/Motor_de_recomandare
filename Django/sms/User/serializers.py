from rest_framework import serializers
from User.models import Raspunsuri, Utilizator,NoteBac,IntrebariChestionar
 

class UtilizatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilizator
        fields = ['id_utilizator', 'nume', 'prenume', 'email', 'password']

    

class NoteBacSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteBac
        fields = ['id_note_bac', 'tip_nota1', 'valoare_nota1', 'tip_nota2', 'valoare_nota2', 'tip_nota3', 'valoare_nota3', 'tip_nota4', 'valoare_nota4', 'utilizator']

class IntrebariChestionarSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntrebariChestionar
        fields = ['id_intrebari_chestionar', 'text_intrebare','categorie' ]

class RaspunsuriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Raspunsuri
        fields = ['id_Raspunsuri_chestionar', 'id_User', 'id_intrebari_chestionar',
                  'Raspunsuri_intrebare'  ]