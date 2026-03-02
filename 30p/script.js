let students = [
{ id: 1, name: "Nguyen Văn A", score: 8.5, gender: "Nam" },
{ id: 2, name: "Trân Thị B", score: 4.2, gender: "Nữ" },
{ id: 3, name: "Lê Văn C", score: 9.0, gender: "Nam" },
{ id: 4, name: "Phạm Thị D", score: 5.5, gender: "Nữ" },
{ id: 5, name: "Hoang Văn E", score: 3.8, gender: "Nam" }
];
function FemaleSort(students){
    return students.filter(student => student.gender == "Nữ")
        .sort((a, b) => b.score - a.score);
}
console.log("Danh sách nữ sinh sắp xếp giảm dần:");
console.log(FemaleSort(students));
function PassesStudents(students){
    return students.filter(student => student.score >= 5.0)
    .map(student => student.name);
}
console.log("Danh sách sinh viên đạt yêu cầu:");
console.log(PassesStudents(students));
function MaleAverage(students){
    const MaleStudents = students.filter(student => student.gender == "Nam");
    const totalScore = MaleStudents.reduce((sum, student) => {return sum + student.score;}, 0);
    return totalScore / MaleStudents.length;
}
console.log("Điểm trung bình sinh viên nam:");
console.log(MaleAverage(students));


