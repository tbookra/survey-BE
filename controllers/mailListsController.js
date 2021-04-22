const MailingLists = require('../models/mysql/mailingLists')
const setSurveyLink = require('../api/setSurveyLink');

const getNearEndCourseStudents = async (req, res) => {
  
try{
const cycleList = await MailingLists.getCyclesBeforeEnds(120);
const cycleListWithLinks = await Promise.all(cycleList[0].map(async (obj)=> {
  return  {...obj,
          link:  await setSurveyLink(obj['studentID'], obj['courseCode']),
        } 
}  ));
res.json({cycleList: cycleListWithLinks})
}catch(e){
  
    console.log(e)
    res.json({error: true})
  }

}

module.exports.getNearEndCourseStudents = getNearEndCourseStudents;
