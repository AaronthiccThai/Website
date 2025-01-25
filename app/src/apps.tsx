import { ReactNode } from "react";

export interface App {
  id: number;
  x: number;
  y: number;
  name: string;
  icon: string;
  content: ReactNode;
}
export const apps: App[] = [
  { id: 1, x: 100, y: 100, name: "Intro", icon: "fa-file", content: (
    <div> 
      <h3> Welcome to my personal website! </h3>
      <p>I'm Aaron, a CS student at UNSW and this is my personal website inspired by windows :D </p> 
    </div>

  )},
  { id: 2, x: 200, y: 100, name: "Projects", icon: "fa-folder", content: (
    <div> 
      <h3 > Here are the list of my projects that I've done</h3>
      <ul style={{ listStyleType: "none" }}>
        <li>
          <a href="https://github.com/AaronthiccThai/BankProject"target="_blank" rel="noopener noreferrer">
          Bank Project
          </a>
          <p> This is a fullstack simple implementation of a bank which I used to learn Frontend programming</p>
        </li>
      </ul>
    </div>    
  )},

  {id: 3, x: 300, y: 100, name: "Work Experience", icon: "fa-briefcase", content: (
    <div> 
      <h3> Here are the list of my work experience </h3>
      <ul style={{ listStyleType: "none" }}>
        <li> KFC 
          <p> Worked at KFC for a short period of time </p>
        </li>
      </ul>
    </div>
  )},

  {id: 4, x: 100, y: 800, name: "Contacts", icon: "fa-envelope", content: (
    <div> 
      <h3> These platforms are where you can contact me </h3>
      <ul style={{ listStyleType: "none" }}>
        <li> WIP 
        </li>
      </ul>
    </div>    
  )},

  {id: 5, x: 200, y: 800, name: "About me!", icon: "fa-user", content: (
    <div> 
      <h3> These platforms are where you can contact me </h3>
      <ul style={{ listStyleType: "none" }}>
        <li> WIP 
        </li>
      </ul>
    </div>    
  )},


];
