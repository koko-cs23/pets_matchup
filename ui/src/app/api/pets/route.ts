import { NextResponse } from 'next/server';
import { AddPetSchema } from '@/utils/schemas';
import { db } from '@/db/db';

export const GET = async () => {
  try {
    const allPets = await db.query.pets.findMany();
    if (!allPets)
      return new NextResponse(JSON.stringify({ message: 'No pet found' }), {
        status: 400
      });
    return new NextResponse(JSON.stringify(allPets), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'Something went wrong' }),
      {
        status: 500
      }
    );
  }
};

export const POST = async (request: Request, res: Response) => {
  // validate data
  const {
    age,
    breed,
    category,
    city,
    country,
    description,
    gender,
    imgs,
    petName,
    purebred,
    state
  } = AddPetSchema.parse(await request.json);
  try {
    let images = [];

    for (let i = 0; i < imgs.length; i++) {
      // console.log({ path: req.files[i].path });
      const result = await cloudinary.uploader.upload(req.files[i].path, {
        upload_preset: 'ecomm'
      });
      await unlinkAsync(req.files[i].path);
      images.push(result.secure_url);
    }

    let [product] = await db
      .insert(products)
      .values({
        phone,
        city,
        category,
        state,
        subCategory,
        negotiable,
        userId,
        price: +price,
        specifications: dynamic,
        description: desc,
        cloudinary_ids: images
      })
      .returning();
    if (products) {
      return res.status(201).json({ message: product });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
