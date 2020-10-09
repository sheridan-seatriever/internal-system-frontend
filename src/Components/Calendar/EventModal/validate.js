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
    if(!startDate||!endDate) {
      setDateError('Please enter a valid start and end date');
      return false;
    }
    return true;
  }

  export const validateAssignedTo = (assignedTo, setAssignedToError) => {
    if(assignedTo.length<1) {
      setAssignedToError('Please select at least one project member');
      return false;
    }
    return true;
  }

  export const validateTitle = (title, setTitleError) => {
    if(title.length < 1) {
      setTitleError('Please enter a project title');
      return false;
    } else if(title.length > 50) {
      setTitleError('Must be 50 characters or less');
      return false;
    }
    return true;
  }

  export const validateAssignedToInput = (assignedToInput, setAssignedToError, data) => {
    setAssignedToError('');
    if(!assignedToInput) {
      return false
    } else if (data.indexOf(assignedToInput)===-1) {
      setAssignedToError("Could not find user: " + assignedToInput);
      return false;
    }
    return true;
  }

  export const validateMilestoneInput = (milestoneInput, setMilestoneError) => {
    setMilestoneError('');
    if(!milestoneInput){
      return false;
    } else if(milestoneInput.length > 100) {
      setMilestoneError('Must be 100 characters or less');
      return false
    }
    return true;
  }