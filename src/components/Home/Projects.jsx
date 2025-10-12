import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../../data/projects.json";
import "../../styles/Projects.css";

function Projects() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || "en";
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0]?.id || 1);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const topBarRef = useRef(null);
  const directionRef = useRef('next');

  // Determine VISIBLE_COUNT based on screen width
  const getVisibleCount = () => {
    if (window.innerWidth <= 480) return 3;
    if (window.innerWidth <= 768) return 5;
    if (window.innerWidth <= 1024) return 7;
    return 11;
  };

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
  }, []);

  // Set visible projects
  useEffect(() => {
    if (!projectsData || projectsData.length === 0) {
      setVisibleProjects([]);
      return;
    }

    const activeIndex = projectsData.findIndex((p) => p.id === activeProjectId);
    if (activeIndex === -1) return;

    const VISIBLE_COUNT = getVisibleCount();
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

  // Update visible projects on window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleProjects((prev) => {
        const VISIBLE_COUNT = getVisibleCount();
        const activeIndex = projectsData.findIndex((p) => p.id === activeProjectId);
        if (activeIndex === -1) return prev;

        let newStartIndex = activeIndex - Math.floor(VISIBLE_COUNT / 2);
        if (newStartIndex < 0) {
          newStartIndex = projectsData.length + newStartIndex;
        } else if (newStartIndex >= projectsData.length) {
          newStartIndex = newStartIndex % projectsData.length;
        }

        const newVisibleProjects = [];
        for (let i = 0; i < VISIBLE_COUNT; i++) {
          const circularIndex = (newStartIndex + i) % projectsData.length;
          newVisibleProjects.push(projectsData[circularIndex]);
        }

        return newVisibleProjects;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeProjectId, projectsData]);

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    if (window.innerWidth > 768) return;
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (window.innerWidth > 768) return;
    setTouchEndX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (window.innerWidth > 768 || touchStartX === null || touchEndX === null) return;
    const diffX = touchStartX - touchEndX;
    const threshold = 50;

    if (diffX > threshold) {
      goToNextProject();
    } else if (diffX < -threshold) {
      goToPrevProject();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const isEdgeProject = (index) => {
    const VISIBLE_COUNT = getVisibleCount();
    return index < 1 || index >= VISIBLE_COUNT - 1;
  };

  const goToNextProject = () => {
    const currentIndex = projectsData.findIndex((p) => p.id === activeProjectId);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    directionRef.current = 'next';
    setActiveProjectId(projectsData[nextIndex]?.id || 1);
  };

  const goToPrevProject = () => {
    const currentIndex = projectsData.findIndex((p) => p.id === activeProjectId);
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    directionRef.current = 'prev';
    setActiveProjectId(projectsData[prevIndex]?.id || 1);
  };

  const handleProjectChange = (projectId) => {
    if (projectId === activeProjectId) return;
    directionRef.current = projectId > activeProjectId ? 'next' : 'prev';
    setActiveProjectId(projectId);
  };

  useEffect(() => {
    if (topBarRef.current) {
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
  }, [activeProjectId, visibleProjects]);

  const activeProject = projectsData.find((project) => project.id === activeProjectId) || {};

  // إعدادات الحركة الموحدة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const projectVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction === 'next' ? 100 : -100,
      scale: 0.95
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction === 'next' ? -100 : 100,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };

  const topBarItemVariants = {
  inactive: {
    scale: 0.9,
    opacity: 0.7,
    transition: { duration: 0.2 }
  },
  active: {
    scale: 1.1,
    opacity: 1,
    // إزالة تعيين الخلفية هنا لأننا نستخدم CSS
    transition: { 
      duration: 0.3,
      type: "spring",
      stiffness: 300
    }
  },
  edge: {
    scale: 0.8,
    opacity: 0.5,
    transition: { duration: 0.2 }
  }
};

  return (
    <motion.section 
      className="main-project" 
      style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="topic" variants={itemVariants}>
        {t("projects") || 'Our Projects'}
      </motion.div>
      
      <div className="list-projects">
        <div
          className="top-bar-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="navigation-buttons">
            <button className="nav-button prev-button" onClick={goToPrevProject} aria-label={t('projects.prev') || 'Previous Project'}></button>
            <button className="nav-button next-button" onClick={goToNextProject} aria-label={t('projects.next') || 'Next Project'}></button>
          </div>
          
          <motion.div 
            className="top-bar" 
            ref={topBarRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
          {visibleProjects.map((project, index) => (
  <motion.div
    key={`${project.id}-${index}`}
    className={`name-project ${project?.id === activeProjectId ? "active" : ""} ${isEdgeProject(index) ? "edge" : ""}`}
    data-id={project?.id || index}
    onClick={() => handleProjectChange(project?.id || 1)}
    variants={topBarItemVariants}
    initial="inactive"
    animate={
      project?.id === activeProjectId 
        ? "active" 
        : isEdgeProject(index) 
        ? "edge" 
        : "inactive"
    }
    whileHover={{ 
      scale: project?.id === activeProjectId ? 1.15 : 1.05,
      transition: { duration: 0.2 }
    }}
    // إضافة هذه الخاصية لمنع التداخل مع السكرول
    style={{ touchAction: "pan-y" }}
  >
    <span>{project?.name?.[currentLang] || 'Untitled Project'}</span>
    <motion.div 
      className="project-indicator"
      initial={{ width: 0 }}
      animate={{ 
        width: project?.id === activeProjectId ? "80%" : "0%",
        transition: { duration: 0.3 }
      }}
    />
  </motion.div>
))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={activeProjectId}
            className="project-details"
            custom={directionRef.current}
            variants={projectVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="left">
              <motion.div 
                className="h3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {activeProject.title?.[currentLang] || 'Untitled'}
              </motion.div>
              
              <motion.div 
                className="p"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {activeProject.description?.[currentLang] || 'No description available'}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <a href={activeProject.webLink || '#'} target="_blank" rel="noopener noreferrer">
                  <div className="web-link">
                    {t("visit_website") || 'Visit Website'}
                    <img src="/arrow-left.svg" alt="Arrow icon" />
                  </div>
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <a href={activeProject.appDownloadLink || '#'} target="_blank" rel="noopener noreferrer">
                  <div className="web-link">
                    {t("download_app") || 'Download App'}
                    <img src="/arrow-left.svg" alt="Arrow icon" />
                  </div>
                </a>
              </motion.div>
            </div>
            
            <div className="right">
              <motion.div 
                className="image-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.img
                  src={activeProject.image || '/placeholder.png'}
                  alt={activeProject.name?.[currentLang] || 'Project Image'}
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                />
                <div className="image-overlay"></div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default Projects;