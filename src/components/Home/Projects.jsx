import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import projectsData from "../../data/projects.json";
import "../../styles/Projects.css";

function Projects() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || "en";
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0]?.id || 1);
  const [isChanging, setIsChanging] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [, setStartIndex] = useState(0);
  const topBarRef = useRef(null);

  // Log projectsData for debugging
  useEffect(() => {
    console.log('projectsData:', projectsData);
    if (!projectsData || !Array.isArray(projectsData)) {
      console.error('Invalid projectsData:', projectsData);
    }
  }, []);

  // Preload images
  useEffect(() => {
    (projectsData || []).forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
    const arrowImg = new Image();
    arrowImg.src = '/arrow-left.svg';
  }, []);

  // Set visible projects
  useEffect(() => {
    if (!projectsData || projectsData.length === 0) {
      setVisibleProjects([]);
      return;
    }

    const activeIndex = projectsData.findIndex((p) => p.id === activeProjectId);
    if (activeIndex === -1) return;

    const VISIBLE_COUNT = 11;
    let newStartIndex = activeIndex - Math.floor(VISIBLE_COUNT / 2);

    if (newStartIndex < 0) {
      newStartIndex = projectsData.length + newStartIndex;
    } else if (newStartIndex >= projectsData.length) {
      newStartIndex = newStartIndex % projectsData.length;
    }

    setStartIndex(newStartIndex);

    const newVisibleProjects = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const circularIndex = (newStartIndex + i) % projectsData.length;
      newVisibleProjects.push(projectsData[circularIndex]);
    }

    setVisibleProjects(newVisibleProjects);
  }, [activeProjectId, projectsData]);

  const isEdgeProject = (index) => {
    return index < 2 || index > 8;
  };

  const goToNextProject = () => {
    if (isChanging) return;
    const currentIndex = projectsData.findIndex((p) => p.id === activeProjectId);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    handleProjectChange(projectsData[nextIndex]?.id || 1);
  };

  const goToPrevProject = () => {
    if (isChanging) return;
    const currentIndex = projectsData.findIndex((p) => p.id === activeProjectId);
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    handleProjectChange(projectsData[prevIndex]?.id || 1);
  };

  const handleProjectChange = (projectId) => {
    if (projectId === activeProjectId || isChanging) return;
    setIsChanging(true);
    setTimeout(() => {
      setActiveProjectId(projectId);
      setTimeout(() => {
        setIsChanging(false);
      }, 500);
    }, 300);
  };

  useEffect(() => {
    if (!isChanging && topBarRef.current) {
      const topBar = topBarRef.current;
      const activeElement = topBar.querySelector(`.name-project[data-id="${activeProjectId}"]`);
      if (activeElement) {
        const projectWidth = activeElement.offsetWidth;
        const topBarWidth = topBar.offsetWidth;
        const activePosition = activeElement.offsetLeft;
        const centerPosition = topBarWidth / 2 - projectWidth / 2;
        const scrollPosition = activePosition - centerPosition;
        topBar.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [activeProjectId, isChanging, visibleProjects]);

  const activeProject = projectsData.find((project) => project.id === activeProjectId) || {};

  return (
    <section className="main-project" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="topic">{t("projects") || 'Our Projects'}</div>
      <div className="list-projects">
        <div className="top-bar-container">
          <div className="navigation-buttons">
            <button className="nav-button prev-button" onClick={goToPrevProject} aria-label={t('projects.prev') || 'Previous Project'}></button>
            <button className="nav-button next-button" onClick={goToNextProject} aria-label={t('projects.next') || 'Next Project'}></button>
          </div>
          <div className="top-bar" ref={topBarRef}>
            {visibleProjects.map((project, index) => (
              <div
                key={`${project?.id || index}-${index}`}
                className={`name-project ${project?.id === activeProjectId ? "active" : ""} ${isEdgeProject(index) ? "edge" : ""} ${
                  isChanging && project?.id === activeProjectId ? "changing" : ""
                }`}
                data-id={project?.id || index}
                onClick={() => handleProjectChange(project?.id || 1)}
              >
                <span>{project?.name?.[currentLang] || 'Untitled Project'}</span>
                <div className="project-indicator"></div>
              </div>
            ))}
          </div>
        </div>

        {activeProject && (
          <div className={`project-details ${isChanging ? "changing" : ""}`} key={activeProjectId}>
            <div className="left">
              <div className="h3">{activeProject.title?.[currentLang] || 'Untitled'}</div>
              <div className="p">{activeProject.description?.[currentLang] || 'No description available'}</div>
              <a href={activeProject.webLink || '#'} target="_blank" rel="noopener noreferrer">
                <div className="web-link">
                  {t("visit_website") || 'Visit Website'}
                  <img src="/arrow-left.svg" style={{ width: "24px" }} alt="Arrow icon" />
                </div>
              </a>
              <a href={activeProject.appDownloadLink || '#'} target="_blank" rel="noopener noreferrer">
                <div className="web-link">
                  {t("download_app") || 'Download App'}
                  <img src="/arrow-left.svg" style={{ width: "24px" }} alt="Arrow icon" />
                </div>
              </a>
            </div>
            <div className="right">
              <div className="image-container">
                <img
                  src={activeProject.image || '/placeholder.png'}
                  alt={activeProject.name?.[currentLang] || 'Project Image'}
                  loading="lazy"
                  className={isChanging ? "changing" : ""}
                />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;