module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
Click **"Commit new file"**

---

### 📁 **File 5: `.gitignore`**
Create new file, name it `.gitignore`:
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
