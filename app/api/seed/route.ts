import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { allUniversities, openSchoolData } from '@/lib/data';

export async function POST() {
  try {
    const db = await getDb();

    const uniCount = await db.collection('universities').countDocuments();
    if (uniCount === 0) {
      // Add slugs to universities before inserting
      const universitiesWithSlugs = allUniversities.map(uni => ({
        ...uni,
        slug: uni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        location: 'India', // Default location
        naac: uni.accreditation,
        description: `${uni.name} offers quality online education with UGC-approved programs.`,
        facilities: ['Online Learning Platform', 'Digital Library', 'Student Support'],
        ranking: uni.accreditation
      }));
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await db.collection('universities').insertMany(universitiesWithSlugs as any[]);
    }

    const boardCount = await db.collection('openSchool').countDocuments();
    if (boardCount === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await db.collection('openSchool').insertMany(openSchoolData as any[]);
    }

    return NextResponse.json({
      success: true,
      message: `Seeded: ${uniCount === 0 ? allUniversities.length : 0} universities, ${boardCount === 0 ? openSchoolData.length : 0} boards`,
    });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
