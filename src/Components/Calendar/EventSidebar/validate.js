export const validateMilestoneInput = (milestoneInput, setMilestoneError) => {
  setMilestoneError('');
  if(!milestoneInput){
    return false;
  } else if(milestoneInput.length > 300) {
    setMilestoneError('Must be 300 characters or less');
    return false
  }
  return true;
}

export const validateAssignedToInput = (assignedToInput, assignedTo, setAssignedToError, users) => {
  setAssignedToError('');
  const userNames = users.map(user=>user.user_name);
  if(!assignedToInput) {
    return false
  } else if(userNames.indexOf(assignedToInput)===-1) {
    setAssignedToError("Could not find user: " + assignedToInput);
    return false;
  } else if(assignedTo.indexOf(assignedToInput)!==-1) {
    setAssignedToError(`${assignedToInput} has already been selected`);
    return false;
  }
  return true;
}

export const validateProjectManager = (projectManager, setProjectManagerError, users) => {
  setProjectManagerError('');
  const userNames = users.map(user=>user.user_name);
  if(!projectManager) {
    setProjectManagerError('Please select a project manager');
    return false;
  } else if(userNames.indexOf(projectManager)===-1) {
    setProjectManagerError("Could not find user: " + projectManager);
    return false;
  }
  return true;
}

export const validateTitle = (title, setTitleError) => {
  setTitleError('');
  if(title.length < 1) {
    setTitleError('Please enter a project title');
    return false;
  } else if(title.length > 50) {
    setTitleError('Must be 50 characters or less');
    return false;
  }
  return true;
}

  export const validateAssignedTo = (assignedTo, setAssignedToError) => {
    setAssignedToError('');
    if(assignedTo.length<1) {
      setAssignedToError('Please select at least one member');
      return false;
    }
    return true;
  }