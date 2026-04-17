
const { MongoClient } = require('mongodb');

const uri = "mongodb://sp151048_db_user:E2jR1LluRmM1VE9b@ac-djcptt8-shard-00-00.8gdtuxs.mongodb.net:27017,ac-djcptt8-shard-00-01.8gdtuxs.mongodb.net:27017,ac-djcptt8-shard-00-02.8gdtuxs.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const questions = [
  {
    field: 'course',
    order: 1,
    isActive: true,
    question: 'What course are you interested in pursuing?',
    options: [
      { value: 'MBA', label: 'MBA' }, { value: 'MCA', label: 'MCA' }, { value: 'M.COM', label: 'M.COM' },
      { value: 'MA', label: 'MA' }, { value: 'MSC', label: 'MSC' }, { value: 'MSW', label: 'MSW' },
      { value: 'MLIS', label: 'MLIS' }, { value: 'BBA', label: 'BBA' }, { value: 'BCA', label: 'BCA' },
      { value: 'B.COM', label: 'B.COM' }, { value: 'BA', label: 'BA' }, { value: 'BSC', label: 'BSC' },
      { value: 'B.COM+MBA', label: 'B.COM+MBA' }, { value: 'BBA+MBA', label: 'BBA+MBA' },
      { value: 'BCA+MCA', label: 'BCA+MCA' }, { value: 'BMS', label: 'BMS' },
      { value: 'PGCP', label: 'PGCP' }, { value: 'PGDM', label: 'PGDM' }
    ]
  },
  {
    field: 'employment',
    order: 2,
    isActive: true,
    question: 'What is your current employment status?',
    options: [
      { value: 'student', label: 'Student' },
      { value: 'working_professional', label: 'Working Professional' },
      { value: 'business_owner', label: 'Business Owner' },
      { value: 'unemployed', label: 'Seeking Opportunities' }
    ]
  },
  {
    field: 'mode',
    order: 3,
    isActive: true,
    question: 'Preferred mode of education?',
    options: [
      { value: 'online', label: '100% Online' },
      { value: 'distance', label: 'Distance Learning' },
      { value: 'hybrid', label: 'Hybrid/Weekend Classes' }
    ]
  },
  {
    field: 'budget',
    order: 4,
    isActive: true,
    question: 'What is your total budget for the entire course?',
    options: [
      { value: 'under_50k', label: 'Under ₹50,000' },
      { value: '50k_1l', label: '₹50,000 - ₹1,00,000' },
      { value: '1l_2l', label: '₹1,00,000 - ₹2,00,000' },
      { value: 'above_2l', label: 'Above ₹2,00,000' }
    ]
  },
  {
     field: 'duration',
     order: 5,
     isActive: true,
     question: 'Preferred course duration?',
     options: [
       { value: '1yr', label: '1 Year (Diploma/Fast-track)' },
       { value: '2yr', label: '2 Years (Standard Masters)' },
       { value: '3yr', label: '3 Years (Bachelors)' }
     ]
  },
  {
    field: 'goal',
    order: 6,
    isActive: true,
    question: 'What is your primary goal for this course?',
    options: [
      { value: 'career_growth', label: 'Career Growth / Promotion' },
      { value: 'career_switch', label: 'Career Switch' },
      { value: 'knowledge', label: 'Knowledge Enhancement' },
      { value: 'degree', label: 'Formal Degree Requirement' }
    ]
  },
  {
    field: 'experience',
    order: 7,
    isActive: true,
    question: 'Total years of work experience?',
    options: [
      { value: 'fresher', label: 'Fresher (0-1 yr)' },
      { value: '1_3', label: '1 - 3 Years' },
      { value: '3_5', label: '3 - 5 Years' },
      { value: 'above_5', label: 'More than 5 Years' }
    ]
  },
  {
    field: 'university_type',
    order: 8,
    isActive: true,
    question: 'Preferred University Type?',
    options: [
      { value: 'private', label: 'Top Private University' },
      { value: 'government', label: 'Government / State University' },
      { value: 'no_pref', label: 'No Preference / Based on Ranking' }
    ]
  },
  {
    field: 'location_pref',
    order: 9,
    isActive: true,
    question: 'Any regional preference for the university?',
    options: [
      { value: 'north', label: 'North India' },
      { value: 'south', label: 'South India' },
      { value: 'west', label: 'West India' },
      { value: 'no_pref', label: 'No Preference' }
    ]
  },
  {
    field: 'specialization_focus',
    order: 10,
    isActive: true,
    question: 'Interest in specific specializations?',
    options: [
      { value: 'general', label: 'General / No specific focus' },
      { value: 'technical', label: 'Highly Technical / IT' },
      { value: 'management', label: 'Management & Operations' },
      { value: 'creative', label: 'Creative & Liberal Arts' }
    ]
  },
  {
    field: 'counselling_pref',
    order: 11,
    isActive: true,
    question: 'Would you like a free call with a counsellor?',
    options: [
      { value: 'yes_now', label: 'Yes, call me now' },
      { value: 'yes_later', label: 'Yes, call me later' },
      { value: 'no', label: 'Not right now' }
    ]
  }
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('cdrc');
    const col = db.collection('suggestUniversityQuestions');
    
    // Clear existing
    await col.deleteMany({});
    
    // Insert new
    await col.insertMany(questions);
    console.log('Seeded 11 quiz questions successfully!');
  } finally {
    await client.close();
  }
}

seed();
