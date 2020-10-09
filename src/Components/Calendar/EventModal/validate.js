  export const validateTime = (time, setTimeError) => {
    if(time.hour===''||time.minute==='') {
      setTimeError('Please enter a valid start and end time');
      return false;
    } if(isNaN(parseInt(time.hour))||isNaN(parseInt(time.minute))) {
      setTimeError('Please enter a valid start and end time');
      return false;
    } else if(time.hour>12||time.hour<1) {
      setTimeError('Please enter a valid start and end time');
      return false;
    } else if(time.minute>59||time.minute<0) {
      setTimeError('Please enter a valid start and end time');
      return false;
    }
    return true;
  }

  export const validateDates = (startDate, endDate, setDateError) => {
    setDateError('');
    if(!startDate||!endDate) {
      setDateError('Please enter a valid start and end date');
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

  export const validateAssignedToInput = (assignedToInput, assignedTo, setAssignedToError, data) => {
    setAssignedToError('');
    if(!assignedToInput) {
      return false
    } else if(data.indexOf(assignedToInput)===-1) {
      setAssignedToError("Could not find user: " + assignedToInput);
      return false;
    } else if(assignedTo.indexOf(assignedToInput)!==-1) {
      setAssignedToError(`User "${assignedTo}" already selected`);
      return false;
    }
    return true;
  }

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

  export const validateProjectManager = (projectManager, setProjectManagerError) => {
    setProjectManagerError('');
    if(!projectManager) {
      setProjectManagerError('Please enter a project manager');
      return false;
    }
    return true;
  }