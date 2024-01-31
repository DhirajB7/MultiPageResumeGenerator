document.addEventListener("DOMContentLoaded", () =>
  fetch("./Resume.json")
    .then((res) => res.json())
    .then((res) => loadData(res))
    .catch((err) => console.log(err))
);

const loadData = (data) => {
  const {
    fname,
    lname,
    role,
    summary,
    contact,
    expertise = [],
    education = [],
    achievement = [],
    language = [],
    experience = [],
  } = data;
  const { email, phone, linkedin, portfolio } = contact;

  loadNameTitleSummary(fname, lname, role, summary);
  loadPersonalDetails(email, phone, linkedin, portfolio);
  loadSkills(expertise);
  loadEducation(education);
  loadAchievement(achievement);
  loadLanguage(language);
  loadExperience(experience);
};

//===================================================================
//=====================loaders functions=============================
//=====================================================================

const loadNameTitleSummary = (fname, lname, role, summary) => {
  document.getElementById(
    "name"
  ).innerHTML = `<span id="fname">${fname}</span> ${lname}</div>`;

  document.getElementById("role").innerText = role;

  document.getElementById("summary").innerText = summary;
};

const loadPersonalDetails = (email, phone, linkedin, portfolio = "") => {
  document.querySelector("#email>div:last-child").innerText = email;
  document.querySelector("#phone>div:last-child").innerText = phone;
  document.querySelector("#linkedin>div:last-child").innerText = linkedin;
  portfolio.length > 3
    ? (document.querySelector("#portfolio>div:last-child").innerText =
        portfolio)
    : document.getElementById("portfolio").remove();
};

const loadSkills = (expertise) => {
  const expertiseUl = document.getElementById("list");
  createUlLi(expertiseUl, expertise);
};

const loadEducation = (education) => {
  const parentEducationContainer = document.getElementById("education-wrapper");

  for (const edu of education) {
    const yearElement = createElementWithClassData("year", edu.year);
    const degreeNameElement = createElementWithClassData(
      "degree-name",
      edu.degreeName
    );
    const universityElement = createElementWithClassData(
      "university",
      edu.university
    );
    const oneEducationContainer = containerAdder("one-education-container", [
      yearElement,
      degreeNameElement,
      universityElement,
    ]);
    parentEducationContainer.appendChild(oneEducationContainer);
  }
};

const loadAchievement = (achievement) => {
  const parentAchievementContainer = document.getElementById(
    "achievement-wrapper"
  );

  for (const ach of achievement) {
    const nameElement = createElementWithClassData(
      "achievement-name",
      ach.name
    );
    const detailsElement = createElementWithClassData(
      "achievement-description",
      ach.details
    );
    const oneAchievementContainer = containerAdder(
      "one-achievement-container",
      [nameElement, detailsElement]
    );
    parentAchievementContainer.appendChild(oneAchievementContainer);
  }
};

const loadLanguage = (language = []) => {
  const parentList = document.getElementById("language");
  if (language.length === 0) {
    document.getElementById("language-section").style.display = "none";
  } else {
    createUlLi(parentList, language);
  }
};

const loadExperience = (experience) => {
  const parentWrapper = document.getElementById("experience-wrapper");

  for (const exp of experience) {
    const durationElement = createElementWithClassData(
      "work-duration",
      `${exp.from} - ${exp.to}`
    );

    const companyNameElement = createElementWithClassData(
      "work-company-name",
      exp.companyName
    );

    const roleElement = createElementWithClassData("work-position", exp.role);

    const ulElement = document.createElement("ul");
    createUlLi(ulElement, exp.tasks);
    ulElement.classList.add("work-tasks");

    const oneExperienceContainer = containerAdder("one-experience-container", [
      durationElement,
      companyNameElement,
      roleElement,
      ulElement,
    ]);

    //add to parent
    parentWrapper.appendChild(oneExperienceContainer);
  }
};

//===================================================================
//=====================healper functions=============================
//=====================================================================

const createUlLi = (parentList, array) => {
  for (const a of array) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(a));
    parentList.appendChild(li);
  }
};

const createElementWithClassData = (className, text) => {
  const element = document.createElement("div");
  element.classList.add(className);
  element.appendChild(document.createTextNode(text));
  return element;
};

const containerAdder = (className, childElements = []) => {
  const oneContainer = document.createElement("div");
  oneContainer.classList.add(className);
  for (const element of childElements) {
    oneContainer.appendChild(element);
  }
  return oneContainer;
};
