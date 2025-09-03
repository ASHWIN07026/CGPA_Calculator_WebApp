from flask import Flask, render_template, request
app = Flask(__name__)

GRADE_POINTS = {
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'RA': 0
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    total_points = 0
    total_credits = 0
    subjects = []

    i = 1
    while True:
        grade = request.form.get(f'grade{i}')
        credit = request.form.get(f'credit{i}')
        if not grade or not credit:
            break
        credit = int(credit)
        subjects.append((grade, credit))
        total_points += GRADE_POINTS.get(grade, 0) * credit
        total_credits += credit
        i += 1

    cgpa = round(total_points / total_credits, 2) if total_credits > 0 else 0

    return render_template('result.html', cgpa=cgpa, total_credits=total_credits, subjects=subjects)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)