// import React, { useRef, useState, useEffect } from 'react';
// import './App.css';
// import Mainpage from './components/mainPage';
// import Secondpage from './components/secondPage';
// import FeedbackPage from './components/Feedback';
// import Projects from './components/Project';
// import Photography from './components/Photography';
// import MyNavbar from './components/navbar';
// import ContactPage from './components/Contact';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import ServerError from './components/errorPage5xx';
// import ErrorPage4xx from './components/errorPage4xx';
// import ErrorPage3xx from './components/errorPage3xx';
// import Loading from './components/Loading';
// import { Modal, Dropdown, Button } from 'rsuite';
// import { useNavigate } from 'react-router-dom';
// import MyComponent from './components/mainPage'; // Your custom component for the modal content
// // import Chatbox from './components/Chatbox';
// import ChatboxModal from './components/Chatbox';

// function DataFetcher({ setPhotoData, setProjectData, setLoading }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPhotoData = async () => {
//       try {
//         const response = await fetch('https://portfolioservermain-vn6i.onrender.com/images');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setPhotoData(data);
//       } catch (error) {
//         console.error('Error fetching photo data:', error);
//         navigate('/server-error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchProjectData = async () => {
//       try {
//         const response = await fetch('https://portfolioservermain-vn6i.onrender.com/projects');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProjectData(data);
//       } catch (error) {
//         console.error('Error fetching project data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPhotoData();
//     fetchProjectData();
//   }, [navigate, setPhotoData, setProjectData, setLoading]);

//   return null;
// }


// function App() {
//   const [loading, setLoading] = useState(true);
//   const [photoData, setPhotoData] = useState([]);
//   const [projectData, setProjectData] = useState([]);
//   const [initialLoading, setInitialLoading] = useState(true); // New state for initial loading
//   const [showModal, setShowModal] = useState(false); // Modal state
//   const projectsRef = useRef(null);
//   const photographyRef = useRef(null);

//   useEffect(() => {
//     // Hide the loading screen after 6 seconds
//     const timer = setTimeout(() => {
//       setInitialLoading(false);
//     }, 6000);

//     return () => clearTimeout(timer);
//   }, []);

//   const scrollToSection = (sectionRef) => {
//     sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const Layout = ({ children }) => {
//     const location = useLocation();
//     const isnotErrorPage =
//       location.pathname === '/portfolio';

//     return (
//       <>
//         {isnotErrorPage && (
//           <MyNavbar
//             scrollToProjects={() => scrollToSection(projectsRef)}
//             scrollToPhotography={() => scrollToSection(photographyRef)}
//           />
//         )}
//         {children}
//       </>
//     );
//   };

//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   if (initialLoading) {
//     return <Loading />; // Show loading screen while initialLoading is true
//   }

//   return (
//     <Router>
//       <DataFetcher
//         setPhotoData={setPhotoData}
//         setProjectData={setProjectData}
//         setLoading={setLoading}
//       />
//       <Layout>
//         <Routes>
//           <Route
//             path="/portfolio"
//             element={
//               <>
//                 <Mainpage />
//                 <Secondpage />
//                 <div ref={projectsRef}>
//                   <Projects projectData={projectData} />
//                 </div>
//                 <div ref={photographyRef}>
//                   <Photography photoData={photoData} />
//                 </div>
//                 <FeedbackPage />
//                 <ContactPage />
//                 {/* Dropdown to trigger modal */}
//                 <>
//       <Dropdown title="Dropdown 3">
//         <Dropdown.Item onClick={handleOpenModal}>Open Chat</Dropdown.Item>
//       </Dropdown>

//       <ChatboxModal show={showModal} onClose={handleCloseModal} val={1} />
//     </>
//               </>
//             }
//           />
//           <Route path="/chat" element={<ChatboxModal/>}/>
//           <Route path="/server-error" element={<ServerError />} />
//           <Route path="/4xx-error" element={<ErrorPage4xx />} />
//           <Route path="/3xx-error" element={<ErrorPage3xx />} />
//           <Route path="*" element={<ErrorPage4xx />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;

import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Mainpage from './components/mainPage';
import Secondpage from './components/secondPage';
import FeedbackPage from './components/Feedback';
import Projects from './components/Project';
import Photography from './components/Photography';
import MyNavbar from './components/navbar';
import ContactPage from './components/Contact';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ServerError from './components/errorPage5xx';
import ErrorPage4xx from './components/errorPage4xx';
import ErrorPage3xx from './components/errorPage3xx';
import Loading from './components/Loading';
import { Modal, Dropdown, Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import ChatboxModal from './components/Chatbox';
import axios from 'axios';

// Import JSON files
import projectData from './projects.json';
import photoData from './photography.json';
import MainandSecondPage from './pages/mainandsecondpage';

function App() {
  const [initialLoading, setInitialLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false); // Modal state
  const [chatbox, setChatbox] = useState('Intializing'); //
  const projectsRef = useRef(null);
  const photographyRef = useRef(null);

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // Reduced from 6s to 2s

    return () => clearTimeout(timer);
  }, []);

  



  useEffect(() => {
    const initializechat = async () => {
      try {
        const response = await axios.post('https://portfolioserver-3ksj.onrender.com/initialize', {});
  
        if (response.status === 200) {
          setChatbox('chatok');
        } else {
          setChatbox('Error occurred, kindly try another time');
        }
      } catch (error) {
        setChatbox('Error occurred, kindly try another time');
      }
    };
  
    initializechat(); // Call the function
  
  }, []); // Empty dependency array to run it only once







  useEffect(() => {
    const helloserver = async () => {
      try {
        const response = await axios.get('https://portfolioservermain-vn6i.onrender.com/hello');
  
       
      } catch (error) {
        
      }
    };
  
    helloserver(); // Call the function
  
  }, []); // Empty dependency array to run it only once
  
    





  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const Layout = ({ children }) => {
    const location = useLocation();
    const isnotErrorPage = location.pathname === '/portfolio';

    return (
      <>
        {isnotErrorPage && (
          <MyNavbar
            scrollToProjects={() => scrollToSection(projectsRef)}
            scrollToPhotography={() => scrollToSection(photographyRef)}
            ischat = {chatbox}

          />
        )}
        {children}
      </>
    );
  };


  
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // if (initialLoading) {
  //   return <Loading />;
  // }

  return (
    <Router>
      <Layout>
      <Routes>
  {/* Add this redirect from root to /portfolio */}
  <Route path="/" element={<Navigate to="/portfolio" replace />} />
  
  <Route
    path="/portfolio"
    element={
      <>
        <MainandSecondPage/>
        <div ref={projectsRef}>
          <Projects projectData={projectData} photoData={photoData} />
        </div>
        <div ref={photographyRef}>
          <Photography photoData={photoData} />
        </div>
        <FeedbackPage />
      </>
    }
  />
  {/* Your other routes remain the same */}
  <Route path="/chat" element={<ChatboxModal />} />
  <Route path="/server-error" element={<ServerError />} />
  <Route path="/4xx-error" element={<ErrorPage4xx />} />
  <Route path="/3xx-error" element={<ErrorPage3xx />} />
  <Route path="*" element={<ErrorPage4xx />} />
</Routes>
      </Layout>
    </Router>
  );
}

export default App;
