/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const musicData = [
  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851f9bce28a0d4a44af4e626717',
    name: 'เลือดกรุ๊ปบี',
    artist: 'CHRRISSA',
    album_name: 'เลือดกรุ๊ปบี',
    published_at: '16 Jan 2023',
    duration: '4:49',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851af72317bbf13f110703432dd',
    name: 'ทรงอย่างแบด (Bad Boy)',
    artist: 'Paper Planes',
    album_name: 'ทรงอย่างแบด (Bad Boy) - Single',
    published_at: '16 Jan 2023',
    duration: '3:26',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048511293506b82e7040360b197d7',
    name: 'ข้างกัน (City)',
    artist: 'Three Man Down feat. ออม TELExTELEXs',
    album_name: 'This City Won’t Be Lonely Anymore',
    published_at: '16 Jan 2023',
    duration: '4:56',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851ca061ace2b68bc2b49ad6820',
    name: 'คนไม่คุย (Silent Mode)',
    artist: 'PROXIE',
    album_name: 'คนไม่คุย (Silent Mode)',
    published_at: '16 Jan 2023',
    duration: '3:50',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d0000485114a0587cf089e8d0baac694b',
    name: 'แฟนผมน่ารัก',
    artist: 'Bow Maylada Lipta',
    album_name: 'แฟนผมน่ารัก',
    published_at: '16 Jan 2023',
    duration: '3:20',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048519ed9030194af34bc4cd34db5',
    name: 'พิจารณา (Consider)',
    artist: 'Musketeers Maiyarap',
    album_name: 'พิจารณา (Consider)',
    published_at: '16 Jan 2023',
    duration: '4:06',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048513a80d74bea52b742239e721a',
    name: 'แอบหวัง',
    artist: 'Anatomy Rabbit',
    album_name: 'แอบหวัง',
    published_at: '16 Jan 2023',
    duration: '3:55',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851021530682feb18d7336c4b42',
    name: 'ทักครับ',
    artist: 'Lipta GUYGEEGEE',
    album_name: 'ทักครับ',
    published_at: '16 Jan 2023',
    duration: '3:11',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851a8e01e8c954b0bf3a8f8c4e4',
    name: 'เป็นไรไหม?',
    artist: 'OG-ANIC LAZYLOXY',
    album_name: 'เป็นไรไหม?',
    published_at: '16 Jan 2023',
    duration: '3:32',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048511293506b82e7040360b197d7',
    name: 'คุยคนเดียวเก่ง',
    artist: 'Three Man Down',
    album_name: 'This City Won’t Be Lonely Anymore',
    published_at: '16 Jan 2023',
    duration: '3:22',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048511293506b82e7040360b197d7',
    name: 'ถ้าเธอรักฉันจริง',
    artist: 'Three Man Down',
    album_name: 'This City Won’t Be Lonely Anymore',
    published_at: '16 Jan 2023',
    duration: '4:00',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851ea98fb2d5a9d96d9227c465a',
    name: 'วันเกิดฉันปีนี้ (HBD to me)',
    artist: 'Three Man Down',
    album_name: 'วันเกิดฉันปีนี้ (HBD to me) - Single',
    published_at: '16 Jan 2023',
    duration: '4:11',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048511293506b82e7040360b197d7',
    name: 'เดาไม่เก่ง',
    artist: 'Three Man Down',
    album_name: 'This City Won’t Be Lonely Anymore',
    published_at: '16 Jan 2023',
    duration: '3:06',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048511293506b82e7040360b197d7',
    name: 'ฝนตกไหม',
    artist: 'Three Man Down',
    album_name: 'This City Won’t Be Lonely Anymore',
    published_at: '16 Jan 2023',
    duration: '4:21',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048511293506b82e7040360b197d7',
    name: 'Friend Zone',
    artist: 'Three Man Down',
    album_name: 'This City Won’t Be Lonely Anymore',
    published_at: '16 Jan 2023',
    duration: '3:49',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048511293506b82e7040360b197d7',
    name: 'ไปเถอะเธอ',
    artist: 'Three Man Down',
    album_name: 'This City Won’t Be Lonely Anymore',
    published_at: '16 Jan 2023',
    duration: '3:56',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851c5eac3548e8863df2c81448c',
    name: 'น้อง (Nong)',
    artist: 'Three Man Down URBOYTJ',
    album_name: 'น้อง (Nong) - Single',
    published_at: '16 Jan 2023',
    duration: '3:08',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851d03399e5b462b6e880ecae17',
    name: 'แฟนเก่าคนโปรด (My Fav Ex)',
    artist: 'SLAPKISS',
    album_name: 'แฟนเก่าคนโปรด (My Fav Ex)',
    published_at: '16 Jan 2023',
    duration: '3:36',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851dfb56bc3269adf6c917bf1f9',
    name: 'แฟนใหม่หน้าคุ้น',
    artist: 'Maiyarap MILLI',
    album_name: 'แฟนใหม่หน้าคุ้น',
    published_at: '16 Jan 2023',
    duration: '2:53',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851b9a748739c1544287d2a6e6c',
    name: 'ชอบตัวเองตอนอยู่กับเธอ',
    artist: 'Billkin',
    album_name: 'ชอบตัวเองตอนอยู่กับเธอ',
    published_at: '16 Jan 2023',
    duration: '3:42',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048512be87e574f10d7146b09f617',
    name: 'สลักจิต',
    artist: 'Pop Pongkool Da Endorphine',
    album_name: 'สลักจิต - Single',
    published_at: '16 Jan 2023',
    duration: '4:24',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048514772590e4a680bd6ecaefb0e',
    name: 'วาดไว้',
    artist: 'BOWKYLION',
    album_name: 'วาดไว้',
    published_at: '16 Jan 2023',
    duration: '4:15',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851bb788e1a2c573f0f59880ba8',
    name: 'ข้างกาย',
    artist: 'Safeplanet',
    album_name: 'ข้างกาย',
    published_at: '16 Jan 2023',
    duration: '4:16',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d00004851937a0cc9017cd8cb033d5e79',
    name: 'โต๊ะริม',
    artist: 'NONT TANONT',
    album_name: 'โต๊ะริม',
    published_at: '16 Jan 2023',
    duration: '4:07',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048512f33a5ad59e38522ba9aa5b6',
    name: 'พิง (เพลงประกอบละคร กระเช้าสีดา)',
    artist: 'NONT TANONT',
    album_name: 'พิง - Single',
    published_at: '16 Jan 2023',
    duration: '4:02',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d000048519ed9030194af34bc4cd34db5',
    name: 'พิจารณา (Consider)',
    artist: 'Musketeers Maiyarap',
    album_name: 'พิจารณา (Consider)',
    published_at: '16 Jan 2023',
    duration: '4:06',
  },

  {
    image_url:
      'https://i.scdn.co/image/ab67616d0000485145cc0a7113b6bb07d666775c',
    name: 'เพื่อนสนิท',
    artist: 'Endorphine',
    album_name: 'พริก',
    published_at: '23 Apr 2025',
    duration: '3:40',
  },
];

