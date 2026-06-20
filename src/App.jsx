import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home          from "./Pages/Home/Home";
import Articles      from "./Pages/Articles/Articles";
import Projects      from "./Pages/Projects/Projects";
import ProjectDetail from "./Pages/ProjectDetail/ProjectDetail";
import Mock          from "./Pages/Mock/Mock";
import Quiz          from "./Pages/Quiz/Quiz";
import TopicViewer   from "./Pages/TopicViewer/TopicViewer";
import SignIn        from "./Pages/Auth/SignIn";
import Register      from "./Pages/Auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/articles"            element={<Articles />} />
        <Route path="/project"             element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/mock"                element={<Mock />} />
        <Route path="/quiz/:topicId"       element={<Quiz />} />
        <Route path="/topic/:topicId"      element={<TopicViewer />} />
        <Route path="/signin"              element={<SignIn />} />
        <Route path="/register"            element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;