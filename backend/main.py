from flask import Flask, request, jsonify
from pulp import *

app = Flask(__name__)

# Globalne zmienne do przechowywania danych
data = {}

@app.route('/send_data', methods=['POST'])
def send_data():
    global data
    data = request.get_json()
    return "Dane zostały przesłane pomyślnie.", 200

@app.route('/get_results', methods=['GET'])
def get_results():
    global data

    # Dane wejściowe
    liczba_dostawcow = data['liczba_dostawcow']
    liczba_odbiorcow = data['liczba_odbiorcow']
    maks_popyt = data['maks_popyt']
    maks_podaż = data['maks_podaż']
    koszty_zakupu = data['koszty_zakupu']
    ceny_sprzedaży = data['ceny_sprzedaży']
    koszty_transportu = data['koszty_transportu']

    # Inicjalizacja modelu
    model = LpProblem("Maksymalizacja dochodu", LpMaximize)

    # Zmienne decyzyjne
    x = [[LpVariable(f"x_{i}_{j}", lowBound=0, cat='Continuous') for j in range(liczba_odbiorcow)] for i in range(liczba_dostawcow)]

    # Funkcja celu
    model += lpSum(ceny_sprzedaży[j] * x[i][j] - koszty_zakupu[i] * x[i][j] - koszty_transportu[i][j] * x[i][j] for i in range(liczba_dostawcow) for j in range(liczba_odbiorcow))

    # Ograniczenia dotyczące maksymalnego popytu
    for j in range(liczba_odbiorcow):
        model += lpSum(x[i][j] for i in range(liczba_dostawcow)) <= maks_popyt[j]

    # Ograniczenia dotyczące maksymalnej podaży
    for i in range(liczba_dostawcow):
        model += lpSum(x[i][j] for j in range(liczba_odbiorcow)) <= maks_podaż[i]

    # Rozwiązanie modelu
    model.solve()

    # Przygotowanie wyników
    results = {}

    # Macierz zysków jednostkowych
    profits_matrix = {}
    for i in range(liczba_dostawcow):
        for j in range(liczba_odbiorcow):
            profits_matrix[f"Dostawca_{i+1}_Odbiorca_{j+1}"] = ceny_sprzedaży[j] - koszty_zakupu[i] - koszty_transportu[i][j]
    results['macierz_zyskow_jednostkowych'] = profits_matrix

    # Całkowity zysk
    total_profit = sum(ceny_sprzedaży[j] * x[i][j].varValue - koszty_zakupu[i] * x[i][j].varValue - koszty_transportu[i][j] * x[i][j].varValue for i in range(liczba_dostawcow) for j in range(liczba_odbiorcow))
    results['calkowity_zysk'] = total_profit

    # Całkowity koszt transportu
    total_transport_cost = sum(koszty_transportu[i][j] * x[i][j].varValue for i in range(liczba_dostawcow) for j in range(liczba_odbiorcow))
    results['calkowity_koszt_transportu'] = total_transport_cost

    # Całkowite koszty
    total_cost = total_transport_cost + sum(koszty_zakupu[i] * x[i][j].varValue for i in range(liczba_dostawcow) for j in range(liczba_odbiorcow))
    results['calkowite_koszty'] = total_cost

    # Całkowity przychód
    total_income = sum(ceny_sprzedaży[j] * x[i][j].varValue for i in range(liczba_dostawcow) for j in range(liczba_odbiorcow))
    results['calkowity_przychod'] = total_income

    # Macierz optymalnych transportów
    optimal_transport = {}
    for i in range(liczba_dostawcow):
        for j in range(liczba_odbiorcow):
            optimal_transport[f"Dostawca_{i+1}_Odbiorca_{j+1}"] = x[i][j].varValue
    results['optymalne_transporty'] = optimal_transport

    return jsonify(results), 200

if __name__ == '__main__':
    app.run(debug=True)
