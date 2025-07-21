const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt-nodejs');

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  console.log('seeding factory');

  await knex('attendance_students').del();
  await knex('archives').del();
  await knex('schedules').del();
  await knex('periods').del();
  await knex('days').del();
  await knex('answers').del();
  await knex('exam_attempts').del();
  await knex('exam_question').del();
  await knex('options').del();
  await knex('questions').del();
  await knex('exams').del();
  await knex('subjects').del();
  await knex('teachers').del();
  await knex('students').del();
  // await knex('users').del();
  await knex('classes').del();
  await knex('curriculums').del();
  await knex('academic_years').del();

  console.log('seeding classes');
  const classes = [];
  for (let i = 0; i < 5; i++) {
    classes.push({
      class_name: `Class ${faker.number.int({
        min: 1,
        max: 12,
      })}${faker.string.alpha({ length: 1, casing: 'upper' })}`,
      floor_number: faker.number.int({ min: 1, max: 4 }),
    });
  }
  const classIds = await knex('classes').insert(classes).returning('id');

  console.log('seeding curriculums');
  const curriculums = [];
  for (let i = 0; i < 4; i++) {
    curriculums.push({
      level_grade: String(9 + i),
      is_active: true,
      created_by: null,
    });
  }
  const curriculumIds = await knex('curriculums')
    .insert(curriculums)
    .returning('id');

  console.log('seeding academic years');
  const academicYears = [];
  for (let i = 0; i < 3; i++) {
    const start = faker.date.past({ years: 5 });
    const end = new Date(start);
    end.setFullYear(start.getFullYear() + 1);
    academicYears.push({
      start_year: start,
      end_year: end,
    });
  }
  const academicYearIds = await knex('academic_years')
    .insert(academicYears)
    .returning('id');

  console.log('seeding users');
  const users = [];
  const studentRole = await knex('roles').where({ name: 'student' }).first();
  const teacherRole = await knex('roles').where({ name: 'teacher' }).first();
  for (let i = 0; i < 15; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: bcrypt.hashSync('password123'),
      role_id: studentRole.id,
      phone: faker.phone.number(),
      birth_date: faker.date.birthdate({ min: 1990, max: 2010, mode: 'year' }),
    });
  }
  for (let i = 0; i < 5; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: bcrypt.hashSync('password123'),
      role_id: teacherRole.id,
      phone: faker.phone.number(),
      birth_date: faker.date.birthdate({ min: 1970, max: 1995, mode: 'year' }),
    });
  }
  const userIds = await knex('users').insert(users).returning('id');

  console.log('seeding students');
  const students = [];
  for (let i = 0; i < 15; i++) {
    students.push({
      user_id: userIds[i].id || userIds[i],
      class_id:
        faker.helpers.arrayElement(classIds).id ||
        faker.helpers.arrayElement(classIds),
      curriculum_id:
        faker.helpers.arrayElement(curriculumIds).id ||
        faker.helpers.arrayElement(curriculumIds),
      grade_level: faker.helpers.arrayElement([9, 10, 11, 12]),
    });
  }
  const studentIds = await knex('students').insert(students).returning('id');

  console.log('seeding teachers');
  const teachers = [];
  for (let i = 0; i < 5; i++) {
    teachers.push({
      user_id: userIds[15 + i].id || userIds[15 + i],
      specialization: faker.person.jobType(),
      hire_date: faker.date.past({ years: 10 }),
      qualification: faker.person.jobTitle(),
    });
  }
  const teacherIds = await knex('teachers').insert(teachers).returning('id');

  console.log('seeding subjects');
  const subjects = [];
  for (let i = 0; i < 8; i++) {
    subjects.push({
      name: faker.word.words(2),
      resources: faker.internet.url(),
      teacher_id:
        faker.helpers.arrayElement(teacherIds).id ||
        faker.helpers.arrayElement(teacherIds),
      curriculum_id:
        faker.helpers.arrayElement(curriculumIds).id ||
        faker.helpers.arrayElement(curriculumIds),
    });
  }
  const subjectIds = await knex('subjects').insert(subjects).returning('id');

  console.log('seeding exams');
  const exams = [];
  for (let i = 0; i < 5; i++) {
    const start = faker.date.future();
    const end = new Date(start);
    end.setHours(start.getHours() + 2);
    exams.push({
      subject_id:
        faker.helpers.arrayElement(subjectIds).id ||
        faker.helpers.arrayElement(subjectIds),
      title: faker.word.words(3),
      description: faker.lorem.sentence(),
      time_limit: faker.number.int({ min: 30, max: 120 }),
      total_mark: 100,
      passing_mark: 50,
      start_datetime: start,
      end_datetime: end,
    });
  }
  const examIds = await knex('exams').insert(exams).returning('id');

  console.log('seeding questions');
  const questions = [];
  for (let i = 0; i < 20; i++) {
    questions.push({
      subject_id:
        faker.helpers.arrayElement(subjectIds).id ||
        faker.helpers.arrayElement(subjectIds),
      question_text: faker.lorem.sentence(),
      type: faker.helpers.arrayElement(['mcq', 'true_false']),
    });
  }
  const questionIds = await knex('questions').insert(questions).returning('id');

  console.log('seeding options');
  const options = [];
  for (let i = 0; i < 60; i++) {
    options.push({
      question_id:
        faker.helpers.arrayElement(questionIds).id ||
        faker.helpers.arrayElement(questionIds),
      text: faker.lorem.words(3),
      is_correct: faker.datatype.boolean(),
    });
  }
  const optionIds = await knex('options').insert(options).returning('id');

  console.log('seeding exam_question');
  const examQuestions = [];
  const usedExamQuestionPairs = new Set();
  let attempts = 0;
  while (examQuestions.length < 20 && attempts < 100) {
    const exam_id =
      faker.helpers.arrayElement(examIds).id ||
      faker.helpers.arrayElement(examIds);
    const question_id =
      faker.helpers.arrayElement(questionIds).id ||
      faker.helpers.arrayElement(questionIds);
    const pairKey = `${exam_id}_${question_id}`;
    if (!usedExamQuestionPairs.has(pairKey)) {
      examQuestions.push({
        exam_id,
        question_id,
        mark: faker.number.int({ min: 1, max: 10 }),
      });
      usedExamQuestionPairs.add(pairKey);
    }
    attempts++;
  }
  const examQuestionIds = await knex('exam_question')
    .insert(examQuestions)
    .returning('id');

  console.log('seeding exam_attempts');
  const examAttempts = [];
  for (let i = 0; i < 10; i++) {
    let score = null;
    if (faker.datatype.boolean()) {
      score = Number(faker.number.int({ min: 0, max: 100 }));
      if (!Number.isSafeInteger(score) || score < 0) {
        score = 0;
      }
    }
    examAttempts.push({
      exam_id:
        faker.helpers.arrayElement(examIds).id ||
        faker.helpers.arrayElement(examIds),
      student_id:
        faker.helpers.arrayElement(studentIds).id ||
        faker.helpers.arrayElement(studentIds),
      score,
    });
  }
  const validExamAttempts = examAttempts.filter(
    (a) => a.score === null || (Number.isSafeInteger(a.score) && a.score >= 0)
  );
  const examAttemptIds = await knex('exam_attempts')
    .insert(validExamAttempts)
    .returning('id');

  console.log('seeding answers');
  const answers = [];
  const examIdToQuestions = {};
  const questionIdToExamMark = {};
  for (const eq of examQuestions) {
    const exam_id = eq.exam_id;
    const question_id = eq.question_id;
    if (!exam_id || !question_id) continue;
    if (!examIdToQuestions[exam_id]) examIdToQuestions[exam_id] = [];
    examIdToQuestions[exam_id].push(question_id);
    questionIdToExamMark[`${exam_id}_${question_id}`] = eq.mark;
  }
  const questionIdToOptions = {};
  const optionIdToOption = {};
  for (const opt of options) {
    const question_id = opt.question_id;
    const option_id = opt.id;
    if (!question_id || !option_id) continue;
    if (!questionIdToOptions[question_id])
      questionIdToOptions[question_id] = [];
    questionIdToOptions[question_id].push(option_id);
    optionIdToOption[option_id] = opt;
  }
  for (const examAttempt of validExamAttempts || examAttemptIds) {
    const exam_attempt_id = examAttempt.id || examAttempt;
    const exam_id =
      examAttempt.exam_id ||
      (examAttempt.id && examAttempt.exam_id) ||
      (examAttempt.exam_id && examAttempt.exam_id.id) ||
      (examAttempt.exam_id && examAttempt.exam_id);
    if (!exam_id) continue;
    const possibleQuestions = examIdToQuestions[exam_id] || [];
    if (possibleQuestions.length === 0) continue;
    const question_id = faker.helpers.arrayElement(possibleQuestions);
    const possibleOptions = questionIdToOptions[question_id] || [];
    if (possibleOptions.length === 0) continue;
    const option_id = faker.helpers.arrayElement(possibleOptions);
    const option = optionIdToOption[option_id];
    const mark = questionIdToExamMark[`${exam_id}_${question_id}`] || 0;
    const mark_awarded = option.is_correct ? mark : 0;
    answers.push({
      question_id,
      option_id,
      exam_attempt_id,
      mark_awarded,
    });
  }
  if (answers.length === 0) {
    answers.push({
      question_id: questionIds[0].id || questionIds[0],
      option_id: optionIds[0].id || optionIds[0],
      exam_attempt_id: examAttemptIds[0].id || examAttemptIds[0],
      mark_awarded: 0,
    });
  }
  await knex('answers').insert(answers);

  console.log('seeding days');
  const dayNames = ['sunday', 'monday', 'tuesday', 'wedenesday', 'thursday'];
  const days = dayNames.map((name) => ({ name }));
  const dayIds = await knex('days').insert(days).returning('id');

  console.log('seeding periods');
  const periods = [];
  let endMinute = 0;
  let startMinute = 0;
  let startHour = 8;
  let endHour = startHour;
  const classTime = 45;
  const restTime = 15;
  for (let i = 1; i <= 9; i++) {
    if (i == 3 || i == 6) {
      endMinute = startMinute + restTime;
    } else {
      endMinute = startMinute + classTime;
    }
    if (endMinute >= 60) {
      endHour += 1;
      let tempMinute = endMinute - 60;
      endMinute = tempMinute;
    }
    periods.push({
      start_time: `${startHour}:${startMinute}:00`,
      end_time: `${endHour}:${endMinute}:00`,
    });

    startHour = endHour;
    startMinute = endMinute;
  }
  const periodIds = await knex('periods').insert(periods).returning('id');

  console.log('seeding schedules');
  const schedules = [];
  const usedScheduleKeys = new Set();
  let scheduleAttempts = 0;
  while (schedules.length < 10 && scheduleAttempts < 100) {
    const class_id =
      faker.helpers.arrayElement(classIds).id ||
      faker.helpers.arrayElement(classIds);
    const subject_id =
      faker.helpers.arrayElement(subjectIds).id ||
      faker.helpers.arrayElement(subjectIds);
    const day_id =
      faker.helpers.arrayElement(dayIds).id ||
      faker.helpers.arrayElement(dayIds);
    const period_id =
      faker.helpers.arrayElement(periodIds).id ||
      faker.helpers.arrayElement(periodIds);
    const key = `${class_id}_${day_id}_${period_id}`;
    if (!usedScheduleKeys.has(key)) {
      schedules.push({ class_id, subject_id, day_id, period_id });
      usedScheduleKeys.add(key);
    }
    scheduleAttempts++;
  }
  const scheduleIds = await knex('schedules').insert(schedules).returning('id');

  console.log('seeding archives');
  const archives = [];
  const usedArchiveKeys = new Set();
  let archiveAttempts = 0;
  while (archives.length < 10 && archiveAttempts < 100) {
    const student_id =
      faker.helpers.arrayElement(studentIds).id ||
      faker.helpers.arrayElement(studentIds);
    const academic_year_id =
      faker.helpers.arrayElement(academicYearIds).id ||
      faker.helpers.arrayElement(academicYearIds);
    const key = `${student_id}_${academic_year_id}`;
    if (!usedArchiveKeys.has(key)) {
      archives.push({
        student_id,
        academic_year_id,
        remaining_tuition: faker.number.int({ min: 0, max: 1000 }),
      });
      usedArchiveKeys.add(key);
    }
    archiveAttempts++;
  }
  await knex('archives').insert(archives);

  console.log('seeding attendance_students');
  const attendance = [];
  for (let i = 0; i < 20; i++) {
    attendance.push({
      student_id:
        faker.helpers.arrayElement(studentIds).id ||
        faker.helpers.arrayElement(studentIds),
      created_by:
        faker.helpers.arrayElement(userIds).id ||
        faker.helpers.arrayElement(userIds),
      date: faker.date.recent({ days: 30 }),
      status: faker.helpers.arrayElement(['present', 'absent', 'late']),
    });
  }
  await knex('attendance_students').insert(attendance);
};
