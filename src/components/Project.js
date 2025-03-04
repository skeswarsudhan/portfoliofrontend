import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Checkbox, CheckboxGroup, Button, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './project.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import FilterListOutlined from '@mui/icons-material/FilterListOutlined';
import LinkIcon from '@mui/icons-material/Link';
import './photography.css'; // Make sure to create this CSS file
import imgurl from '../media/bg7pnre.png';
// import axios from 'axios';

const categories = ["Image processing", "Data science", "Data Analysis", "Web Development"];
const tools = ["Python", "Reactjs", "Matlab"];

const Projects = ({ projectData }) => {
  const [projects, setProjects] = useState(projectData || []);

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('start_date');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [sortandfilter, setSortAndFilter] = useState(false);
  const [apply, setApply] = useState('Apply');

  const [tempCategories, setTempCategories] = useState([]);
  const [tempTools, setTempTools] = useState([]);

  useEffect(() => {
    // Initialize projects from props
    setProjects(projectData);
    setFilteredProjects(projectData);
  }, [projectData]);

  const handleCategoryChange = (categories) => {
    setTempCategories(categories);
    setApply('Apply');
  };

  const handleToolChange = (tools) => {
    setTempTools(tools);
    setApply('Apply');
  };

  const applyFilters = () => {
    setSelectedCategories(tempCategories);
    setSelectedTools(tempTools);
    setApply('Applied');
  };

  const calculateTimespan = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.floor((end - start) / (1000 * 60 * 60 * 24)); // Timespan in days
  };

  const filterAndSortProjects = useCallback(() => {
    let filtered = [...projects];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(project => selectedCategories.includes(project.category));
    }

    if (selectedTools.length > 0) {
      filtered = filtered.filter(project => selectedTools.every(tool => project.tools_used.includes(tool)));
    }

    filtered = filtered.map(project => ({
      ...project,
      timespan: calculateTimespan(project.start_date, project.end_date)
    }));

    filtered.sort((a, b) => {
      const valueA = sortBy === 'start_date' ? new Date(a.start_date) :
                     sortBy === 'end_date' ? new Date(a.end_date) :
                     sortBy === 'timespan' ? a.timespan : 0;
      const valueB = sortBy === 'start_date' ? new Date(b.start_date) :
                     sortBy === 'end_date' ? new Date(b.end_date) :
                     sortBy === 'timespan' ? b.timespan : 0;
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });

    setFilteredProjects(filtered);
  }, [projects, selectedCategories, selectedTools, sortOrder, sortBy]);

  useEffect(() => {
    filterAndSortProjects();
  }, [filterAndSortProjects]);

  const getCategoryClass = (category) => {
    switch (category) {
      case 'Image processing':
        return 'image-processing';
      case 'Data science':
        return 'data-science';
      case 'Data Analysis':
        return 'data-analysis';
      case 'Web Development':
        return 'web-development';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad month to 2 digits
    return `${year}-${month}`;
  };

  return (
    <div className="projectcon">
      <div className="projectcon2">
      <div className="projecttitlecard">Take a look into my project  </div>

      {sortandfilter ? (
        <div className="controls">
          <div className="controlcon">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
              <h5 style={{ marginBottom: '10px' }}>Sort by</h5>
              <SelectPicker
                data={[
                  { label: 'Start Date', value: 'start_date' },
                  { label: 'End Date', value: 'end_date' },
                  { label: 'Timespan', value: 'timespan' },
                ]}
                value={sortBy}
                onChange={setSortBy}
                style={{ width: 224, marginBottom: 10 }}
              />
              <h5 style={{ marginBottom: '10px' }}>in</h5>
              <SelectPicker
                data={[
                  { label: 'Ascending', value: 'asc' },
                  { label: 'Descending', value: 'desc' },
                ]}
                value={sortOrder}
                onChange={setSortOrder}
                style={{ width: 224, marginBottom: 10 }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <div className="filter-group">
                <strong>Filter by :</strong>
                <CheckboxGroup value={tempCategories} onChange={handleCategoryChange}>
                  {categories.map(category => (
                    <Checkbox key={category} value={category}>{category}</Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
              <div className="filter-group">
                <strong>Filter by :</strong>
                <CheckboxGroup value={tempTools} onChange={handleToolChange}>
                  {tools.map(tool => (
                    <Checkbox key={tool} value={tool}>{tool}</Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
            </div>
            <div style={{ gap: '20px', display: 'flex', justifyContent: 'center' }}>
              <button className={`buttonincon${apply}`} onClick={applyFilters}>{apply}</button>
              <button className="buttoninconApply" onClick={() => setSortAndFilter(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'right', backgroundColor: 'rgb(217, 217, 217,0)' }}>
          <button className="buttoncon" onClick={() => setSortAndFilter(true)}>
            <SortOutlinedIcon />/<FilterListOutlined />
          </button>
        </div>
      )}

      <div className="projects-container">
        {filteredProjects.map((project) => (
          <div key={project._id} className="project-card">
            <div key={project._id} className={`${getCategoryClass(project.category)}`}>{project.category}</div>
            <h3>{project.title}</h3>
            <h5>{project.description}</h5>
            <a href={project.link ? project.link : ""}><LinkIcon /></a>
            <h5 style={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonthIcon style={{ marginRight: '5px', paddingBottom: '2px' }} />
              {formatDate(project.start_date)}-{formatDate(project.end_date)}
            </h5>
            <h5 style={{ display: 'flex', alignItems: 'center' }}>
              <BuildOutlinedIcon style={{ marginRight: '5px' }} />
              {project.tools_used.join(', ')}
            </h5>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Projects;
