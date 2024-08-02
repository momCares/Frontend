This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#About MomCares

![alt text](image.png)
MomCares is an e-commerce website that especially made for moms and baby stuffs

##About This Project

Screenshot ui momcares
In the end of the bootcamp in Rakamin Academy, the students have to make a final project with the team formed by Rakamin. And the final project for Fullstack Web-Development is make a website with several needs and requirements. Our team called"MomCares Team" has 7 members, i.e. :

Jovano Nahak (Team Leader)
Achmad Hikami Majid
Alvian Pradiknatama
Bima Arianda Sakti
Muhammad lqbal Supriatna
R Treva Agung Rakaputra
RR Sylva Prayuniza

##Feature

This website facilities the buying and selling digital products for mom and baby online. The feature include:
Authentication for user and admin
Admin dashboard
User profiles
Pricing and product catalog
Order and Cart management
Checking shipping cost integration with Raja Ongkir
Streamline checking out
Manual payment checking for admin
Responsive design

##Tech-Stack

Frontend:Next.Js, React, Tailwind CSS
Backend:Express.js, Node.js
Database:PostgreSQL
Object Relation:prisma ORM
API Integration:Raja Ongkir
API Testing:Postman

##Installation
Make sure you have installed node.js in your device
Make a folder, example(momcares)
Clone the repository to the terminal, and do some installs
Link url repo momcares
cd momcares

    -npm install

###Setup Frontend

cd folder name
Setup environtment (.env.local) variables:

NEXT PUBLIC_API URL-http://localhost:5000/ api

start the server :
-npm run dev

###Setup Backend
cd folder name
⁠set up .env file :
DATABASE_URL= postgresql://user:password@localhost:5432/momcares
RAJA_ONGKIR_API_KEY =
migration the database

    -npx prisma migrate dev

start the server

    -npm start

###API Testing

Use postman to test the API endpoints

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
