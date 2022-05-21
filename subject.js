var subjects = document.getElementById("getSubjects");
console.log("welcome");
var token = localStorage.getItem('token');
var h = sessionStorage.getItem('id');
// console.log(h);
console.log(token);
var allSubjects ;
var subjectIds=[];
var x=[];
var array =new Array;
let subject;
let exams;
function getCourses(){
     allCourses = allSubjects['data'];
     subject = allCourses['data'];
     for(i=0;i<allCourses.length;i++){
      let container = document.createElement('div');
      let course = document.createElement('div');
      let anchorCourse = document.createElement('a');
      container.className = 'bigContainer'; 
      course.className = 'subjectsContainer';
      anchorCourse.innerHTML = allSubjects['data'][i].subjectName;
      anchorCourse.href = 'subject.html';
      anchorCourse.onclick = function (){
        sessionStorage.setItem('subjectName',anchorCourse.innerHTML);
        for(let j=0;j<allCourses.length;j++){
          let name =sessionStorage.getItem('subjectName');
          if(name == allCourses[j].subjectName){
            sessionStorage.setItem("id",allCourses[j]._id);
             getExams();
          }
        }
      }
      // course.style.backgroundColor = '#444';
      // course.style.color = 'white';
      // course.style.top = '10px';
      // course.style.left = '10px';
      // course.style.margin = '20px';
      // course.style.marginLeft = '5px';
      // course.style.marginRight = '5px';
      // course.style.padding ='100px'; 
      // course.style.width = '20%';
      // course.style.textAlign = 'center';
      // course.style.display = 'inline-block';
      course.appendChild(anchorCourse);
      document.body.appendChild(course);
      // courses.push(allSubjects['data'][i].subjectName);
      console.log(allSubjects['data'][i].subjectName);
    }
}


document.addEventListener("DOMContentLoaded", function(){
  fetch("https://app-e-exam.herokuapp.com/studentSubjects", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'Authorization': 'Bearer ' + token,
    }
  })
  .then(function (response) {
    if (response.ok) {
      console.log(response.status);
      return response.json();
    }
    console.log(response.status);
    return Promise.reject(response);
  })
  .then(function (data) {
    allSubjects = data;
    id = data.data;
    console.log(data);
    getExams();
    // getGrades();
    console.log(id);
    for(i=0;i<id.length;i++){
      subjectIds.push(allSubjects['data'][i]._id);
      x.push(allSubjects['data'][i]._id)
 
    }
    array.push(allSubjects);
  })
  .catch(function (error) {
    console.warn("Something went wrong.", error);
  });

  })

var subjectId = sessionStorage.getItem('id') ;
  function getExams(){
    console.log(sessionStorage.getItem('subjectName'));
    console.log(sessionStorage.getItem('id'));

    fetch(`https://app-e-exam.herokuapp.com/getSpacificExam/${subjectId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(function (response) {
      if (response.ok) {
        console.log(response.status);
        return response.json();
      }
      console.log(response.status);
      return Promise.reject(response);
    })
    .then(function (data) {
      exams = data;
      sessionStorage.setItem('examId',exams._id);
      sessionStorage.setItem('examName',exams.examName);
      console.log(sessionStorage.getItem('examName'));
      console.log(exams);
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
  
  }

  function showExams(){
    exams = data['data'];
    let eTable = document.getElementById('examsTable');
    for(let i = 0;i<exams.length;i++){
      let examDetails = document.createElement('tr');
      for(let j = 0;j<exams.length;j++){
        let examTitle = document.createElement('td');
        let examTime = document.createElement('td');
        let examActions = document.createElement('td');
        examTitle.innerHTML = exams[j].examName;
        examTime.innerHTML = exams[j].timer;
        examActions.innerHTML = "actions";
      }
     examDetails.appendChild(document.querySelector('td'));
     eTable.appendChild(examDetails);
    }
  }

// function getGrades(){
//   let examId = sessionStorage.getItem('examId'); 
//   fetch(`https://app-e-exam.herokuapp.com/spacificGrad/${examId}`, {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         'Authorization': 'Bearer ' + token,
//       }
//     })
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response.status);
//         return response.json();
//       }
//       console.log(response.status);
//       return Promise.reject(response);
//     })
//     .then(function (data) {
//       console.log(data);
//     })
//     .catch(function (error) {
//       console.warn("Something went wrong.", error);
//     });
// }




async function loadIntoTable(url, table){
  const tableHead = document.querySelector('thead');
  const tableBody = document.querySelector('tbody');
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}