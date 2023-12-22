"use strict";

const url = "http://localhost:3000/projects";
let projects = [];
const MAX_LENGTH = 10;
const articlesWrapper = document.querySelector(".articles-wrapper");
const notificationContainer = document.querySelector(".notification-container");
const notification = document.querySelector(".notification");
const closeBtn = document.querySelector(".close");

window.addEventListener('DOMContentLoaded', fetchProjects);

async function fetchProjects(){
    const response = await fetch(url);
    try{
        if(!response.ok){
            throw Error(`Error ${response.url} ${response.statusText}`);
        }
        projects = await response.json();
        loadProjects();
    }
    catch(err){
        notification.textContent = err.message;
        notificationContainer.classList.remove("hidden");
    }
}

function loadProjects(){
    const fragment = document.createDocumentFragment();
    projects.forEach((project) => fragment.append(generateProject(project)));
    articlesWrapper.innerHTML = "";
    articlesWrapper.append(fragment);
}

function generateProject(project){
    const article = document.createElement("article");
    article.classList.add("card");

    const header = document.createElement("div");
    header.classList.add("card-header");

    const pic = document.createElement("img");
    pic.src = `${project.img_src}`;
    pic.alt = "project picture";
    pic.classList.add("pic_src");

    header.appendChild(pic);

    const body = document.createElement("div");
    body.classList.add("card-body");

    const title = document.createElement("h3");
    title.textContent = project.title;

    const content = document.createElement("p");
    content.textContent = 
    project.content.lenght > MAX_LENGTH 
    ? project.content.substring(0, MAX_LENGTH) + "..." 
    : project.content;
    console.log(content);

    body.appendChild(title);
    body.appendChild(content);

    article.appendChild(body);
    article.appendChild(header);

    article.addEventListener("click", () => {
        window.location.href = `details.html?id=${project.id}`;
    });

    return article;
}

closeBtn.addEventListener("click", () => {
    notificationContainer.classList.add("hidden");
  });