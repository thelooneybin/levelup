import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';

const App = () => {
  const [skills, setSkills] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentSkill, setCurrentSkill] = useState({ title: '', description: '' });
  const [currentClass, setCurrentClass] = useState({ title: '', description: '' });
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [viewSkill, setViewSkill] = useState(null);
  const [viewClass, setViewClass] = useState(null);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    const sortedSkills = [...skills].sort((a, b) => a.title.localeCompare(b.title));
    setSkills(sortedSkills);
  }, [skills]);

  useEffect(() => {
    const sortedClasses = [...classes].sort((a, b) => a.title.localeCompare(b.title));
    setClasses(sortedClasses);
  }, [classes]);

  const handleSaveSkill = () => {
    if (isEditingSkill) {
      setSkills(skills.map((skill, index) => (index === viewSkill ? currentSkill : skill)));
      setIsEditingSkill(false);
    } else {
      setSkills([...skills, currentSkill]);
    }
    setCurrentSkill({ title: '', description: '' });
    setShowAddSkill(false);
  };

  const handleSaveClass = () => {
    if (isEditingClass) {
      setClasses(classes.map((cls, index) => (index === viewClass ? currentClass : cls)));
      setIsEditingClass(false);
    } else {
      setClasses([...classes, currentClass]);
    }
    setCurrentClass({ title: '', description: '' });
    setShowAddClass(false);
  };

  const handleEditSkill = (index) => {
    setCurrentSkill(skills[index]);
    setShowAddSkill(true);
    setViewSkill(index);
    setIsEditingSkill(true);
  };

  const handleEditClass = (index) => {
    setCurrentClass(classes[index]);
    setShowAddClass(true);
    setViewClass(index);
    setIsEditingClass(true);
  };

  const handleViewSkill = (index) => {
    setViewSkill(index);
  };

  const handleViewClass = (index) => {
    setViewClass(index);
  };

  const handleBackSkill = () => {
    setViewSkill(null);
  };

  const handleBackClass = () => {
    setViewClass(null);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <button onClick={() => setActiveTab(activeTab === 'skills' ? 'classes' : 'skills')} className="absolute top-4 left-4 text-blue-500">
        {activeTab === 'skills' ? 'Go to Classes' : 'Go to Skills'}
      </button>
      {activeTab === 'skills' && (
        showAddSkill ? (
          <div className="fixed inset-0 bg-white p-4 rounded-lg">
            <button onClick={() => setShowAddSkill(false)} className="absolute top-2 right-2 text-red-500">X</button>
            <h2 className="text-lg font-bold mb-2">Add Skill</h2>
            <input
              type="text"
              placeholder="Title"
              value={currentSkill.title}
              onChange={(e) => setCurrentSkill({ ...currentSkill, title: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={currentSkill.description}
              onChange={(e) => setCurrentSkill({ ...currentSkill, description: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <button onClick={handleSaveSkill} className="bg-blue-500 text-white p-2 rounded-lg">
              Save
            </button>
          </div>
        ) : viewSkill !== null ? (
          <div className="fixed inset-0 bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">{skills[viewSkill].title}</h2>
            <p>{skills[viewSkill].description}</p>
            <button onClick={() => handleEditSkill(viewSkill)} className="bg-yellow-500 text-white p-2 rounded-lg mt-2 flex items-center">
              <FiEdit3 /> Edit
            </button>
            <button onClick={handleBackSkill} className="bg-blue-500 text-white p-2 rounded-lg mt-2">Back</button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Level Up - Skills</h1>
            <button onClick={() => setShowAddSkill(true)} className="text-blue-500 flex items-center">
              <AiOutlinePlus size={24} /> Add Skill
            </button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleViewSkill(index)}
                  className="bg-blue-200 p-2 rounded-lg text-center"
                >
                  {skill.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      {activeTab === 'classes' && (
        showAddClass ? (
          <div className="fixed inset-0 bg-white p-4 rounded-lg">
            <button onClick={() => setShowAddClass(false)} className="absolute top-2 right-2 text-red-500">X</button>
            <h2 className="text-lg font-bold mb-2">Add Class</h2>
            <input
              type="text"
              placeholder="Title"
              value={currentClass.title}
              onChange={(e) => setCurrentClass({ ...currentClass, title: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={currentClass.description}
              onChange={(e) => setCurrentClass({ ...currentClass, description: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <button onClick={handleSaveClass} className="bg-blue-500 text-white p-2 rounded-lg">
              Save
            </button>
          </div>
        ) : viewClass !== null ? (
          <div className="fixed inset-0 bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">{classes[viewClass].title}</h2>
            <p>{classes[viewClass].description}</p>
            <button onClick={() => handleEditClass(viewClass)} className="bg-yellow-500 text-white p-2 rounded-lg mt-2 flex items-center">
              <FiEdit3 /> Edit
            </button>
            <button onClick={handleBackClass} className="bg-blue-500 text-white p-2 rounded-lg mt-2">Back</button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Level Up - Classes</h1>
            <button onClick={() => setShowAddClass(true)} className="text-blue-500 flex items-center">
              <AiOutlinePlus size={24} /> Add Class
            </button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {classes.map((cls, index) => (
                <button
                  key={index}
                  onClick={() => handleViewClass(index)}
                  className="bg-blue-200 p-2 rounded-lg text-center"
                >
                  {cls.title}
                </button>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;