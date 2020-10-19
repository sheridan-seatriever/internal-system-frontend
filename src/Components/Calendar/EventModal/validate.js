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
    } else if(startDate.getTime()>endDate.getTime()) {
      setDateError('End date must come after start date');
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