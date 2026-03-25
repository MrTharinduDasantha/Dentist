# Dental Appointment Booking System (Dentist)

A simple, full-featured Dental Appointment Booking System built with Next.js + TypeScript and Tailwind UI.
This app lets patients register & sign in (via email or Gmail using Clerk), book appointments with dentists, pay for a Pro plan (Clerk billing), and — for Pro users — access a voice assistant powered by the Vapi Voice AI. Admins (clinic owners) can manage doctors and appointments through an admin panel. Transactional emails are sent using Resend. The UI is built with Tailwind CSS and shadcn ui, and the app stores data in PostgreSQL (hosted via Neon).


## Demo

Click the link below to see the demonstration of the Dental Appointment Booking System (Dentist).

Link 👉 https://drive.google.com/file/d/1XZHte6tUKbzC_XEjFRR6BKXiHauSPMxc/view?usp=sharing 👈


## Features

### Admin (Clinic Owner)
- Admin dashboard display Total doctors, Active doctors, Total appointments and Completed appointments.
- Add doctor: add a new doctor by providing Name, Speciality, Email, Phone number, Gender, Status (Active / Inactive).
- Edit doctor: update any of the above details.
- View recent appointments and change appointment status to Confirmed or Completed.

### Patient / User
- Sign up / Sign in with email/password or via Gmail using Clerk.
- Browse available dentists and specialties.
- Book appointment: Select dentist ➡️ Choose appointment type ➡️ Select available date ➡️ Select available time
- My Bookings: View booking history and appointment details.
- Pro users: access the Voice Assistant (ask dental-health questions and get guidance + recommended treatments).

### System integrations
- Authentication: Clerk (sign in, sign up, billing)
- Emails: Resend (send booking confirmations)
- Voice AI: Vapi (VAPI assistant for Pro users)
- Database: PostgreSQL on Neon
- Frontend styling: Tailwind CSS + shadcn ui


## Technologies Used
- Next.js + TypeScript
- Tailwind CSS + shadcn ui
- PostgreSQL (Neon)
- Clerk (auth + billing)
- Resend (transactional email)
- Vapi (voice assistant)


## Installation

Clone the repository and navigate to project folder to install dependencies.
```bash
  git clone https://github.com/MrTharinduDasantha/Dentist.git
  cd Dentist
```
Install dependencies.
```bash
npm install
```
#### Environment Variables
Before running the app, configure the .env files in the Dentist folder with the necessary environment variables.
- Create a .env file in the Dentist folder.
- Replace the placeholders with your actual values.
```bash
# Clerk API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "Enter your next public clerk publishable key"
CLERK_SECRET_KEY = "Enter your clerk secret key"

# PostgresSQL Database URL
DATABASE_URL = "PostgreSQL database url"

# VAPI Assistant ID
NEXT_PUBLIC_VAPI_ASSISTANT_ID = "Enter your vapi assistant id"

# VAPI Public API Key
NEXT_PUBLIC_VAPI_API_KEY = "Enter your next public vapi api key"

# Admin Email
ADMIN_EMAIL = "Enter your admin email"

# Resend Api Key
RESEND_API_KEY = "Enter your resend api key"

# App URL
NEXT_PUBLIC_APP_URL = http://localhost:3000
```
#### Run the Project.
```bash
npm run dev
```


## Usage
1. Admin (Owner)
- Register / sign in via Clerk.
- Navigate to the Admin Dashboard (http://localhost:3000/admin).
- Add a doctor: Fill Name, Speciality, Email, Phone number, Gender, Status (Active / Inactive).
- Edit doctor details with the Edit Doctor form.
- View recent appointments; update appointment status to Confirmed or Completed.
- Dashboard shows counts for total doctors, active doctors, total appointments and completed
2. Patient (User)
- Register / login using Clerk (email or Gmail).
- Browse dentists and specialties.
- Select dentist ➡️ choose appointment type ➡️ select an available date ➡️ select an available time 
- If payment / upgrade required, follow billing flow via Clerk.
- Pro users can click the Voice Assistant and ask dental-related questions.


## Screenshots

![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%201.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%202.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%204.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%205.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%206.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%207.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%208.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%209.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2010.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2011.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2012.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2013.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2014.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2015.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2016.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2017.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2018.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2019.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2020.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2021.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2022.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2023.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2024.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2025.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2026.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2027.png)
![image alt](https://github.com/MrTharinduDasantha/Dentist/blob/2352ff9948be0ab1238864d680585188bec04d82/public/website-images/Img%20-%2028.png)

<h4 align="center"> Don't forget to leave a star ⭐️ </h4>

