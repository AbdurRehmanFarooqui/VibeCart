import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Supabase URL and Service Role Key must be set in environment variables.");
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);
// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '10mb', // Adjust based on your needs
//     },
//   },
// };
export async function POST(request: NextRequest) {
    try {
        const { product_id, reviewer_name, phone, email, msg, rating, images } = await request.json();

        // 1. Validation check
        if (!product_id || !rating || !reviewer_name || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 2. Upload Images to Bucket first (if any)
        const uploadedUrls: string[] = [];
        
        if (images && images.length > 0) {
            for (const [index, base64Str] of images.entries()) {
                // Remove the "data:image/jpeg;base64," prefix if present
                const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, 'base64');
                
                const fileName = `${product_id}/${Date.now()}-${index}.jpg`;
                
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('review-images') // Make sure this bucket exists and is public
                    .upload(fileName, buffer, {
                        contentType: 'image/jpeg',
                        upsert: false
                    });

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                    throw new Error(`Failed to upload image ${index}`);
                }

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('review-images')
                    .getPublicUrl(fileName);
                
                uploadedUrls.push(publicUrl);
            }
        }

        // 3. Insert Review into 'reviews' table
        const { data: reviewData, error: reviewError } = await supabase
            .from('reviews')
            .insert({ 
                product_id, 
                reviewer_name, 
                phone, 
                email, 
                msg, 
                rating,
            })
            .select()
            .single();

        if (reviewError) {
            console.error('Database Error:', reviewError);
            return NextResponse.json({ error: 'Failed to save review data' }, { status: 500 });
        }

        // 4. Link Uploaded URLs to 'review_images' table
        if (uploadedUrls.length > 0) {
            const imageInserts = uploadedUrls.map((url) => ({
                review_id: reviewData.id,
                url: url,
            }));

            const { error: imageDbError } = await supabase
                .from('review_images')
                .insert(imageInserts);

            if (imageDbError) {
                console.error('Image Link Error:', imageDbError);
                // We don't necessarily want to fail the whole request if the review saved
                // but we should log it.
            }
        }

        return NextResponse.json({ 
            message: 'Review submitted successfully', 
            review: reviewData 
        }, { status: 201 });

    } catch (error: any) {
        console.error('Critical Error:', error.message);
        return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
    }
}