import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import projectsData from "../../data/projects.json";
import "../../styles/Projects.css";

function Projects() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const [activeProjectId, setActiveProjectId] = useState(
    projectsData[0]?.id || 1
  );
  const [isChanging, setIsChanging] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [, setStartIndex] = useState(0);
  const topBarRef = useRef(null);

  // عدد المشاريع المرئية
  const VISIBLE_COUNT = 11;

  // إنشاء المصفوفة المرئية بناءً على الفهرس النشط
  useEffect(() => {
    if (projectsData.length === 0) return;

    const activeIndex = projectsData.findIndex((p) => p.id === activeProjectId);
    if (activeIndex === -1) return;

    // حساب نقطة البداية لجعل المشروع النشط في المركز (المركز هو الفهرس 5 في 11 عنصر)
    let newStartIndex = activeIndex - Math.floor(VISIBLE_COUNT / 2);

    // ضمان أن الفهرس ضمن الحدود (تأثير دائري)
    if (newStartIndex < 0) {
      newStartIndex = projectsData.length + newStartIndex;
    } else if (newStartIndex >= projectsData.length) {
      newStartIndex = newStartIndex % projectsData.length;
    }

    setStartIndex(newStartIndex);

    // إنشاء المصفوفة المرئية
    const newVisibleProjects = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const circularIndex = (newStartIndex + i) % projectsData.length;
      newVisibleProjects.push(projectsData[circularIndex]);
    }

    setVisibleProjects(newVisibleProjects);
  }, [activeProjectId, projectsData]);

  // تحديد إذا كان المشروع من العناصر الطرفية (أول أو آخر عنصرين)
  const isEdgeProject = (index) => {
    return index < 2 || index > VISIBLE_COUNT - 3;
  };

  // دالة للانتقال إلى المشروع التالي
  const goToNextProject = () => {
    if (isChanging) return;

    const currentIndex = projectsData.findIndex(
      (p) => p.id === activeProjectId
    );
    const nextIndex = (currentIndex + 1) % projectsData.length;
    handleProjectChange(projectsData[nextIndex].id);
  };

  // دالة للانتقال إلى المشروع السابق
  const goToPrevProject = () => {
    if (isChanging) return;

    const currentIndex = projectsData.findIndex(
      (p) => p.id === activeProjectId
    );
    const prevIndex =
      (currentIndex - 1 + projectsData.length) % projectsData.length;
    handleProjectChange(projectsData[prevIndex].id);
  };

  // دالة لتغيير المشروع مع أنيميشن
  const handleProjectChange = (projectId) => {
    if (projectId === activeProjectId || isChanging) return;

    setIsChanging(true);

    // أنيميشن تغيير المحتوى
    setTimeout(() => {
      setActiveProjectId(projectId);

      // إعادة تعيين حالة التغيير بعد انتهاء الأنيميشن
      setTimeout(() => {
        setIsChanging(false);
      }, 500);
    }, 300);
  };

  // تمرير تلقائي عند تغيير المشروع النشط
  useEffect(() => {
    if (!isChanging && topBarRef.current) {
      const topBar = topBarRef.current;
      const activeElement = topBar.querySelector(
        `.name-project[data-id="${activeProjectId}"]`
      );

      if (activeElement) {
        const projectWidth = activeElement.offsetWidth;
        const topBarWidth = topBar.offsetWidth;
        const activePosition = activeElement.offsetLeft;
        const centerPosition = topBarWidth / 2 - projectWidth / 2;
        const scrollPosition = activePosition - centerPosition;

        topBar.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeProjectId, isChanging, visibleProjects]);

  const activeProject = projectsData.find(
    (project) => project.id === activeProjectId
  );

  // إضافة أزرار التنقل
  const NavigationButtons = () => (
    <div className="navigation-buttons">
      <button className="nav-button prev-button" onClick={goToPrevProject}>
        {/* <span>{currentLang === 'ar' ? '→' : '←'}</span> */}
      </button>
      <button className="nav-button next-button" onClick={goToNextProject}>
        {/* <span>{currentLang === 'ar' ? '←' : '→'}</span> */}
      </button>
    </div>
  );

  return (
    <section className="main-project">
      <div className="topic">{t("projects")}</div>
      <div className="list-projects">
        <div className="top-bar-container">
          <NavigationButtons />
          <div className="top-bar" ref={topBarRef} >
            {visibleProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className={`name-project ${
                  project.id === activeProjectId ? "active" : ""
                } ${isEdgeProject(index) ? "edge" : ""} ${
                  isChanging && project.id === activeProjectId ? "changing" : ""
                }`}
                data-id={project.id}
                onClick={() => handleProjectChange(project.id)}

              >
                <span>{project.name[currentLang]}</span>
                <div className="project-indicator"></div>
              </div>
            ))}
          </div>
        </div>

        {activeProject && (
          <div
            className={`project-details ${isChanging ? "changing" : ""}`}
            key={activeProjectId}
            style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}
          >
            <div className="left">
              <div className="h3">{activeProject.title[currentLang]}</div>
              <div className="p">{activeProject.description[currentLang]}</div>
              <a
                href={activeProject.webLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="web-link">
                  {t("visit_website")}
                  <img
                    src="/arrow-left.svg"
                    style={{ width: "24px" }}
                    alt="icon arrow"
                  />
                </div>
              </a>

              <a
                href={activeProject.appDownloadLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="web-link">
                  {t("download_app")}
                  <img
                    src="/arrow-left.svg"
                    style={{ width: "24px" }}
                    alt="icon arrow"
                  />
                </div>
              </a>
            </div>
            <div className="right">
              <div className="image-container">
                <img
                  src={activeProject.image}
                  alt={activeProject.name[currentLang]}
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
