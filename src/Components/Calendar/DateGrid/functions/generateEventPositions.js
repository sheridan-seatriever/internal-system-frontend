const eventTableGenerator = (eventData) => {
  if(eventData) {

    console.log('eventData: ', eventData)

    const tableRowArray = [];

    const compare = (a, b) => {
      let comparison = 0;
      if (a.endInt < b.endInt) {
        comparison = 1;
      } else if (a.endInt > b.endInt) {
        comparison = -1;
      }
      return comparison;
    }

    const mapper = (day) => {
      day.map(day=>{
        let appendedSuccessfully = false;
        for(let i=0; i<tableRowArray.length;i++) {
          if(tableRowArray[i][tableRowArray[i].length-1].endInt<=day.startInt) {
            tableRowArray[i].push(day);
            appendedSuccessfully = true;
            break;
          }
        }
        if(!appendedSuccessfully) {
          tableRowArray.push([day]);
        }
      })
    }
    
    const monday = eventData.filter(day=>day.startInt===0);
    monday.sort(compare);
    const tuesday = eventData.filter(day=>day.startInt===1)
    tuesday.sort(compare);
    const wednesday = eventData.filter(day=>day.startInt===2);
    wednesday.sort(compare);
    const thursday = eventData.filter(day=>day.startInt===3)
    thursday.sort(compare);
    const friday = eventData.filter(day=>day.startInt===4);
    friday.sort(compare);
    const saturday = eventData.filter(day=>day.startInt===5)
    saturday.sort(compare);
    const sunday = eventData.filter(day=>day.startInt===6)
    sunday.sort(compare);

    monday.map(day=>tableRowArray.push([day]));
    mapper(tuesday, 'tuesday');
    mapper(wednesday, 'wednesday');
    mapper(thursday, 'thursday');
    mapper(friday, 'friday');
    mapper(saturday, 'saturday');
    mapper(sunday, 'sunday');
    return tableRowArray;
  } else {
    return ['','','','','','','']
  }
}

export default eventTableGenerator;