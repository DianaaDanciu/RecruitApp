import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const JobProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { job } = location.state || {};
    const { jobSkills, getJobSkills, profile, hasApplied, addApplication, application, getApplication, interviewExists, quiz, checkQuizTaken, quizTaken, setQuizTaken, calculateQuizScore, quizScore } = useContext(AuthContext);
    const [applicationExists, setApplicationExists] = useState(null);


    useEffect(() => {
        async function fetchData() {
            if (profile && job && job.id && profile.id) {
                const exists = await hasApplied(job.id, profile.id);
                setApplicationExists(exists);
                if (exists) {
                    await getApplication(job.id, profile.id);
                    await interviewExists(job.id, profile.id);
                }
                getJobSkills(job.id);
            }
        }
        fetchData();
    }, [job?.id, profile?.id]);

    useEffect(() => {
        async function fetchQuizStatus() {
            if (quiz) {
                await checkQuizTaken(quiz.id);
            } else {
                setQuizTaken(false);
            }
        }
        fetchQuizStatus();
    }, [quiz, quizTaken, checkQuizTaken]);

    useEffect(() => {
        if (quiz && quizTaken) {
            calculateQuizScore(quiz.id);
        }
    }, [quiz, quizTaken]);

    const handleAddApplication = async () => {
        try {
            await addApplication(job.id);
            setApplicationExists(true);
        } catch (error) {
            console.error("Error adding application:", error);
        }
    }

    function renderApplicationStatus() {
        if (applicationExists && application && application.length > 0) {
            const currentApplication = application[0];

            if (currentApplication.acceptedForQuiz === false || currentApplication.accepted === false) {
                return <p><strong>Application status:</strong> Rejected.</p>;
            }

            if (currentApplication.accepted) {
                return <p><strong>Application status:</strong> Accepted for job.</p>;
            }

            if (currentApplication.acceptedForQuiz === true && quiz != null && !quizTaken) {
                return <button onClick={() => navigate('/takequiz')}>Take quiz</button>;
            }

            if (currentApplication.acceptedForQuiz === true && quiz != null && quizTaken) {
                console.log(quiz.id);
                return <div>
                    <p><strong>Application status: </strong>Quiz taken, score is: {quizScore}% Waiting for response.</p>
                    <button onClick={() => navigate('/viewtakenquiz', { state: { quiz_id: quiz.id, score: quizScore } })}>View quiz</button>
                </div>;
            }

            if (currentApplication.acceptedForQuiz === null || currentApplication.acceptedForQuiz === true) {
                return <p><strong>Application status:</strong> Applied for this job. If accepted, you will receive a quiz to take.</p>;
            }
        }

        if (!applicationExists) {
            return <button onClick={() => handleAddApplication()}>Apply for this job</button>;
        }

        return null;
    }

    return (
        <div className='body'>
            <div class="search__nav">
                <div class="left__container">
                    <img className='logo' onClick={handleSearchJobsBySkills} src={logo} alt="logo" />
                    <img
                        src={`http://127.0.0.1:8080${profile.profile_pic_url}`}
                        alt={`${profile.username}'s profile`}
                        className='me'
                        onClick={() => navigate('/userprofile')}
                    />
                </div>
                <div class="right__container">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={jobSearchTerm}
                        onChange={(e) => setJobSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearchJobs} type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    <input
                        type="text"
                        placeholder="Search companies..."
                        value={companySearchTerm}
                        onChange={(e) => setCompanySearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearchCompanies} type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    <IoIosLogOut onClick={handleLogout} className="logout" />
                </div>
            </div>
            
            <img
                src={job.cover_photo}
                alt={`${job.name}'s cover`}
                style={profileStyles.coverPhoto}
            />
            <div style={profileStyles.profileInfo}>
                <img
                    src={job.profile_pic}
                    alt={`${job.name}'s profile`}
                    style={profileStyles.profilePic}
                />
                <h1 style={profileStyles.profileName}>
                    {job.name}
                </h1>
            </div>

            <div style={profileStyles.searchContainer}>
                <div style={profileStyles.section}>
                    {job.company && (
                        <p onClick={() => navigate('/companyprofile', { state: { company: job.company } })}
                            style={{ cursor: 'pointer' }}>
                            <strong>Company:</strong> {job.company.name}
                        </p>
                    )}
                    {job.description && <p><strong>Description:</strong> {job.description}</p>}
                    {job.is_remote && <p><strong>Remote</strong></p>}
                    {job.location && <p><strong>Location:</strong> {job.location.city}, {job.location.country}</p>}
                    {renderApplicationStatus()}
                    {jobSkills.length > 0 && (
                        <div>
                            <p><strong>Skills:</strong></p>
                            {jobSkills.map((skill, index) => (
                                <div key={index}>{skill.skill_name}</div>
                            ))}
                        </div>
                    )}
                </div>
                <button style={profileStyles.button} onClick={() => navigate(-1)}>Go back</button>
            </div>
        </div>
    );
}

export default JobProfile;