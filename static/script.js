document.getElementById("addSubject").addEventListener("click", function () {
    let subjectsDiv = document.getElementById("subjects");
    let newRow = document.createElement("div");
    newRow.classList.add("row", "mb-3", "subject-row");
    newRow.innerHTML = `
        <div class="col-md-4">
            <input type="text" class="form-control" placeholder="Subject Name" required>
        </div>
        <div class="col-md-3">
            <input type="number" class="form-control" placeholder="Credit" required>
        </div>
        <div class="col-md-3">
            <input type="number" class="form-control" placeholder="Grade Point" required>
        </div>
        <div class="col-md-2">
            <button type="button" class="btn btn-danger remove-subject">Remove</button>
        </div>
    `;
    subjectsDiv.appendChild(newRow);
});

document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("remove-subject")) {
        e.target.closest(".subject-row").remove();
    }
});

document.getElementById("calculate").addEventListener("click", function () {
    let subjects = document.querySelectorAll(".subject-row");
    let totalCredits = 0, totalPoints = 0;

    subjects.forEach(row => {
        let credit = parseFloat(row.children[1].children[0].value);
        let grade = parseFloat(row.children[2].children[0].value);
        if (!isNaN(credit) && !isNaN(grade)) {
            totalCredits += credit;
            totalPoints += credit * grade;
        }
    });

    let cgpa = (totalPoints / totalCredits).toFixed(2);
    document.getElementById("result").innerText = "Your CGPA: " + cgpa;
});

document.getElementById("downloadPDF").addEventListener("click", function () {
    window.print();
});

document.getElementById("printResult").addEventListener("click", function () {
    window.print();
});

document.getElementById("shareResult").addEventListener("click", function () {
    if (navigator.share) {
        navigator.share({
            title: 'My CGPA Result',
            text: document.getElementById("result").innerText,
            url: window.location.href
        });
    } else {
        alert("Sharing not supported on this browser.");
    }
});