function durationToSeconds(duration: string): number {
  const [min, sec] = duration.split(':').map(Number);
  return min * 60 + sec;
}

async function main() {
  for (const item of musicData) {
    const album = await prisma.album.upsert({
      where: { title: item.album_name },
      update: {},
      create: { title: item.album_name },
    });

    await prisma.music.create({
      data: {
        title: item.name,
        artist: item.artist,
        image_url: item.image_url,
        duration: durationToSeconds(item.duration),
        publish_at: new Date(item.published_at),
        album_id: album.id,
      },
    });
  }
  // 2️⃣ Create a test user
  // const rawUser = {
  //   email: 'test@user.com',
  //   password: 'user@123',
  //   name: 'Test User',
  // };

  // const existingUser = await prisma.users.findUnique({
  //   where: { email: rawUser.email },
  // });

  // if (!existingUser) {
  //   const hashedPassword = await bcrypt.hash(rawUser.password, 10);
  //   await prisma.users.create({
  //     data: {
  //       email: rawUser.email,
  //       password: hashedPassword,
  //       name: rawUser.name,
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //     },
  //   });
  //   console.log('👤 User created:', rawUser.email);
  // } else {
  //   console.log('⚠️ User already exists, skipping.');
  // }

  const rawUser = {
    id: 1, // fixed ID
    email: 'test@user.com',
    password: 'user@123',
    name: 'Test User',
  };

  const hashedPassword = await bcrypt.hash(rawUser.password, 10);

  await prisma.users.upsert({
    where: { id: rawUser.id }, // look for id = 1
    update: {
      email: rawUser.email,
      password: hashedPassword,
      name: rawUser.name,
      updated_at: new Date(),
    },
    create: {
      id: rawUser.id, // force ID = 1
      email: rawUser.email,
      password: hashedPassword,
      name: rawUser.name,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

main()
  .then(() => console.log('✅ Seed completed'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
