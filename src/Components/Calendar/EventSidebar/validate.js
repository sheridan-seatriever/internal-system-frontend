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