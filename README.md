# 🎯 BattlePlan AI Receptionist Dashboard

A comprehensive dashboard for managing AI receptionist communications, leads, and calendar scheduling across multiple client businesses.

## 🌟 Features

- **Client Dashboard**: Individual business view with communications, opportunities, calendar, and tasks
- **Master Dashboard**: Super admin view to manage all client accounts
- **Calendar System**: Full month and week views with booking management
- **Lead Pipeline**: Visual Kanban-style opportunity tracking
- **Email & Call Integration**: Unified communications view
- **Multi-tenant**: Support for multiple client businesses

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/battleplanconsult/battleplan-dashboard)

## 📦 Installation
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

## 📱 Access Points

- Client Dashboard: `/`
- Master Admin Dashboard: `/master`

## 🛠️ Built With

- Next.js 14
- React 18
- Tailwind CSS
- Lucide Icons
- Supabase (Database)
- Clerk (Authentication)

## 📄 License

MIT
