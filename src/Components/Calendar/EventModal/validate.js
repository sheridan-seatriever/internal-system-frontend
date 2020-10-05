  export const validateTime = (time, setTimeError) => {
    let valid = true;
    if(time.hour===''||time.minute==='') {
      setTimeError('Please enter a valid start and end time');
      valid = false;
    } if(isNaN(parseInt(time.hour))||isNaN(parseInt(time.minute))) {
      setTimeError('Please enter a valid start and end time');
      valid = false;
    } else if(time.hour>12||time.hour<1) {
      setTimeError('Please enter a valid start and end time');
      valid = false;
    } else if(time.minute>59||time.minute<0) {
      setTimeError('Please enter a valid start and end time');
      valid = true;
    }
    return valid;
  }

  export const validateDates = (startDate, endDate, setDateError) => {
    let valid = true;
    if(!startDate||!endDate) {
      valid = false;
      setDateError('Please enter a valid start and end date');
    }
    return valid;
  }

  export const validateTeamMembers = (teamMembers, setTeamMembersError) => {
    let valid = true;
    if(teamMembers.length<1) {
      valid = false;
      setTeamMembersError('Please select at least one project member');
    }
    return valid;
  }

  export const validateMilestone = (milestone, setMilestoneError) => {
    let valid = true;
    if(milestone.length < 1) {
      valid = false;
    } else if(milestone.length > 100) {
      valid = false;
      setMilestoneError('Must be 100 characters or less');
    }
    return valid;
  }

  export const validateTitle = (title, setTitleError) => {
    let valid = true;
    console.log('validate')
    if(title.length < 1) {
      valid = false;
      setTitleError('Please enter a project title');
    } else if(title.length > 50) {
      valid = false;
      setTitleError('Must be 50 characters or less');
    }
    return valid;
  }