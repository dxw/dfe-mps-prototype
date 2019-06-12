const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.post('/supply-teacher', function (req, res) {
  let supplyTeacher = req.session.data['supplyTeacher']


  if (supplyTeacher === 'No') {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/disciplinary')
  } else {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/supply-teacher-term')
  }
})

router.post('/supply-teacher-term', function (req, res) {
  let supplyTeacherTerm = req.session.data['supplyTeacherTerm']

  if (supplyTeacherTerm === 'No') {
    res.redirect('/ineligible-term')
  } else {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/private-agency')
  }
})

router.post('/private-agency', function (req, res) {
  let supplyTeacherAgency = req.session.data['supplyTeacherAgency']

  if (supplyTeacherAgency === 'Yes, I am employed by the school') {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/disciplinary')
  } else {
    res.redirect('/ineligible-agency')
  }
})

router.post('/qualified', function (req, res) {
  let qualified = req.session.data['qualified']

if (qualified === 'No') {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/degree')
  } else {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/awarded')
  }
})

router.post('/degree', function (req, res) {
  let degree = req.session.data['degree']

  if (degree === 'No') {
    res.redirect('/ineligible-degree')
  } else {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/awarded')
  }
})

router.post('/subject', function (req, res) {
  let teachingSubject = req.session.data['teachingSubject']

  if (teachingSubject === 'No') {
    res.redirect('/ineligible-subject')
  } else {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/school')
  }
})

router.post('/awarded', function (req, res) {
  let awarded = req.session.data['awarded']

  if (awarded === 'Before 1 September 2014') {
    res.redirect('/ineligible-awarded')
  } else {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/supply-teacher')
  }
})

router.get('/school', function (req, res) {
  var schoolData = require('./data/gias_all.min.json')
  var schoolList = schoolData.map(function (school) {
    return school.est_name
  })

  res.render('school', { 'schoolList': schoolList })
})

router.post('/school', function (req, res) {
  if (req.session.data.edited) res.redirect('/check-answers')
  res.redirect('/qualified')
})

router.post('/disciplinary', function (req, res) {
  let teacherAction = req.session.data['teacherAction']

  if (teacherAction === 'No') {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/eligible-confirmed')
  } else {
    res.redirect('/ineligible-disciplinary')
  }
})

router.get('/check-answers', function (req, res) {
  req.session.data.edited = true
  res.render('check-answers')
})

router.post('/national-insurance-number', function (req, res) {
  if (req.session.data.edited) res.redirect('/check-answers')
  res.redirect('/student-loan-repayment')
})

router.post('/student-loan-repayment', function (req, res) {
  if (req.session.data.edited) res.redirect('/check-answers')
  res.redirect('/student-loan-plan')
})

router.post('/student-loan-plan', function (req, res) {
  let studentLoanPlan = req.session.data['studentLoanPlan']

  if (studentLoanPlan === 'I do not know') {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/education-country')
  } else {
    if (req.session.data.edited) res.redirect('/check-answers')
    res.redirect('/payment-method')
  }
})

router.post('/education-country', function (req, res) {
  if (req.session.data.edited) res.redirect('/check-answers')
  res.redirect('/number-of-courses')
})

router.post('/number-of-courses', function (req, res) {
  if (req.session.data.edited) res.redirect('/check-answers')
  res.redirect('/course-start')
})

router.post('/course-start', function (req, res) {
  if (req.session.data.edited) res.redirect('/check-answers')
  res.redirect('/payment-method')
})

router.get('/reference-number', function (req, res) {
  res.render('reference-number')
})

router.post('/reference-number', function (req, res) {
  if (req.session.data.edited) res.redirect('/check-answers')
  res.redirect('/national-insurance-number')
})

router.get('/payment-method', function (req, res) {
  res.render('payment-method')
})

router.post('/payment-method', function (req, res) {
  if (req.session.data.edited) res.redirect('/check-answers')
  res.redirect('/contact-method')
})

router.get('/success', function (req, res) {
  req.session.data.edited = false
  res.render('success')
})

router.get('/start', function (req, res) {
  req.session.data.edited = false
  res.render('start')
})

router.get('/ineligible-agency', function (req, res) {
  req.session.data.edited = false
  res.render('ineligible-agency')
})

router.get('/ineligible-awarded', function (req, res) {
  req.session.data.edited = false
  res.render('ineligible-awarded')
})

router.get('/ineligible-degree', function (req, res) {
  req.session.data.edited = false
  res.render('ineligible-degree')
})

router.get('/ineligible-disciplinary', function (req, res) {
  req.session.data.edited = false
  res.render('ineligible-disciplinary')
})

router.get('/ineligible-subject', function (req, res) {
  req.session.data.edited = false
  res.render('ineligible-subject')
})

router.get('/ineligible-term', function (req, res) {
  req.session.data.edited = false
  res.render('ineligible-term')
})

module.exports = router
