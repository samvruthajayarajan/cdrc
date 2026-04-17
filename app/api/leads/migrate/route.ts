import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

// POST /api/leads/migrate
// Fixes existing leads that were stored without a proper source field.
// Leads with an `interest` field came from the landing page Course Finder popup.
// Leads with a `course` field (and no interest) came from Brochure Download.
export async function POST() {
  try {
    const db = await getDb();

    // Fix leads that have `interest` field → they are Course Finder leads
    const courseFinderResult = await db.collection('leads').updateMany(
      { interest: { $exists: true, $ne: '' }, source: { $ne: 'Course Finder' } },
      { $set: { source: 'Course Finder' } }
    );

    // Fix leads that have 'Suggest University Quiz' source → 'Suggest University'
    const suggestUniResult = await db.collection('leads').updateMany(
      { source: { $in: ['Suggest University Quiz', 'suggest-university'] } },
      { $set: { source: 'Suggest University' } }
    );

    // Fix leads that have no source set at all and no interest → Brochure Download
    const brochureResult = await db.collection('leads').updateMany(
      { interest: { $exists: false }, source: { $exists: false } },
      { $set: { source: 'Brochure Download' } }
    );

    // Cleanup verbose Suggest University course strings
    const allLeads = await db.collection('leads').find({ source: 'Suggest University' }).toArray();
    let cleanedCount = 0;
    for (const l of allLeads) {
      if (l.course && l.course.includes('Prefs:')) {
        const matched = l.course.match(/Matched: ([^|]+)/)?.[1]?.trim() || '';
        const course = l.course.match(/course: ([^|]+)/)?.[1]?.trim() || '';
        const help = l.course.match(/how_can_we_help_you_join_: ([^|]+)/)?.[1]?.trim() || '';
        
        const cleanCourse = `Course: ${course.toUpperCase()} | University: ${matched} | how_can_we_help_you_join_: ${help || 'None'}`;
        await db.collection('leads').updateOne({ _id: l._id }, { $set: { course: cleanCourse } });
        cleanedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      courseFinderFixed: courseFinderResult.modifiedCount,
      suggestUniFixed: suggestUniResult.modifiedCount + cleanedCount,
      brochureFixed: brochureResult.modifiedCount,
      cleanedCount
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Migration failed' }, { status: 500 });
  }
}
