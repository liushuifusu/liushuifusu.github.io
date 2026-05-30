import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SectionWrapper from "./components/SectionWrapper";
import About from "./components/About";
import Education from "./components/Education";
import Awards from "./components/Awards";
import Skills from "./components/Skills";
import ProjectSummary from "./components/ProjectSummary";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import SelfEvaluation from "./components/SelfEvaluation";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-navy min-h-screen">
      <Navbar />
      <Hero />

      <main>
        <SectionWrapper id="about" title="个人信息" subtitle="了解我的基本情况">
          <About />
        </SectionWrapper>

        <div className="bg-navy-light/30">
          <SectionWrapper id="education" title="教育背景" subtitle="求学之路">
            <Education />
          </SectionWrapper>
        </div>

        <SectionWrapper id="awards" title="部分奖项" subtitle="竞赛与荣誉">
          <Awards />
        </SectionWrapper>

        <div className="bg-navy-light/30">
          <SectionWrapper id="skills" title="个人技能" subtitle="专业能力与技术栈">
            <Skills />
          </SectionWrapper>
        </div>

        <SectionWrapper id="project-summary" title="项目总结" subtitle="本科期间项目经历概览">
          <ProjectSummary />
        </SectionWrapper>

        <div className="bg-navy-light/30">
          <SectionWrapper id="projects" title="项目经历" subtitle="参与过的项目与实践">
            <Projects />
          </SectionWrapper>
        </div>

        <SectionWrapper id="experience" title="校园经历" subtitle="在校期间的实践与活动">
          <Experience />
        </SectionWrapper>

        <div className="bg-navy-light/30">
          <SectionWrapper id="self-evaluation" title="自我评价" subtitle="对自己的认知与定位">
            <SelfEvaluation />
          </SectionWrapper>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default App;
