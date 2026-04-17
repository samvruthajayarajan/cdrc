
const { MongoClient, ObjectId } = require('mongodb');

async function seedPrograms() {
  const uri = "mongodb://sp151048_db_user:E2jR1LluRmM1VE9b@ac-djcptt8-shard-00-00.8gdtuxs.mongodb.net:27017,ac-djcptt8-shard-00-01.8gdtuxs.mongodb.net:27017,ac-djcptt8-shard-00-02.8gdtuxs.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('cdrc');
    const universityId = "69d49556dcb39148740eb787";
    const university = "Amrita Viswa Vidyapeetham";

    const newPrograms = [
      {
        name: "B.Sc Physics",
        category: "Science",
        level: "Undergraduate",
        duration: "3 Years",
        university: university,
        universityId: universityId,
        description: "A comprehensive program covering classical and modern physics.",
        active: true,
        fee: 55000,
        mode: "Online",
        specializations: ["Pure Physics", "Applied Physics"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BA English",
        category: "Arts",
        level: "Undergraduate",
        duration: "3 Years",
        university: university,
        universityId: universityId,
        description: "Focuses on English literature, linguistics, and creative writing.",
        active: true,
        fee: 45000,
        mode: "Online",
        specializations: ["Literature", "Communication"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BCA",
        category: "Technology",
        level: "Undergraduate",
        duration: "3 Years",
        university: university,
        universityId: universityId,
        description: "Build a strong foundation in computer applications and software development.",
        active: true,
        fee: 75000,
        mode: "Online",
        specializations: ["Software Engineering", "Data Science"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "MBA",
        category: "Management",
        level: "Postgraduate",
        duration: "2 Years",
        university: university,
        universityId: universityId,
        description: "Advanced management training for future business leaders.",
        active: true,
        fee: 120000,
        mode: "Online",
        specializations: ["Finance", "Marketing", "HR"],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    // Check if they already exist to avoid duplicates
    for (const p of newPrograms) {
      const exists = await db.collection('programs').findOne({ name: p.name });
      if (!exists) {
        await db.collection('programs').insertOne(p);
        console.log(`Inserted: ${p.name}`);
      } else {
        console.log(`Skipped (already exists): ${p.name}`);
      }
    }

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seedPrograms();
