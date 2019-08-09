document.addEventListener('DOMContentLoaded',()=>{
let form = document.getElementById("jsIssueForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  let desc = form.querySelector("#issueDescInput").value;
  let severity = form.querySelector("#issueSeverityInput").value;
  let assignedTo = form.querySelector("#issueAssignInput").value;

  let issue = {
    id: chance.guid(),
    description: desc,
    severity: severity,
    assignedTo: assignedTo,
    status: "Open"
  };

  if (localStorage.getItem("issues") == null) {
    let issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }
  form.reset();
  fetchIssues();
});
fetchIssues();
})

function fetchIssues() {
  let issueElement = document.getElementById("issueList");
  issueElement.innerHTML='';
  let issues = JSON.parse(localStorage.getItem("issues"));
  if(issues != null){
  issues.forEach(issue => {
    issueElement.innerHTML += `<div class="well">
            <h6>Issue ID: ${issue.id}</h6>
            <p class="badge badge-info">${issue.status}</p>
            <h3>${issue.description}</h3>
            <p><span class="d-flex align-items-baseline"><img class="mr-1" src="/svg/clockwise-rotation.svg" height="15px" width="15px">  ${
              issue.severity
            }</span></p>
            <p><span class="d-flex align-items-baseline"> <img class="mr-1" img src="/svg/profile.svg" height="15px" width="15px">  ${
              issue.assignedTo
            }</span></p>
            <button href="#" class="btn btn-primary" onclick=setStatusClosed('${
              issue.id
            }') data-id="${issue.id}">Close</button>
            <button href="#" class="btn btn-danger" onclick=DeleteIssue('${
              issue.id
            }') data-id="${issue.id}">Delete</button>
        </div>`;
  });
  }
}
function setStatusClosed(id){
  let issues = JSON.parse(localStorage.getItem("issues"));
  issues.forEach((issue)=>{
      if(issue.id == id){
          issue.status = "Closed";
      }
  });
localStorage.setItem("issues", JSON.stringify(issues));
fetchIssues();
}
function DeleteIssue(id){
  if(confirm('Areyou sure to delete?')){

  let issues = JSON.parse(localStorage.getItem("issues"));
  issues = issues.filter(issue => {
    return issue.id != id;
  });
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
  }
}