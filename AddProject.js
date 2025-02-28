import React,{useState} from "react";

const AddProject = ({onAddProject}) => {
    const [projectname,setprojectname] = useState('');

    const handlesubmit = (e) => {
        e.preventDefault();
        onAddProject(projectname);
        setprojectname('');
    }


return(
    <form onSubmit={handlesubmit} className="add-project">
        <input
            type = "text"
            placeholder="Enter Project Name"
            value = {projectname}
            onChange={(e) => setprojectname(e.target.value)}
        />
        <button type="submit">Add Project</button>
    </form> 
    );
};

export default AddProject;