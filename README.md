This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


# **MediCare – Digital Healthcare Management System 🏥**

MediCare is a complete **digital healthcare & medical workflow system** built with **Next.js**, **Prisma**, **NeonDB**, **Clerk Authentication**, and **Vonage Video API**.  
It digitalizes the full treatment flow — from appointments to consultations, lab tests, reports, prescriptions, and pharmacy delivery.

---

## 🚀 Features

### **1. Patient Features**
- Book online appointments  
- View doctor availability  
- Join video consultations  
- Receive required test requests  
- View uploaded test reports  
- Access digital prescriptions  
- Order medicines online  
- Make online payments  

### **2. Doctor Features**
- Manage appointment schedule  
- Start video consultations (Vonage)  
- Suggest tests to patients  
- Review submitted test reports  
- Provide e-prescriptions  
- Complete appointment lifecycle  

### **3. Lab Module**
- Receive requested tests  
- Upload digital reports  
- Automated notification to patient & doctor  

### **4. Pharmacy Module**
- Receive prescriptions digitally  
- Prepare and dispatch medicines  
- Accept online payments  
- Deliver medicines physically or digitally confirm  

### **5. Admin Panel**
- Manage all users (doctors, lab, pharmacy, patients)  
- Manage department/specialties  
- Monitor appointments & revenue  
- Manage test categories  
- Manage lab report templates  

---

## 🛠 Tech Stack

| Layer | Technology |
|------|-------------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Next.js Server Actions / API Routes |
| Authentication | Clerk |
| Database | NeonDB (PostgreSQL) |
| ORM | Prisma |
| Video Call | Vonage Video API |
| Deployment | Vercel / Railway |
| File Storage | Cloudinary or local |

---

## 🗂 Project Structure

medicare/ <br>
├── app/ <br>
│ ├── dashboard/ <br>
│ ├── api/ <br>
│ ├── (auth)/ <br>
│ └── video/ <br>
├── prisma/ <br>
│ └── schema.prisma<br>
├── lib/<br>
│ └── private.key<br>
├── components/ <br>
├── public/ <br>
├── .env <br>
├── README.md <br>
└── package.json <br>


---

## 🔑 Environment Variables

### Create a `.env` file:

```
DATABASE_URL="your_neon_database_url"

CLERK_PUBLISHABLE_KEY="your_clerk_public_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

VONAGE_API_KEY="your_vonage_api_key"
VONAGE_API_SECRET="your_vonage_api_secret"
VONAGE_APPLICATION_ID="your_vonage_app_id"
VONAGE_PRIVATE_KEY_PATH=./lib/private.key

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

---

## 📡 Vonage Private Key Fix (Linux)

Ensure `private.key` uses **LF (Unix)** line endings.

Example loader:

```ts
import fs from "fs";

export function loadPrivateKey() {
  return fs.readFileSync("./lib/private.key", "utf8");
}

```
## 🧪 Prisma Setup

### Install dependencies:
```bash
npm install
```

Generate Prisma Client:
```
npx prisma generate
```

Run migrations:
```
npx prisma migrate dev
```

### ▶️ Run Locally
```
npm run dev
```

Visit:
👉 http://localhost:3000

## ☁️ Deployment Notes

### **Vercel**
- Add all `.env` variables  
- Upload Vonage private key  
- Use NeonDB with SSL enabled  

### **NeonDB**
- Enable connection pooling  
- Use `?sslmode=require` on Linux


## 📝 Future Enhancements

✔️ AI-based symptom analyzer  
💬 Real-time doctor–patient chat  
🚚 Medicine delivery tracking  
📊 Appointment analytics  
⏰ Auto health reminders


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<br>


## 👨‍💻 Author

**Nasir Uddin**  
BSc in CSE  
Developer of **MediCare – Digital Healthcare Workflow System**

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
