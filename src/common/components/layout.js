import React from "react";
import {
  getLiferaySiteName,
  getUserName,
} from "../services/liferay/ThemeDisplay";

const onClickRoute = (path) => {
  window.location.href = `${getLiferaySiteName()}/${path}`;
};

const Layout = ({ children }) => {
  const pathname = window.location.pathname;

  return (
    <main>
      <header className="App">
        <nav className="container">
          <div className="brand">
            dev<b>24</b>
          </div>
          <ul>
            <li
              onClick={() => onClickRoute("")}
              className={
                !pathname.includes("hello-foo") &&
                !pathname.includes("hello-bar")
                  ? "active"
                  : ""
              }
            >
              Hello Dev24
            </li>
            <li
              className={pathname.includes("hello-foo") ? "active" : ""}
              onClick={() => onClickRoute("hello-foo")}
            >
              Hello Foo
            </li>
            <li
              className={pathname.includes("hello-bar") ? "active" : ""}
              onClick={() => onClickRoute("hello-bar")}
            >
              Hello Bar
            </li>
          </ul>
        </nav>
      </header>

      <div className="cards container">
        <div className="w-100">
          <h1 className="text-white">
            Welcome <i>{getUserName()}</i>
          </h1>

          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
